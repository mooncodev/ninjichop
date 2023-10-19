/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import constants from '../.constants.mjs';
import { $$, identifyProduct } from './utils/stripeUtils.mjs';
import { User } from './utils/mongoUtils.mjs';


// https://stripe.com/docs/billing/subscriptions/upgrade-downgrade
export async function handler(event) {
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){ return resError('Token Required') }

  try {
    const { collection } = User;
    const { lnpUser, customer } = await $$.assureCustomer(jwt)

    //detect active subscription
    const sub_id = lnpUser.plan.sub_id
    if(!sub_id){
      return resError('No subscription present')
    }
    const result = await $$.changeSubscription(sub_id)
    if(!result){
      return resError('Unable to convert subscription')
    }

    return resSuccess(result)


  }
  catch (e){
    return resError(e.message)
  }

}

