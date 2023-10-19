/**
 * Receives amount and currency from stripe elements widget on client
 * Performs stripe.paymentIntents.create() which awaits processing Stripe-side
 * Perhaps? Performs stripe-fulfill endpoint on payment confirmation
 * Returns payment confirmation to client
 */
import constants from '../.constants.mjs';
/*
in react:
(async () => {
  const response = await fetch('/secret');
  const {client_secret: clientSecret} = await response.json();
  // Render the form using the clientSecret
})();
*/
export const handler = async(event) => {
  const { product, currency = "usd" } = JSON.parse(event.body);
  const stripe = require('stripe')(constants.STRIPE_TEST_PUBLISHABLE_KEY)
  const user = event.body.user
  try {
    //TODO: Fetch or create the PaymentIntent
    //dont know how to fetch an existing payment intent ...
    // so for now we rely on createpaymentintent to return the secret
    // and we do not use this lambda.
    //this leads to creating additional paymentintents, for example on page refresh
    // or component rerenders... but thats bearable
    // until a more direct solution is found, all I could think of is that the client secret
    // is logged to the DB for the user on payment intent creation,
    // and this lambda would check the DB to see if the secret exists/is active
    // but that would require a lot of manual management for their secret,
    // as an old secret needs to be cleaned up when obsolete
    const intent = await fetchFromMongoDB('/us~er/payme~ntint~ent')
    //paymentIntent will carry a client secret which can be returned to client app

    return {
      statusCode: 200, // http status code
      body: JSON.stringify({
        client_secret: intent.client_secret
      }),
    };
  } catch (e) {
    return {
      statusCode: 500, // http status code
      body: 'error'
    }
  }
}

