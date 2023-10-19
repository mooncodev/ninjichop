import constants from '../../.constants.mjs';
import {User} from './mongoUtils.mjs';
import { $$ } from './stripeUtils.mjs';
import { format, parse } from "date-fns";
import Stripe from 'stripe';
import { logToFile } from './commonUtils.mjs';
const stripe = new Stripe(constants.STRIPE_TEST_SECRET_KEY);
const { collection } = User;
const cus_id1 = 'cus_NVqChN0NDpMZns'
const pm_id1 = 'pm_1MkbY2D1nNXXpxulSxKaTlMx'

async function main(){

  // await stripeAC.setDfltPaymtMthd3()

  //https://stripe.com/docs/api/subscriptions/update

  // await $$.delSubscription('sub_1MUx9qD1nNXXpxulXpuh85QV')
  // await $$.delAllSubscriptions(cus_id1)
  // await User.resetPlan(cus_id1)
  // await $$.getActiveSubscriptionByCusId('cus_NEVap82sQScdLo')
  const getSubscrs = await $$.listSubscriptions(cus_id1)
  // const updDFLTSRC = await $$.updateSubscrDPM(getSubscrs[0].id, pm_id1) //old "Charges API" support
  // const updDFLTSRC = await $$.updateDefaultSource(cus_id1, '') //old "Charges API" support eg. card_dccdby738bc78
  await stripeAC.generateCustomerReport(cus_id1)
  // const custSubscrs = $$.listSubscriptions(cus_id1)


}

const mongoAC = {
  removeSubFromUser: async()=>{
    await collection.updateOne(
      { uid: "gCrZ1bR3yOXqZdYl39IfN1cgCKR2" },
      {
        "$set": {
          "plan": {
            sub_id: ''
          }
        }
      }
    )
  },
}

const stripeAC = {
  setTrialEndForSubscription: async ()=>{
    const u2 = await stripe.subscriptions.update('sub_1MUx9qD1nNXXpxulXpuh85QV', {
      trial_end: Date.now() + 20000,
      proration_behavior: 'none'
    })
  },
  setDfltPaymtMthd1: async ()=>{
    const source = await stripe.sources.create({
      //type= [ach_credit_transfer, ach_debit, alipay, bancontact, card, card_present, eps, giropay, ideal, multibanco, klarna, p24, sepa_debit, sofort, three_d_secure, or wechat]
      type: 'card',
      card: {
        number: '4000009990000006',
        exp_month: 8, exp_year: 2022,
      },
    });
    const u1 = await stripe.customers.update('cus_NEVap82sQScdLo',{
      source: source.id, //stripe will set as default_source
    })
  },
  setDfltPaymtMthd2: async ()=>{
    const source = await stripe.customers.createSource(
      'cus_NEVap82sQScdLo',
      {
        source: source.id,
      },
      async (err, _source)=>{
        const u22 = await stripe.customers.update('cus_NEVap82sQScdLo',{
          default_source: _source.id,
        })
      }
    );
  },
  setDfltPaymtMthd3: async ()=>{
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card', card: { number: '4242424242424242',
        exp_month: 8, exp_year: 2025, cvc: '314',
      },
    });
    // https://stripe.com/docs/api/customers/update
    const u33 = await stripe.customers.update('cus_NEVap82sQScdLo',{
      invoice_settings: {
        default_payment_method: paymentMethod.id, // 'pm_hh5645b...'
      },
    })
  },
  createAndConfirmPaymentIntent: async ()=>{
    // https://stripe.com/docs/api/payment_intents/create
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      payment_method_types: ['card'],
      confirm: true, //attempts to confirm immediately
      error_on_requires_action: true, // used with confirm:true
    });
  },
  payOverdueInvoice: async ()=>{
    // https://stripe.com/docs/api/payment_intents/create
    // const customerId = evt.data.object.customer;
    const customerId = 'cus_NEVap82sQScdLo';
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "past_due",
      limit: 1,
    });
    if (subscriptions.data) {
      // retrieve and pay open invoice for overdue subscription
      const invoices = await stripe.invoices.list({
        customer: customerId,
        subscription: subscriptions.data[0].id,
        status: "open",
        limit: 1,
      });
      if (invoices.data) {
        await stripe.invoices.pay(invoices.data[0].id);
      }
    }
  },
  generateCustomerReport: async(cus_id)=>{
    // https://stripe.com/docs/api/payment_intents/create
    //sources API deprecated, use paymentmethod API instead
    let cus = await stripe.customers.retrieve(
      cus_id, {
        expand:['sources',
          'subscriptions',
          'subscriptions.data.default_payment_method',
          'subscriptions.data.default_source',
          'subscriptions.data.latest_invoice'
        ]
      }
    )
    logToFile(cus, 'O_customer')
  }
}
main().then(()=>{process.exit(0)})
.catch((error)=>{console.error(error);process.exit(1);})
