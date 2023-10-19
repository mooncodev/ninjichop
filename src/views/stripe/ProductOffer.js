import React, { useState, useEffect, useMemo } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm.js";
import { ExtLinkBtn, TestDetails, VFlex, VFlexCC, VFlexSC } from '../bits/UtilityTags.js';
import { Box, Button, Link, SimpleGrid, Skeleton, Spinner, Text } from '@chakra-ui/react';
import { authState, useAuth } from 'services/useAuth.js';
import { fira, mont, rale } from 'theme/foundations/fonts.js';
import { sxMetalLinear } from 'theme/foundations/stylesBrushedMetal.js';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {planState} from "services/usePlan";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MQIToD1nNXXpxul4Pn8qRKhgDRmifUXY158h8S5fEBbs96E6EIyUhARzTDGQ5VdAkKJwhBOhjW4Fx65R7zsG22H00800QhNy6");

export default function ProductOffer({activeSubsProduct}) {
  const [clientSecret, setClientSecret] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [clickedProduct, setClickedProduct] = useState("none");
  const isLoaded = useAuth(s=>s.lnpUserSubscriptionsLoaded);

  const btns = {
    'none':{
      btnTextStandard:'Purchase Standard',
      btnTextPremium:'Purchase Premium',
    },
    'standard':{
      btnTextStandard:'Currently Active!',
      btnTextPremium:'Switch to Premium',
    },
    'premium':{
      btnTextStandard:'Switch to Standard',
      btnTextPremium:'Currently Active!',
    },
    'loading':{
      btnTextStandard:'',
      btnTextPremium:'',
    },
  }[activeSubsProduct];

  useEffect(() => {

  }, [activeSubsProduct]);

  const options = {
    // passing the client secret obtained in step 3
    clientSecret,
    appearance:{
      theme: 'stripe',
    },
  };
//https://stripe.com/docs/testing <-- list of test credit cards
  const subscribe = async (product)=>{
    if(product === activeSubsProduct){return}
    setClickedProduct(product);
    let res;
    if(['standard','premium'].indexOf(activeSubsProduct)>-1){
      res = await planState().changeSubscription(product);
    }else{
      res = await planState().createSubscription(product);
    }
    setSubscriptionId(res.sub_id)
    setClientSecret(res.clientSecret)
  }
  const cancelIntent = async ()=>{
    const res = await planState().cancelSubscription(subscriptionId);
    setClickedProduct('');
    setClientSecret('');
    setSubscriptionId('');
  }

  const sxCardBase={
    ...sxMetalLinear,
    height:'340px',
    width:'240px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    align:'center',
    ...rale.md.md,
    p:'1rem',
    border:'4px solid',
    borderColor:'gray.300',
    borderRadius:'1rem',
    bgColor:'gray.50',

  }
  const sxCardBaseClickable={
    ...sxCardBase,
    border:'2px solid',
    cursor:'pointer',
    boxShadow:'0 0 3px 3px lightgray inset',
    _hover:{
      bgColor:'#FFFFFF',
    },
    _active:{
      bgColor:'gray.100',
      boxShadow:'0 0 5px 5px lightgray inset',
    },
  }
  const sxCardHeading = {
    ...mont.md.lg,
    alignSelf:'center',
  }
  const sxCardPrice = {
    ...mont.md.lg,
    alignSelf:'center',
    mt:'auto',
  }
  const sxCardCTA = {
    ...mont.bd.lg,
    alignSelf:'center',
  }
  function ProductCard({children, heading, price, btnText, onClick, product}){
    return (
      <Box sx={activeSubsProduct===product?sxCardBase:sxCardBaseClickable}
           onClick={onClick}>
          <Box sx={sxCardHeading}>{heading}</Box>
          <Box sx={{...fira}}>{children}</Box>
          <Box sx={sxCardPrice}>{price}</Box>
          <Box sx={sxCardCTA}>{btnText}</Box>
      </Box>
    )
  }
  return (
    <VFlexCC mt={3} align={{ base:'center',md:'start' }}>
      {clientSecret && (<>
        <TestDetails/>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm product={clickedProduct} clientSecret={clientSecret}
                        onCancel={cancelIntent}/>
        </Elements>
      </>)}
      {!clientSecret && !isLoaded && (
        <Spinner/>
      )}
      {!clientSecret && isLoaded && (

        <SimpleGrid columns={[1,1,2]} spacing={3}>
          <ProductCard
            product='standard' heading='Standard' price='$29.99'
            btnText={btns.btnTextStandard} onClick={()=>subscribe('standard')}
          >
            token_address<br/>
            pair_address<br/>
            name<br/>
            total_liquidity<br/>
            is_contract_verified<br/>
            total_supply<br/>
            contract_length<br/>
          </ProductCard>
          <ProductCard
            product='premium' heading='Premium' price='$39.99'
            btnText={btns.btnTextPremium} onClick={()=>subscribe('premium')}
          >
            <Text sx={{...rale.md.md}}>Basic, plus:</Text>
            our_liquidity_check<br/>
            our_verification_check<br/>
            our_contract_check<br/>
            our_honeypot_check<br/>
            our_holder_check<br/>
            +<br/>
            buy_tax<br/>
            sell_tax<br/>
          </ProductCard>
        </SimpleGrid>
      )}
    </VFlexCC>
  );
}
