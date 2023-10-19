/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import { User } from './utils/mongoUtils.mjs';
import {$$, identifyProduct} from './utils/stripeUtils.mjs';


export async function handler(event) {
  const { jwt, product } = JSON.parse(event.body);
  if(jwt==null){return resError('Token Required') }
  if(product==null || ['standard','premium'].indexOf(product)<0){return resError('Product must be specified') }

  try {
    const { collection } = User;
    const { lnpUser, customer } = await $$.assureCustomer(jwt)
    if(lnpUser.plan.sub_id){
      return resError(`Subscription already exists: ${lnpUser.plan.sub_id}`);
    }

    const custSubscrs = $$.listSubscriptions(lnpUser.cus_id)
    if(custSubscrs.length){
      return resError(`Subscription already exists and is not attached to lnpUser: ${custSubscrs[0].id}`);
    }
    //if an active subscription exists, do not allow additional subscriptions
    const {cus_id} = lnpUser.plan
    const {pm_id} = lnpUser.payMethod
    const subscription = await $$.createSubscription({
      //assureCustomer() previously provided cus_id if not yet present
      cus_id, product, pm_id
    })

    console.log('Created new subscription: ', subscription)

    //append new subscription to mongodb user
    const planObj = User.makePlanObj(subscription)
    const appendNewSub = await User.updatePlanProps(lnpUser.uid, planObj)
    console.log('appendNewSubResult: ', appendNewSub)

    //paymentIntent will carry a client secret which can be returned to client app
    //so the user can access things from PaymentIntent like the tx status
    return resSuccess({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    })



  }
  catch (e){
    return resError(e.message)
  }

}

