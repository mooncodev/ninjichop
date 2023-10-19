/**
 * https://docs.netlify.com/functions/functions-and-identity/
 * Triggered when an Identity user signs up with Netlify Identity
 * and confirms their email address. Note that this fires for email+password signups only,
 * not for signups using external providers such as Google or GitHub.
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';

export async function handler(event, context) {
  console.log('identity-signup ev body' ,event.body)
  try{
    //todo anything
    return { ...resSuccess() }

  }catch(e){
    console.log('Catch!' ,e)
    return { ...resError(e.message) }
  }
}
