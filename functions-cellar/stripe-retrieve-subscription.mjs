/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';

export async function handler(event) {
  const { sub_id } = JSON.parse(event.body);
  if(sub_id==null){return { ...resError('Id Required') }}

  try {
    const subscription = await $$.getSubscription(
      sub_id
    );

    return { ...resSuccess(subscription) };

  }
  catch (e){
    return { ...resError(e.message) }
  }

}

