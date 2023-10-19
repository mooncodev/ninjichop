import constants from '../../.constants.mjs';
import {User} from './mongoUtils.mjs';
import { __E,__, resError } from './commonUtils.mjs';
import Stripe from 'stripe';
const stripe = new Stripe(constants.STRIPE_TEST_SECRET_KEY);

export const identifyProduct = {
  // Calc amount here to prevent mod of amount on client
  swap:{
    'standard':'premium',
    'premium':'standard',
    [constants.STRIPE_TEST_PRICE_STANDARD]: constants.STRIPE_TEST_PRICE_PREMIUM,
    [constants.STRIPE_TEST_PRICE_PREMIUM]: constants.STRIPE_TEST_PRICE_STANDARD
  },
  'standard': { amount: 2999, priceId: constants.STRIPE_TEST_PRICE_STANDARD },
  'premium': { amount: 3999, priceId: constants.STRIPE_TEST_PRICE_PREMIUM },
  [constants.STRIPE_TEST_PRICE_STANDARD]: { amount: 2999, product: 'standard' },
  [constants.STRIPE_TEST_PRICE_PREMIUM]: { amount: 3999, product: 'premium' }
};

export const $$ = {
  listSubscriptions: async (cus_id)=>{
    return await stripe.subscriptions.list({
      customer: cus_id
    }).then(r=>r.data)
  },
  getPaymentMethod: async (pm_id)=>{
    return await stripe.paymentMethods.retrieve(pm_id);
  },
  getSubscription: async (sub_id)=>{
    const subscription = await stripe.subscriptions.retrieve(sub_id);
    subscription.product = identifyProduct[subscription.plan.id].product
    return sanitizeSubscriptionObj(subscription)
  },

  getActiveSubscriptionByCusId: async (cus_id)=>{
    let rv=[];
    const subs = await $$.listSubscriptions(cus_id)
    __(`${cus_id} has ${subs.length} subscription(s)`)
    if(subs.length){
      for(let sub of subs){
        __(sub.id, sub.status)
        if(sub.status === 'active'){
          rv.push(sub);
        }
      }
    }
    if(!rv.length){rv=[false]}
    if(rv.length>1){
      __E('More than 1 Active Subscription!');
      throw new Error('More than 1 Active Subscription!');
    }
    return rv[0];
  },
  getActiveSubscriptionByLnpUser: async (lnpUser)=>{
    let rv=[false,false];
    if(lnpUser.subscriptions.length){
      for(let lSubscr of lnpUser.subscriptions ){
        const sSubscr = await $$.getSubscription(lSubscr.subscriptionId)
        .catch(e=>{__E('sub_id fetched no subscription', e);});
        if(sSubscr && sSubscr.status === 'active'){
          rv = [lSubscr, sSubscr];
        }
      }
    }
    return rv;
  },
  createSubscription: async({ cus_id, product, pm_id })=>{
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    if(!pm_id){throw 'default_payment_method is required'}
    const { amount,priceId } = identifyProduct[product];
    return await stripe.subscriptions.create({
      customer: cus_id,
      items: [{
        price: priceId,
      }],
      default_payment_method: pm_id,
      collection_method:'charge_automatically',
      payment_settings: {
        // With "on_subscription", Stripe updates
        // subscription.default_payment_method
        // when a subscription payment succeeds.
        save_default_payment_method: 'on_subscription'
      },
      payment_behavior: 'error_if_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  },
  changeSubscription: async (sub_id)=>{
    const subscr = await $$.getSubscription(sub_id)
    const subscrItemId = subscr.items.data[0].id
    const subscrPriceId = subscr.items.data[0].price.id
    const swappedPriceId = identifyProduct.swap[subscrPriceId]
    return await stripe.subscriptions.update(
      sub_id,
      {
        cancel_at_period_end: false,
        proration_behavior: 'create_prorations',
        items: [{
          id: subscrItemId,
          price: swappedPriceId,
        }]
      }
    ).then(r=>{
      __E(`subscription.update success`);
      return r
    }).catch(e=>{
      __E(`subscription.update failed`, e);
      return false
    });
  },
  delSubscription: async (sub_id)=>{
    return await stripe.subscriptions.del(sub_id);
  },
  delAllSubscriptions: async (cus_id)=>{
    const subs = await $$.listSubscriptions(cus_id)
    __(`${cus_id} has ${subs.length} subscription(s)`)
    if(subs.length){
      for(let sub of subs){
        __(`deleting ${sub.id} ${sub.status}`)
        await stripe.subscriptions.del(sub.id)
      }
    }
  },
  getCustomer: async (cus_id)=>{
    return await stripe.customers.retrieve(cus_id);
  },
  delCustomer: async(cus_id)=>{
    return await stripe.customers.del(cus_id);
  },
  assureCustomer: async(jwt)=>{
    const { collection } = User;
    //assure mongo user
    let [ lnpUser, apiKeyHash ] = await User.assure(jwt)
    if(!lnpUser){return false}

    //check LNP user for existing cus_id
    let customer;
    if(!lnpUser.cus_id){
      //if LNP user has no cus_id, create stripe customer
      //https://stripe.com/docs/api/customers/create
      customer = await stripe.customers.create({
        email: lnpUser.email
      });
      console.log('Customer Created: ', customer)

      //update LNP user with the new customer object detail

      const result = await collection.updateOne(
        { uid:lnpUser.uid },
        {
          $set: {
            'cus_id': customer.id,
            'plan.cus_id': customer.id,
          }
        }
      )
      lnpUser.cus_id = customer.id
      lnpUser.plan.cus_id = customer.id
    }
    else{
      //if LNP user has cus_id, retrieve customer from stripe
      //https://stripe.com/docs/api/customers/retrieve
      customer = await stripe.customers.retrieve(lnpUser.cus_id);
      console.log('Customer Found: ', customer.email, customer.id)
    }
    return { lnpUser, customer };
  },
  makeWebhookEvent: (req_body, signature, webhookSecret)=>{
    return stripe.webhooks.constructEvent(req_body, signature, webhookSecret);
  },
  getCustEmailFromStripeEvt: async(stripeEvt)=>{
    const obj = stripeEvt.data.object
    if(obj.customer_email){
      return obj.customer_email
    } else if(obj.email){
      return obj.email
    } else if(obj.customer){
      const cus = await $$.getCustomer(obj.customer)
      return cus.email
    }else{return false}
  },
  /** @param paymentMethodId "pm_1GcbHY2eZvKYlo2CoqlVxo42" */
  getCustPaymentMethod: async(paymentMethodId)=>{ //
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodId
    );
  },
  updateCustomer: async(cus_id, updateObject)=>{
    return await stripe.customers.update(
      cus_id,
      updateObject
    );
  },
  createSetupIntent: async(cus_id)=>{
    return await stripe.setupIntents.create({
      customer: cus_id,
      confirm:false, //set true when supplying a payment method w/o client form
      payment_method_types: [
        // 'bancontact',
        'card',
        'us_bank_account',
      ],
    });
  },
  createPaymentIntent: async(cus_id, product)=>{
    const {amount} = identifyProduct[product]
    return await stripe.paymentIntents.create({
      amount, //required
      currency: 'usd', //required
      customer: cus_id,
      setup_future_usage:'off_session',
      automatic_payment_methods: {enabled: true},
      payment_method_types: [
        // 'bancontact',
        'card',
        'us_bank_account',
      ],
      description: `Payment for ${product} subscription`
    });
  },
  getInvoice: async(in_id)=>{
    return await stripe.invoices.retrieve(in_id)
  },
  //https://stripe.com/docs/api/invoices/pay
  payInvoice: async(in_id)=>{
    return await stripe.invoices.pay(in_id);
  },

  updateSubscription: async(sub_id, updateObject)=>{
    //https://stripe.com/docs/api/subscriptions/update
    return await stripe.subscriptions.update(
      sub_id,
      updateObject
     );
  },
  //new "PaymentIntent API" support
  updateInvSettingsDPM: async(cus_id, pm_id)=>{
    //https://stripe.com/docs/api/customers/update
    return await stripe.customers.update(cus_id,{
      invoice_settings: {
        default_payment_method: pm_id, // 'pm_hh5645b...'
      },
    })
  },
  //new "PaymentIntent API" support
  updateSubscrDPM: async(sub_id, pm_id)=>{
    //https://stripe.com/docs/api/subscriptions/update
    return await stripe.subscriptions.update(
      sub_id, {default_payment_method: pm_id} // 'pm_hh5645b...'
    );
  },
  //old "Charges API" support
  updateDefaultSource: async(cus_id, pm_id)=>{
    //https://stripe.com/docs/api/customers/update
    return await stripe.customers.update(cus_id,{
      default_source: pm_id, // 'pm_hh5645b...'
    })
  },

}


function sanitizeSubscriptionObj(subscription){
  delete subscription.trial_end
  delete subscription.trial_start
  delete subscription.transfer_data
  delete subscription.test_clock
  delete subscription.discount
  delete subscription.on_behalf_of
  return subscription
}

