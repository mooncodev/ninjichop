/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import {User,} from './utils/mongoUtils.mjs';
import { generateKey, generateSecretHash } from './utils/apiKeyUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';

export async function handler(event){
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){ return resError(e.message) }

  try {
    let apiKey;
    let [ lnpUser, apiKeyHash ] = await User.assure(jwt)
    if(!lnpUser){
      throw 'Unable to Retrieve User Info'
    }


    //if an active subscription exists, do not allow additional subscriptions
    if(lnpUser.plan.sub_id){
      const activeSub = lnpUser.plan.status === 'active'
      if(!activeSub){
        return resError('No Active Subscription Found')
      }
      apiKey = generateKey(); // send to user
      apiKeyHash = generateSecretHash(apiKey); // save in db

      await User.updateProps(lnpUser.uid, {apiKey, apiKeyHash})
    } else {
      return resError('No Subscriptions Found')
    }

    return resSuccess(apiKey)


  }
  catch (e){
    return resError(e.message)
  }

}

