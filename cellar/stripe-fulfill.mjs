/**
 * endpoint for Stripe webhook to ping when a payment is confirmed
 * Receives data from Stripe
 * Performs a write to our mysql for the user
 * If anything goes wrong, make sure to have a fallback (write/log somewhere)
 *   to recover the payment confirmation and make things right for the user
 * Returns an object with existing API keys and subscription history/details
 */

const aws = require('aws-sdk');

const loadConfig = async function() {
  const ssm = new aws.SSM();
  const res = await ssm.getParameter( { Name: '/lnp/config-stripe', WithDecryption: true } ).promise();
  return JSON.parse(res.Parameter.Value);
}

exports.handler = async (event) => {
  // require Stripe signature in header
  if (!event.headers['stripe-signature']) {
    console.log('no Stripe signature received in header, returning 400 Bad Request');
    return {
      statusCode: 400
    };
  }

  const sig = event.headers['stripe-signature'];

  // require an event body
  if (!event.body) {
    console.log('no event body received in POST, returning 400 Bad Request');
    return {
      statusCode: 400
    };
  }

  // decode payload
  let payload = event.body;
  if (event.isBase64Encoded)
    payload = Buffer.from(event.body, 'base64').toString();

  // construct a Stripe Webhook event
  const config = await loadConfig();
  const stripe = require('stripe')(config.stripe_api_secret_key);

  try {
    let ev = stripe.webhooks.constructEvent(payload, sig, config.webhook_signing_secret);
  } catch (err) {
    console.log('error creating Stripe Webhook event');
    console.log(err);
    return {
      statusCode: 400
    };
  }

  // ...TODO...

  return {
    statusCode: 200
  };
}
