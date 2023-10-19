import {serverOrigin} from "../data/constants";
import {authState, jwt} from "./useAuth";
const [__,__E,__W] = [console.log,console.error,console.warn];

export default async function apiCall(endpoint, method, payload={}, headers={}) {
  const res = await authState()._refreshToken()
  if(!res){ return false; }
  const accessToken = jwt.getAccessToken()
  const opts = {method, headers:{}}
  opts.headers["Content-Type"] = "application/json";
  if(accessToken) {
    opts.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if(method==='PUT' || method==='POST'){
    opts.body = JSON.stringify(payload)
  }
  const response = await fetch(`${serverOrigin}/${endpoint}`, opts)
  .then((r)=> {
    return r.json()
  })
  .catch((err)=> {
    __E(err)
    return err
  });
  console.log(endpoint,payload,response)
  return response
}
