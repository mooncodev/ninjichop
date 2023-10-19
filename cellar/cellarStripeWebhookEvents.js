import {$$} from "../functions-cellar/utils/stripeUtils.mjs";

export const miscEvents = {
  'balance.available':async()=>{
    //Occurs whenever your Stripe balance has been updated
    // (e.g., when a charge is available to be paid out).
    // By default, Stripe automatically transfers funds
    // in your balance to your bank account on a daily basis.
    // This event is not fired for negative transactions.
  },
  'cash_balance.funds_available':async()=>{
    //Occurs whenever there is a positive remaining cash
    // balance after Stripe automatically reconciles new
    // funds into the cash balance. If you enabled manual
    // reconciliation, this webhook will fire whenever
    // there are new funds into the cash balance.
  },
  'customer_cash_balance_transaction.created':async()=>{
    //Occurs whenever a new customer cash balance transactions is created.
  },
  'order.created':async()=>{
    //Occurs whenever an order is created.
  },

  'payout.canceled':()=>{
    //Occurs whenever a payout is canceled.
  },
  'payout.created':()=>{
    //Occurs whenever a payout is created.
  },
  'payout.failed':()=>{
    //Occurs whenever a payout attempt fails.
  },
  'payout.paid':()=>{
    //Occurs whenever a payout is expected to be available
    // in the destination account. If the payout fails,
    // a payout.failed notification is also sent, at a later time.
  },
  'payout.updated':()=>{
    //Occurs whenever a payout is updated.
  },

  'transfer.created':()=>{
    //Occurs whenever a transfer is created.
  },
  'transfer.reversed':()=>{
    //Occurs whenever a transfer is reversed, including partial reversals.
  },
  'transfer.updated':()=>{
    //Occurs whenever a transfer’s description or metadata is updated.
  },

  'recipient.created':()=>{
    //Occurs whenever a recipient is created.
  },
  'recipient.deleted':()=>{
    //Occurs whenever a recipient is deleted.
  },
  'recipient.updated':()=>{
    //Occurs whenever a recipient is updated.
  },

}

const invoiceEvents = {
  'invoice.deleted':async()=>{
    // Occurs whenever a draft invoice is deleted.
  },
  'invoice.created':async()=>{
    // Occurs whenever a new invoice is created. To learn how webhooks can be used with this event, and how they can affect it, see Using Webhooks with Subscriptions.
  },
  'invoice.finalization_failed':async()=>{
    // Occurs whenever a draft invoice cannot be finalized. See the invoice’s last finalization error for details.
  },
  'invoice.finalized':async()=>{
    // Occurs whenever a draft invoice is finalized and updated to be an open invoice.
  },
  'invoice.marked_uncollectible':async()=>{
    // Occurs whenever an invoice is marked uncollectible.
  },
  'invoice.paid':async()=>{
    // Occurs whenever an invoice payment attempt succeeds or an invoice is marked as paid out-of-band.
    // Sent when the invoice is successfully paid. You can provision access to your product
    // when you receive this event and the subscription status is active.
  },
  'invoice.payment_action_required':async()=>{
    // Occurs whenever an invoice payment attempt requires further user action to complete.
    // 3D Secure (3DS) is a case where this occurs
    // subscription.latest_invoice.payment_intent.status === "requires_action"
    // set special status in user object
    // status should trigger "Action Required: Authenticate Payment" Button in client tied to subscription
    // onClick will trigger stripe.ConfirmCardPayment(user.subscriptions[i].clientSecret)
    // this will display an authentication modal, attempts payment, then closes the modal
    // monitor invoice.paid event for
  },
  'invoice.payment_failed':async()=>{
    // Occurs whenever an invoice payment attempt fails, due either to a declined payment or to the lack of a stored payment method.
  },
  'invoice.payment_succeeded':async()=>{
    // Occurs whenever an invoice payment attempt succeeds.
    const customer = lnpUser.cus_id;
    const subId = evt.data.object.subscription;
    const subscription = await $$.getSubscription(subId);
    const periodEnd = subscription.current_period_end;

    await collection.updateOne({ email: lnpUser.email }, {
      $set: {
        paymentStatus: "succeeded",
        isCanceled: false,
        periodEnd: periodEnd,
      },
    });
    console.log("Payment Succeeded!");
  },
  'invoice.sent':async()=>{
    // Occurs whenever an invoice email is sent out.
  },

  'invoice.upcoming':async()=>{
    // Occurs X number of days before a subscription is scheduled to
    // create an invoice that is automatically charged—where X is
    // determined by your subscriptions settings.
    // Note: The received Invoice object will not have an invoice ID.
  },
  'invoice.updated':async()=>{
    // Occurs whenever an invoice changes (e.g., the invoice amount).
  },
  'invoice.voided':async()=>{
    // Occurs whenever an invoice is voided.
    // Tracking here seems unnecessary
    // Sparse documentation
  },
}

const invoiceItemEvents = {
  'invoiceitem.created':async()=>{
    // Occurs whenever an invoice item is created.
  },
  'invoiceitem.deleted':async()=>{
    // Occurs whenever an invoice item is deleted.
  },
  'invoiceitem.updated':async()=>{
    // Occurs whenever an invoice item is updated.
  },
}

const checkoutEvents = {

  'checkout.session.async_payment_failed':async()=>{
    //Occurs when a payment intent using a delayed payment method fails.
    //TODO send an email to the customer asking them to retry their order

  },
  'checkout.session.async_payment_succeeded':async()=>{
    //Occurs when a payment intent using a delayed payment method finally succeeds.
    //TODO fulfill the purchase...
  },
  'checkout.session.completed':async()=>{
    //Occurs when a Checkout Session has been successfully completed.
    //TODO save an order in your database, marked as 'awaiting payment'

    // check if the order is paid (e.g., from a card payment)
    // a delayed notification payment will have an `unpaid` status
    if (session.payment_status === 'paid') {
      // await fulfillOrder(session);
    }
  },
  'checkout.session.expired':async()=>{
    //Occurs when a Checkout Session is expired.
  },
}

const chargeEvents = {
  'charge.captured':async()=>{
    //Occurs whenever a previously uncaptured charge is captured.
  },
  'charge.expired':async()=>{
    //Occurs whenever an uncaptured charge expires.
  },
  'charge.failed':async()=>{
    //Occurs whenever a failed charge attempt occurs.
  },
  'charge.pending':async()=>{
    //Occurs whenever a pending charge is created.
  },
  'charge.refunded':async()=>{
    //Occurs whenever a charge is refunded, including partial refunds.
  },
  'charge.succeeded':async()=>{
    //Occurs whenever a charge is successful.
  },
  'charge.updated':async()=>{
    //Occurs whenever a charge description or metadata is updated.
  },
  'charge.dispute.closed':async()=>{
    //Occurs when a dispute is closed and the dispute status
    // changes to lost, warning_closed, or won.
  },
  'charge.dispute.created':async()=>{
    //Occurs whenever a customer disputes a charge with their bank.
  },
  'charge.dispute.funds_reinstated':async()=>{
    //Occurs when funds are reinstated to your account after a
    // dispute is closed. This includes partially refunded payments.
  },
  'charge.dispute.funds_withdrawn':async()=>{
    //Occurs when funds are removed from your account due to a dispute.
  },
  'charge.dispute.updated':async()=>{
    //Occurs when the dispute is updated (usually with evidence).
  },
  'charge.refund.updated':async()=>{
    //Occurs whenever a refund is updated, on selected payment methods.
  },

}

const subscriptionScheduleEvents = {
  'customer.subscription.pending_update_applied':async()=>{
    //Occurs whenever a customer’s subscription’s
    // pending update is applied, and the subscription is updated.
  },
  'customer.subscription.pending_update_expired':async()=>{
    //Occurs whenever a customer’s subscription’s
    // pending update expires before the related invoice is paid.
  },
  'customer.subscription.trial_will_end':async()=>{
    //Occurs three days before a subscription’s trial period is scheduled to end,
    // or when a trial is ended immediately (using trial_end=now).
  },

  'subscription_schedule.aborted':async()=>{
    //Occurs whenever a subscription schedule is canceled due to the
    // underlying subscription being canceled because of delinquency.
  },
  'subscription_schedule.canceled':async()=>{
    //Occurs whenever a subscription schedule is canceled.
    await User.updateSubscrProp({
      anyId: lnpUser.uid, subId: evt.subscriptionId,
      prop: 'status', newVal: 'canceled',
    })

  },
  'subscription_schedule.completed':async()=>{
    //Occurs whenever a new subscription schedule is completed.
    await User.updateSubscrProp({
      anyId: lnpUser.uid, subId: evt.subscriptionId,
      prop: 'status', newVal: 'completed',
    })

  },
  'subscription_schedule.created':async()=>{
    //Occurs whenever a new subscription schedule is created.
  },
  'subscription_schedule.expiring':async()=>{
    //Occurs 7 days before a subscription schedule will expire.
  },
  'subscription_schedule.released':async()=>{
    //Occurs whenever a new subscription schedule is released.
  },
  'subscription_schedule.updated':async()=>{
    //Occurs whenever a subscription schedule is updated.
  },

}
const customerEvents = {
  'customer.created':async()=>{
    //Occurs whenever a new customer is created.
  },
  'customer.deleted':async()=>{
    //Occurs whenever a customer is deleted.
  },
  'customer.updated':async()=>{
    //Occurs whenever any property of a customer changes.
  },

}

const radarAndReviewEvents = {
  'radar.early_fraud_warning.created':async()=>{
    //Occurs whenever an early fraud warning is created.
  },
  'radar.early_fraud_warning.updated':async()=>{
    //Occurs whenever an early fraud warning is updated.
  },
  'review.closed':async()=>{
    //Occurs whenever a review is closed. The review’s reason
    // field indicates why: approved, disputed, refunded, or refunded_as_fraud.
  },
  'review.opened':async()=>{
    //Occurs whenever a review is opened.
  },
}

const paymentIntentEvents = {
  'payment_intent.amount_capturable_updated':async()=>{
    //Occurs when a PaymentIntent has funds to be captured.
    // Check the amount_capturable property on the PaymentIntent
    // to determine the amount that can be captured. You may
    // capture the PaymentIntent with an amount_to_capture value
    // up to the specified amount. Learn more about capturing PaymentIntents.
    // https://stripe.com/docs/api/payment_intents/capture
  },
  'payment_intent.canceled':async()=>{
    //Occurs when a PaymentIntent is canceled.
  },
  'payment_intent.created':async()=>{
    //Occurs when a new PaymentIntent is created.
  },
  'payment_intent.partially_funded':async()=>{
    //Occurs when funds are applied to a customer_balance
    // PaymentIntent and the ‘amount_remaining’ changes.
  },
  'payment_intent.payment_failed':async()=>{
    //Occurs when a PaymentIntent has failed the attempt
    // to create a payment method or a payment.
  },
  'payment_intent.processing':async()=>{
    //Occurs when a PaymentIntent has started processing.
  },
  'payment_intent.requires_action':async()=>{
    //Occurs when a PaymentIntent transitions to requires_action state
  },
  'payment_intent.succeeded':async()=>{
    //Occurs when a PaymentIntent has successfully completed payment.
  },
}

const paymentMethodEvents = {
  'payment_method.attached':async()=>{
    //Occurs whenever a new payment method is attached to a customer.
  },
  'payment_method.automatically_updated':async()=>{
    //Occurs whenever a payment method’s details are
    // automatically updated by the network.
  },
  'payment_method.detached':async()=>{
    //Occurs whenever a payment method is detached from a customer.
  },
  'payment_method.updated':async()=>{
    //Occurs whenever a payment method is updated via the
    // PaymentMethod update API. https://stripe.com/docs/api/payment_methods/update
  },
}
