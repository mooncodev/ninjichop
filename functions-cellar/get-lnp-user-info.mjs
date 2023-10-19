/**
 * Receives a string email and jwt from auth on client
 * Performs check with auth service using jwtoken
 * Performs read from mysql db
 * Returns an object with existing API keys and subscription history/details
 */
import { resError, resSuccess, __, __E, __W } from './utils/commonUtils.mjs';
import {User} from './utils/mongoUtils.mjs';

const mockResp = {
  email:'',
  uid:'',
  apiKey: '1111qqqq2222wwww3333eeee',
  cus_id:'',
  plan:[{
    product:'premium',
    product_hr:'Premium',
    status:'Active',
    nextPayment:'01/01/2222',
    amount:'39.99',
    amount_hr:'$39.99',
  }],
  payMethod:{
    cus_id:'',
    pm_id:''
  },
}

export async function handler(event, context){
  // const { method } = event.queryStringParameters
  const { jwt } = JSON.parse(event.body);
  if(jwt==null){return resError('Token Required') }

  try{
    const [ lnpUser, apiKeyHash ] = await User.assure(jwt)
    if(!lnpUser){
      throw 'Unable to Retrieve User Info'
    }
    return resSuccess(lnpUser)
  }catch(e){
    console.log('Catch!' ,e)
    return resError(e)
  }
}
