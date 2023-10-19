import constants from '../../.constants.mjs';
const PROJECT_ROOT = constants.PROJECT_ROOT;
import path from 'path';
import fs from 'fs-extra';
import { format, parse } from "date-fns";

export function decodeBody(event){
  return event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body
}
export const resSuccess = (message="")=> {
  console.log('resSuccess: ',message)
  return {
//      headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: JSON.stringify({status: 'success', message: message})
  }
}
export const resError = (message="")=> {
  console.error('resError: ',message)
  return {
    statusCode: 502,
    body: JSON.stringify({status: 'error', message: message})
  }
}

export const __ = console.log;
export const __E = console.error;
export const __W = console.warn;


export function logEventToFile(stripeEvt){
  const hrTime = format(new Date(Date.now()), 'MMdd-HHmm-ssms')
  const LOGPATH = path.join(PROJECT_ROOT,`functions/logs/${hrTime}-${stripeEvt.type}.json`);
  fs.ensureFileSync(LOGPATH);
  fs.writeJsonSync(LOGPATH, stripeEvt, {spaces:2});
}
export function logToFile(json, filename='log'){
  const hrTime = format(new Date(Date.now()), 'MMdd-HHmm-ssms')
  const LOGPATH = path.join(PROJECT_ROOT,`functions/logs/${hrTime}-${filename}.json`);
  fs.ensureFileSync(LOGPATH);
  fs.writeJsonSync(LOGPATH, json, {spaces:2});
}
