/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';
import {User} from './utils/mongoUtils.mjs';

// https://stripe.com/docs/billing/subscriptions/cancel
export async function handler(event) {
  let { jwt } = JSON.parse(event.body);
  if(jwt==null){return { ...resError('Token Required') }}

  try {
    const { lnpUser, customer } = await $$.assureCustomer(jwt)
    await $$.delAllSubscriptions(lnpUser.cus_id)
    await User.resetPlan(lnpUser.uid)

    return { ...resSuccess() };

  }
  catch (e){
    return { ...resError(e.message)}
  }

}

