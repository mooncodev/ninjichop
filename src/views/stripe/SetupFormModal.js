import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { Spinner, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,ModalCloseButton,
} from '@chakra-ui/react';
import { ExtLinkBtn, HFlexSC, S } from '../bits/UtilityTags.js';
import { useAppStore } from 'services/useAppStore.js';
import SetupForm from './SetupForm.js';
import CheckoutForm from './CheckoutForm.js';
import { loadStripe } from '@stripe/stripe-js';
import {usePlan, planState} from "services/usePlan";
const stripePromise = loadStripe("pk_test_51MQIToD1nNXXpxul4Pn8qRKhgDRmifUXY158h8S5fEBbs96E6EIyUhARzTDGQ5VdAkKJwhBOhjW4Fx65R7zsG22H00800QhNy6");

export default function SetupFormModal({ onCancel }) {
  const isOpen = useAppStore(s=>s.setupIntentModalIsOpen)
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onClose = ()=>{
    useAppStore.getState().set_setupIntentModalIsOpen(false)
  }
  const cancelIntent = async ()=>{
    // const res = await authState().cancelSubscription(subscriptionId);
    setClientSecret('');
  }

  function getSetupIntent(){
    planState().createSetupIntent()
  }
  //on modal open, fetch client secret at /api/stripe-create-setup-intent
  //on successful receipt of client secret, show form
  useEffect(()=>{
    if(!clientSecret && isOpen){
      planState().createSetupIntent().then((res)=>{
        setClientSecret(res.clientSecret)
      }).catch((err)=>{
        setMessage('Could not communicate with server, please try again, or try later.')
      })
    }
  },[isOpen])

  const options = {
    // passing the client secret obtained in step 3
    clientSecret,
    appearance:{
      theme: 'stripe',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Payment Method</ModalHeader>
          <ModalCloseButton />


          <ModalBody>
            {clientSecret && (<>
              <Elements stripe={stripePromise} options={options}>
                <SetupForm clientSecret={clientSecret}
                           onCancel={cancelIntent}/>
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
