/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import {resError, resSuccess, __, __E, __W, logToFile} from './utils/commonUtils.mjs';
// import { User } from './utils/mongoUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';

/** SETUP INTENT */
export async function handler(event){
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){return resError('Token required');}

  try {
    const { lnpUser, customer } = await $$.assureCustomer(jwt)

    const intent = await $$.createSetupIntent(lnpUser.cus_id)

    const {client_secret} = intent

    // logToFile(intent, `stripe-create-setup-intent`);
    console.log(`new setupIntent client_secret: `, client_secret)


    //paymentIntent will carry a client secret which can be returned to client app
    //so the user can access things from PaymentIntent like the tx status
    return resSuccess({client_secret});


  }
  catch (e){
    return resError(e.message)
  }

}

