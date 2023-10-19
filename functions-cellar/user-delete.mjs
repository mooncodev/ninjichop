/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import { User } from './utils/mongoUtils.mjs';
import { $$ } from './utils/stripeUtils.mjs';
import {authFbJwt, deleteFbUser} from "./utils/firebaseAuthUtils.mjs";


export async function handler(event) {
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){return resError('Token Required') }

  try {
    const {uid, email} = await authFbJwt(jwt)
    if(!uid){return resError('JWT AUTH FAILED')}
    // perform actions on the collection object
    let user = User.get(uid);
    const delResult1 = await $$.delCustomer(uid).catch(e=>__W(e))
    // if(delResult1.deleted===true){} //do something with delResult1.id which is the cus_id
    const delResult2 = await User.delete(uid).catch(e=>__W(e))

    const delResult3 = await deleteFbUser(uid).catch(e=>__W(e))

    return resSuccess()

  }
  catch (e){
    return resError(e.message)
  }

}

