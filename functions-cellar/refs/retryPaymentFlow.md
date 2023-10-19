Sometimes it happens that a payment method is initially accepted (i.e. the
credit card is valid), but when the payment method is attached to the customer,
something goes wrong. This could be because the bank denies the process, or due
to insufficient funds.

The result will be a failed invoice. Specifically, there is a field on the
subscription object: `latest_invoice.payment_intent.status` 
that will have the value
`requires_payment_method`

When this happens, both a customer and a subscription is successfully created in
Stripe, so we simply want to have the customer retry the payment with another
card.


webhooks
invoice.payment_succeeded
invoice.payment_failed
customer.subscription.deleted


save the paymentMethod.id and last4 in your database

To determine whether the customer has an active subscription we check if:
subscription.CurrentPeriodEnd > now


When a customer’s subscription is renewed in Stripe a number of things happen, 
each with a corresponding event:

invoice.created - An invoice is created 
customer.subscription.updated - The subscription billing period is updated
  After an hour (giving you time to add any additional charges) Stripe attempts to charge the customer.
invoice.payment_succeeded - on successful payment


# To renew a customer subscription 
we listen for the invoice.payment_succeeded event and then do the following:

Find the customer subscription using the Stripe identifier (included in the event payload).
Retrieve the subscription details from the Stripe API.
Update our subscription’s CurrentPeriodStart and CurrentPeriodEnd with the Stripe subscription’s period_start and period_end.
Create a customer invoice using the details from the Stripe event.



#Handling failed payments
At some point customer payments will fail.

What happens when customer payments fail is largely determined by your retry 
settings in Stripe. Here you can control how many times Stripe will attempt to 
charge the customer and what the final action is:

    Cancel subscription
    Mark subscription unpaid
    Leave subscription as-is

The first scenario I want to cover is when the initial payment(s) fail but the 
customer updates their card details before the final payment attempt.


#Scenario: initial payment(s) fail, Customer updates card before final autoretry
Stripe will create an invoice and then attempt to pay it using 
the payment source (card) it has for the customer.

We have our retry settings configured to retry payment twice:
1 day after the previous attempt
3 days after the previous attempt
So a total 5 days after the initial payment attempt.
