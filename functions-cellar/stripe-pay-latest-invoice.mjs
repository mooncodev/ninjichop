/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import {resError, resSuccess, __, __E, __W, logToFile} from './utils/commonUtils.mjs';
import { User } from './utils/mongoUtils.mjs';
import { $$,identifyProduct } from './utils/stripeUtils.mjs';


/** PAYMENT INTENT */
export async function handler(event) {
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){return resError('Token required');}
  // else if( ['standard','premium'].indexOf(product)<0 ){
  //   return resError(`param 'product' is required for paymentIntent ['standard','premium']`);
  // }

  try {
    const { lnpUser, customer } = await $$.assureCustomer(jwt)
    if(!lnpUser.plan.sub_id){
      return resError(`User has no subscription`);
    }
    if(lnpUser.plan.status==='active'){
      return resError(`Subscription is active, a payment is not needed`);
    }
    const subscr = await $$.getSubscription(lnpUser.plan.sub_id)
    const in_id = subscr.latest_invoice
    // const pm_id = subscr.default_payment_method
    // const {price_id} = subscr.plan
    //  const {amount, product} = identifyProduct[price_id]
    // // const invoice = $$.getInvoice(in_id)

    const intent = await $$.payInvoice(in_id);

    // const {client_secret} = intent

    // logToFile(intent, `stripe-pay-latest-invoice`);

    return resSuccess();

  }
  catch (e){
    return resError(e.message)
  }

}

