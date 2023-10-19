/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Performs customer creation with Stripe using app's authenticated email
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import constants from '../.constants.mjs';
import {authFbJwt} from './utils/firebaseAuthUtils.js'

const stripe_api_secret_key = '';

const calculateOrderAmount = (product) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  //TODO: Non USD currencies should calculate to an equivalent USD amount
  return {
    'standard':2999,
    'premium':3999,
  }[product];
};

export const handler = async(event) => {
  const { product, currency = "usd", jwt } = JSON.parse(event.body);
  if(product==null||email==null||name==null){return {statusCode:400}}
  const stripe = require('stripe')(constants.STRIPE_TEST_SECRET_KEY)

  const authResult = await authFbJwt(jwt)
  if(!authResult){ return { statusCode: 401, body: 'Could not Authenticate' }; }

  try {
    const customer = await stripe.customers.create({ email: authResult.email });
  }
  catch (e){return {statusCode:400, body:e.message}}

  try {
    const amount = calculateOrderAmount(product);
    const paymentIntent = await stripe.paymentIntents.create({
      amount, currency,
      automatic_payment_methods: { enabled: true, },
      // automatic_payment_methods contrasts manually determining payment methods per user location/currency
    });
    //paymentIntent will carry a client secret which can be returned to client app
    //so the user can access things from PaymentIntent like the tx status
    return {
      statusCode: 200, // http status code
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      }),
      //   body: JSON.stringify('Hello from Lambda! createPaymentIntent'),
    };
  } catch (e) {
    return {
      statusCode: 500, // http status code
      body: e.message
    }
  }
}

