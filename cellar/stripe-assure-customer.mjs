/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import { STRIPE } from './utils/stripeUtils.mjs';

export const handler = async(event) => {
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){return { ...resError('Token Required') }}

  try {
    const { lnpUser, customer } = await STRIPE.assureCustomer(jwt)

    return { ...resSuccess({lnpUser, customer}) };

  }
  catch (e){
    return { ...resError(e.message) }
  }


}

