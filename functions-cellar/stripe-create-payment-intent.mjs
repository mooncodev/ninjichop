/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import {resError, resSuccess, __, __E, __W, logToFile} from './utils/commonUtils.mjs';
import { User } from './utils/mongoUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';


/** PAYMENT INTENT */
export async function handler(event) {
  const { jwt, product } = JSON.parse(event.body);
  if(jwt==null){return resError('Token required');}
  else if( ['standard','premium'].indexOf(product)<0 ){
    return resError(`param 'product' is required for paymentIntent ['standard','premium']`);
  }

  try {
    const { lnpUser, customer } = await $$.assureCustomer(jwt)

    const intent = await $$.createPaymentIntent(lnpUser.cus_id, product);

    const {client_secret} = intent

    logToFile(intent, `stripe-create-payment-intent`);
    console.log(`new paymentIntent client_secret: `, client_secret)

    return resSuccess({client_secret});

  }
  catch (e){
    return resError(e.message)
  }

}

