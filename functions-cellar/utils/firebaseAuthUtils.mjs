//https://www.mongodb.com/docs/atlas/app-services/authentication/custom-jwt/#firebase-jwt-authentication
//https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
//https://firebase.google.com/docs/admin/setup#windows
import constants from '../../.constants.mjs';
import admin from "firebase-admin";
import { getAuth, BaseAuth  } from "firebase-admin/auth";
const serviceAccount = constants.FB_AUTH_SERVICE_ACCOUNT;

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'lnp-fb',
})

export async function deleteFbUser(uid){
  return await getAuth(app).deleteUser(uid)
}

export async function authFbJwt(jwt){
  return await getAuth(app).verifyIdToken(jwt)
  .then((decodedToken) => {
    // console.log('getAuth->decodedToken: ', decodedToken.email);
    return decodedToken;
  })
  .catch((err) => {
    console.error('getAuth->error: ', err);
    return false;
  });
}

