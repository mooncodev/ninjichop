// import axios from 'axios';
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import constants from '../.constants.mjs';
import { decodeBody, logEventToFile } from './utils/commonUtils.mjs';
import { User } from './utils/mongoUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';
const { collection } = User;

export async function handler (event, context){
  //stripe's service will call this webhook when a variety of events occur on their side
  __(`>>>>>>>>>> in stripe-webhook.mjs <<<<<<<<<<<<<<<`)
  const body = decodeBody(event);
  const sig = event.headers['stripe-signature'];

  let stripeEvt;

  try {
    stripeEvt = $$.makeWebhookEvent(body, sig, constants.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    __E('Could not create Stripe Webhook Event' ,err);return { statusCode: 502 };
  }

  __(`stripeEvt.type: ${stripeEvt.type}`)
  logEventToFile(stripeEvt);

  const cus_email = await $$.getCustEmailFromStripeEvt(stripeEvt).catch(e=>__W(e))
  if(!cus_email){
    return { statusCode: 200 }
  }
  const lnpUser = await User.get(cus_email)
  if(!lnpUser) {
    __E('Webhook Error: No Such User')
    return { statusCode: 200 };
  }

  const evt = await stripeEvtSwitch(stripeEvt, lnpUser)

  try{



    return { statusCode: 200 }

  }
  catch(err){
    __E('Stripe Webhook Catch!' ,err)
    return { statusCode: 502 }
  }
}



function stripeEvtSwitch(evt, lnpUser){
  console.log(`in stripeEvt(): ${evt.type}`)

  const evActions = {

    /** ************************************************* **/
    /** ************** SUBSCRIPTION EVENTS ************** **/
    /** ************************************************* **/

    // https://stripe.com/docs/billing/subscriptions/webhooks


    /** ************************************************** **/
    /** ***************** OTHER EVENTS ******************* **/
    /** ************************************************** **/

    'customer.subscription.created':async()=>{
      //Occurs whenever a customer is signed up for a new plan.
      const planObj = User.makePlanObj(evt.data.object)
      const appendNewSub = await User.updatePlanProps(lnpUser.uid, planObj)
    },
    'customer.subscription.deleted':async()=>{
      //Occurs whenever a customer’s subscription ends.
      await User.resetPlan(evt.data.object.customer)
    },
    'customer.subscription.updated':async()=>{
      //https://stripe.com/docs/billing/subscriptions/webhooks#understand
      //Occurs when:
      // - subscription is successfully started, after payment is confirmed
      // - a subscription is changed eg. adding a coupon, applying a discount,
      //   adding an invoice item, and changing plans

      // const {customer:cus_id, id: sub_id, status, plan, default_payment_method, latest_invoice} = evt.data.object;
      // const {id:price_id, amount, active} = plan;
      const planObj = User.makePlanObj(evt.data.object)
      const {status, cus_id, sub_id} = planObj
      // const appendNewSub = await User.addSubscr(lnpUser.uid, userSubscrObj)

      // const customer = await $$.getCustomer(cus_id);

      const updPPResult = await User.updatePlanProps(cus_id,  planObj);

      /** Statuses: **/
      // trialing
      // -	The subscription is currently in a trial period and
      // it’s safe to provision your product for your customer. The subscription
      // transitions automatically to active when the first payment is made.
      // if(status === 'trialing'){}

      // active
      // -	The subscription is in good standing and the most recent payment is successful.
      // It’s safe to provision your product for your customer.
      if(status === 'active'){

      }

      // incomplete
      // -	A successful payment needs to be made within 23 hours to activate the subscription.
      // Or the payment requires action, like customer authentication. Read more about payments that require action.
      // Subscriptions can also be incomplete if there’s a pending payment.  In that case, the invoice
      // status would be open_payment_pending and the PaymentIntent status would be processing.
      if(status === 'incomplete'){

      }

      // incomplete_expired
      // -	The initial payment on the subscription failed and no successful payment
      // was made within 23 hours of creating the subscription. These subscriptions don’t bill customers.
      // This status exists so you can track customers that failed to activate their subscriptions.
      if(status === 'incomplete_expired'){

      }

      // past_due
      // -	Payment on the latest finalized invoice either failed or wasn’t attempted. The subscription
      // continues to create invoices. Your subscription settings determine the subscription’s next state.
      // If the invoice is still unpaid after all Smart Retries have been attempted, you can
      // configure the subscription to move to canceled, unpaid, or leave it as past_due.
      // To move the subscription to active, pay the most recent invoice before its due date.
      if(status === 'past_due'){

      }

      // canceled
      // -	The subscription has been canceled. During cancellation, automatic collection for
      // all unpaid invoices is disabled (auto_advance=false). This is a terminal state that can’t be updated.
      if(status === 'canceled'){

      }

      // unpaid
      // -	The latest invoice hasn’t been paid but the subscription remains in place.
      // The latest invoice remains open and invoices continue to be generated but payments aren’t attempted.
      // You should revoke access to your product when the subscription is unpaid since payments were already
      // attempted and retried when it was past_due.
      // To move the subscription to active, pay the most recent invoice before its due date.
      if(status === 'unpaid'){

      }

    },

    'setup_intent.succeeded':async()=>{
      //Occurs whenever a payment method is attached to a customer
      //as their default payment method
      // PaymentMethod update API. https://stripe.com/docs/api/payment_methods/update
      const {payment_method:pm_id, customer:cus_id} = evt.data.object
      const pm = await $$.getPaymentMethod(pm_id)
      const {type} = pm
      const last4 = pm[type].last4
      const brand = type==='card'?pm.card.brand:'';
      const exp_month = type==='card'?pm.card.exp_month:'';
      const exp_year = type==='card'?pm.card.exp_year:'';

      // const plupdate = await User.updatePlanProps(cus_id, {
      //   last4, cus_id, pm_id
      // })
      const pmupdate = await User.updatePayMethodProps(cus_id, {
        cus_id, pm_id, type, last4, brand, exp_month, exp_year
      }).catch(e=>__W(e))

      const updInvStgDPM = await $$.updateInvSettingsDPM(cus_id, pm_id).catch(e=>__W(e)) //new "PaymentIntent API" support
      const getSubscrs = await $$.listSubscriptions(cus_id).catch(e=>__W(e))
      if(getSubscrs && getSubscrs.length>0){
        const updSubscrDPM = await $$.updateSubscrDPM(getSubscrs[0].id, pm_id).catch(e=>__W(e)) //old "Charges API" support
      }

    },

  }
  if(evActions[evt.type]!=null){
    return evActions[evt.type]()
  }
}

const emailCustAboutOrderFulfillment = async function(session) {
  // send ticket info to customer by email
  console.log('customer email is: ' + session.customer_details.email);
}

const emailCustAboutFailedPayment = async function(session) {
  // send email about failed payment
}


