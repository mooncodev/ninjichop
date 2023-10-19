import { authFbJwt  } from './firebaseAuthUtils.mjs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import {$$, identifyProduct} from "./stripeUtils.mjs";
import {format} from "date-fns";
import {logToFile} from "./commonUtils.mjs";
const atlasURI = "mongodb://tznadmin:*****@ninji.me:22298/?authMechanism=DEFAULT&authSource=tarzan";
const client = new MongoClient(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const database = client.db("kzm");
const collection = database.collection("users")

const defaultPlanObj = {
  cus_id:'', sub_id:'', price_id:'', in_id:'',
  status:'', product:'',product_hr:'', amount:'', amount_hr:'',
  currency:'',
  current_period_start:'', current_period_end:'',
  current_period_start_hr:'', current_period_end_hr:'',
}
const defaultPayMethodObj = {
  cus_id:'', pm_id:'', last4:'', type:'', brand:'', exp_month:'', exp_year:''
}
export const User = {
  collection,
  //@example const user = await User.get(anyId);
  get: async(anyId)=>{
    const filter = filterFromAnyId(anyId)
    return await collection.findOne(filter)
  },
  /** jwt -> firebase auth -> uid -> User (upserts)
   * @example
   * const [ lnpUser, apiKeyHash ] = await User.assure(jwt);
   * @returns returns lnpUserInfo object with apiKeyHash
   * pulled out to avoid accidentally sending the hash to client*/
  assure: async(jwt)=>{
    //validate the jwt through firebase auth
    //TODO authenticate elsewhere to modularize and avoid duplication
    const {uid, email} = await authFbJwt(jwt)
    if(!uid){
      console.log('JWT AUTHENTICATION FAILED')
      return [false, false]
    }
    // perform actions on the collection object
    let userRecord;
    const filter = { uid };
    const cursor = await collection.find(filter)
    const docs = await cursor.toArray();
    if(docs.length===1){
      console.log('FOUND LNP USER: ', docs[0].email, docs[0].uid)
      userRecord = docs[0]
    }
    else if (!docs.length) {
      console.log("USER NOT FOUND - CREATING NEW USER DOCUMENT");
      userRecord = {
        email,
        uid,
        cus_id: '',
        apiKey:'',
        apiKeyHash:'',
        plan: defaultPlanObj,
        payMethod: defaultPayMethodObj,
      }
      const result = await collection.insertOne(userRecord)
      console.log('Create User Result: ', result)
    }else if(docs.length>1){
      console.error('!! FOUND MORE THAN 1 USER !!: ', docs)
      userRecord = false;
    }else{
      console.error('!! Something went terribly wrong !!: ', docs)
      userRecord = false;
    }
    if(!userRecord){
      return [false, false]
    }
    const [ lnpUser, apiKeyHash ] = pullHashFromLnpUser(userRecord)
    return [ lnpUser, apiKeyHash ]
  },
  delete: async(anyId)=>{
    const result = await collection.deleteOne(
      filterFromAnyId(anyId)
    )
  },
  addPlan: async(anyId, planObj)=>{
    const result = await collection.updateOne(
      filterFromAnyId(anyId),
      { $set: { plan: planObj } }
    )
    console.log('addPlan: ', result)
    return result
  },
  resetPlan: async(anyId)=>{
    const result = await collection.updateOne(
      filterFromAnyId(anyId), {$set: { plan: defaultPlanObj }}
    )
    console.log('User.resetPlan: ', result)
    return result
  },
  updatePlanProp: async({anyId, key, val})=>{
    const result = await collection.updateOne(
      filterFromAnyId(anyId), { $set: { [`plan.${key}`]: val } }
    )
    console.log('User.updatePlanProp: ', result)
    return result
  },
  updatePlanProps: async(anyId, updaterObj)=>{
    updaterObj = Object.entries(updaterObj).reduce((acc, [k,v])=>{
      acc[`plan.${k}`] = v; return acc;
    },{})
    const result = await collection.updateOne(
      filterFromAnyId(anyId),
      { $set: updaterObj}
    )
    console.log('User.updatePlanProps: ', result)
    return result
  },
  updatePayMethodProps: async(anyId, updaterObj)=>{
    updaterObj = Object.entries(updaterObj).reduce((acc, [k,v])=>{
      acc[`payMethod.${k}`] = v; return acc;
    },{})
    const result = await collection.updateOne(
      filterFromAnyId(anyId),
      { $set: updaterObj}
    )
    console.log('User.updatePayMethodProps: ', result)
    return result
  },
  updateProp: async({uid, key, newVal})=>{
    const result = await collection.updateOne(
      { uid: uid },
      { $set: { [`${key}`]: newVal } }
    )
    console.log('User.updateProp: ', result)
    return result
  },
  updateProps: async(anyId, updaterObj)=>{
    const filter = filterFromAnyId(anyId)
    const result = await collection.updateOne(
      filter, { $set: updaterObj }
    )
    console.log('User.updateProps: ', result)
    return result
  },
  makePlanObj: (stripeSubscrObj)=>{
    const {id:sub_id, plan, status, currency, customer:cus_id,
      current_period_start, current_period_end,
      latest_invoice} = stripeSubscrObj;
    const {id:in_id} = latest_invoice;
    const {id:price_id} = plan;
    const {product, amount} = identifyProduct[price_id]
    return {
      cus_id, sub_id, price_id, in_id, status,
      product, product_hr: product.charAt(0).toUpperCase() + product.slice(1),
      amount, amount_hr: `$${amount / 100}`,
      currency,
      current_period_start, current_period_start_hr:format(new Date(current_period_start * 1000), 'yyyy/MM/dd'),
      current_period_end, current_period_end_hr:format(new Date(current_period_end * 1000), 'yyyy/MM/dd'),
    }

  }
}

function filterFromAnyId(id_cusid_email){
  return id_cusid_email.indexOf('cus_')>-1 ? {cus_id: id_cusid_email}
    : id_cusid_email.indexOf('@')>-1 ? {email: id_cusid_email}
      : {uid: id_cusid_email}
}

/** separate apiKeyHash from user object
  * to assure we never send hash to client */
export function pullHashFromLnpUser(lnpUser){
  let apiKeyHash = '';
  if(lnpUser.apiKeyHash){
    apiKeyHash = lnpUser.apiKeyHash;
    delete lnpUser.apiKeyHash;
  }
  return [ lnpUser, apiKeyHash ]
}
