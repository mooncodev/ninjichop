import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, S, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {
  Box, Button, Center, Flex, Link, Image, SimpleGrid, Heading, Avatar, Spinner, Text, Badge, Divider
} from "@chakra-ui/react";
import CryptoIcon from "../../hooks/CryptoIcon/CryptoIcon";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {useAuth} from "../../services/useAuth";
import {wsSend, wsState} from "../../services/useWS";
import {sDiv, sMul} from "../../helpers/math/zmath.mjs";


export const SFConfirm = ({...rest}) => {
  const user = useAuth(s=>s.user)
  const tpl = useSF(s=>s.tpl)
  const { orderNumber, orderColor, purchasePrice, salesTax, salesFees, totalPrice } = useSF(s=>s.confirmInfo)
  const { ws } = wsState();

  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [submitIsDisabled, set_submitIsDisabled] = useState(true);
  const handleCurrencySelect = (label) => {
    setSelectedCurrency(label);
    set_submitIsDisabled(false);
  }
  const salesTaxPrice = useMemo(()=>parseFloat(sDiv(sMul(purchasePrice, salesTax),100)).toFixed(2),[salesTax]);
  const salesFeesPrice = useMemo(()=>parseFloat(sDiv(sMul(purchasePrice, salesFees),100)).toFixed(2),[salesFees]);

  const handleConfirmClick = () => {
    wsSend({type: 'confirm', label: selectedCurrency});
  }

  const ValPair = ({leftVal, rightVal}) => (
    <HFlex gap={4} justify='space-between'><Box>{leftVal}</Box><Box>{rightVal}</Box></HFlex>
  )
  return (<>
    <Heading as='h1'>Confirm</Heading>
    <VFlex sx={{bgColor:'rgba(255,255,255,0.5)',p:4,borderRadius:'9px'}}>
      <Badge bgColor={orderColor} mb={1}>Order Number: {orderNumber}</Badge>
      <ValPair leftVal='Purchase Price:' rightVal={purchasePrice} />
      <ValPair leftVal={`Sales Tax (${salesTax}%):`} rightVal={salesTaxPrice} />
      <ValPair leftVal={`Sales Fees (${salesFees}%):`} rightVal={salesFeesPrice} />
      <Divider borderColor='gray'/>
      <ValPair leftVal={<S fontWeight='700'>Total Price</S>} rightVal={totalPrice} />
    </VFlex>
    {user.acctLinks.map((v, i, a) => v.show && (
      <SimpleGrid templateColumns='10% 80% 10%' key={i + v.label}
                  sx={{h: '44px', w:'100%', p: '3px', ...tpl.acctCardSpec,
                    outline: selectedCurrency === v.label ? '2px solid black' : '2px solid transparent',
                    cursor: selectedCurrency === v.label ? 'unset' : 'pointer',
                    bgColor: tpl.acctCardSpec.bgColor
                  }} my={2}
                  onClick={() => handleCurrencySelect(v.label)}
      >
        <Center align='center'>
          <CryptoIcon name={v.symbol} size={24}/>
        </Center>
        <VFlex>
          <Box fontWeight='bold'>{v.label}</Box>
          <Box fontSize='9px' fontFamily='fira, monospace'>{v.symbol}</Box>
        </VFlex>
      </SimpleGrid>
    ))}
    <Button isDisabled={submitIsDisabled} onClick={handleConfirmClick}>Confirm</Button>
  </>);

}

