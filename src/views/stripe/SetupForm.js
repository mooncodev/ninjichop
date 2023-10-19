import React, { useEffect, useState } from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {
  Spinner, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Box, Link, VStack,
} from '@chakra-ui/react';
import { HFlexSC, S, TestDetails } from '../bits/UtilityTags.js';
import { useAppStore } from '../../services/useAppStore.js';
import { useAuth, authState } from 'services/useAuth.js';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function SetupForm({clientSecret, onCancel}) {
  const stripe = useStripe();
  const elements = useElements();
  const isOpen = useAppStore(s=>s.setupIntentModalIsOpen)

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onClose = ()=>{
    useAppStore.getState().set_setupIntentModalIsOpen(false)
  }

  useEffect(() => {
    if (!stripe || !clientSecret) {return;}

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      console.log(`stripe.retrievePaymentIntent()`, setupIntent)
      switch (setupIntent.status) {
        case "succeeded":
          setMessage("Success! Your payment method has been saved!");
          break;
        case "processing":
          setMessage("Processing payment details. We'll update you when processing is complete.");
          break;
        case "requires_payment_method":
          setMessage("Failed to process payment details. Please try another payment method.");
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

    const confirmRes = await stripe.confirmSetup({
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
    if (confirmRes.error) {
      console.error('confirmSetup error:',confirmRes.error)
      setMessage(confirmRes.error.message);
    } else if (confirmRes.setupIntent) {
      setMessage("Successfully saved payment method!");
      setTimeout(()=>{
        onClose()
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
    <form id="setupIntent-form" style={{width:'100%',}} onSubmit={handleSubmit}>
      <TestDetails/>
      <PaymentElement options={paymentElementOptions} />
      <HFlexSC sx={{width: '100%', justifyContent: 'space-between'}}>
        <Button colorScheme='gray' mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading || !stripe || !elements} w='100%' type="submit">
          {isLoading ? <Spinner/> : "Submit"}
        </Button>
      </HFlexSC>
      {/* Show any error or success messages */}
      {hasSubmitted && message && <Box id="payment-message">{message}</Box>}

    </form>

  );
}
