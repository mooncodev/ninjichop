import React, { useEffect, useState } from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Spinner, Button } from '@chakra-ui/react';
import { HFlexSC, S } from '../bits/UtilityTags.js';
import { authState } from 'services/useAuth.js';

export default function CheckoutForm({product,clientSecret, onCancel}) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) {return;}

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(`stripe.retrievePaymentIntent()`, paymentIntent)
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setMessage("Submitting...");
    setHasSubmitted(true)
    setIsLoading(true);

    //https://stripe.com/docs/js/payment_intents/confirm_payment
    const confirmRes = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3002/subscriptions`,
      },
      redirect: 'if_required'
    });

    // Due to redirect (return_url), this point will only be reached if there is
    // an immediate error when confirming the payment.  For some payment methods
    // like iDEAL, your customer will be redirected to an intermediate site first
    // to authorize the payment, then redirected to the `return_url`.


    if (confirmRes.error.type === "card_error" || confirmRes.error.type === "validation_error") {
      setMessage(confirmRes.error.message);
    } else if (confirmRes.paymentIntent) {
      setMessage("Successfully processed payment!");
      setTimeout(async ()=>{
        await authState().fetchLnpUserInfo()
        onCancel()
      },3000)
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);

  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" style={{width:'100%', marginTop:'2rem'}} onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <HFlexSC sx={{width: '100%', justifyContent: 'space-between'}}>
        <Button disabled={isLoading} onClick={onCancel} sx={{px:['1rem','1.3rem','3rem'],mr:'1rem'}}>
          {isLoading ? <Spinner/> : "Cancel"}
        </Button>
        <Button disabled={isLoading || !stripe || !elements} w='100%' type="submit">
          {isLoading ? <Spinner/> : "Pay now"}
        </Button>
      </HFlexSC>
      {/* Show any error or success messages */}
      {hasSubmitted && message && <div id="payment-message">{message}</div>}
    </form>
  );
}
