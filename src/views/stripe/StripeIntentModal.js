import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { Spinner, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,ModalCloseButton,
} from '@chakra-ui/react';
import { ExtLinkBtn, HFlexSC, S } from '../bits/UtilityTags.js';
import { appState, useAppStore } from 'services/useAppStore.js';
import { useAuth, authState } from 'services/useAuth.js';
import StripeIntentForm from './StripeIntentForm.js';
import CheckoutForm from './CheckoutForm.js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51MQIToD1nNXXpxul4Pn8qRKhgDRmifUXY158h8S5fEBbs96E6EIyUhARzTDGQ5VdAkKJwhBOhjW4Fx65R7zsG22H00800QhNy6");

export default function StripeIntentModal({ onCancel, intentType='paymentIntent' }) {
  const isOpen = useAppStore(s=>s.stripeIntentModalIsOpen)
  const clientSecret = useAppStore(s=>s.stripeIntentModalClientSecret)
  const [message, setMessage] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onCloseReset = async ()=>{
    // const res = await authState().cancelSubscription(subscriptionId);
    appState().closeStripeIntentModal()
  }


  const options = {
    // passing the client secret obtained in step 3
    clientSecret,
    appearance:{
      theme: 'stripe',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseReset}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Payment Method</ModalHeader>
          <ModalCloseButton />


          <ModalBody>
            {clientSecret && (<>
              <Elements stripe={stripePromise} options={options}>
                <StripeIntentForm onCloseReset={onCloseReset}/>
              </Elements>
            </>)}
            {!clientSecret && (
              <Spinner/>
            )}
          </ModalBody>


{/*
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading || !stripe || !elements} w='100%' type="submit">
              {isLoading ? <Spinner/> : "Submit"}
            </Button>
          </ModalFooter>
*/}


        </ModalContent>
    </Modal>

  );
}
