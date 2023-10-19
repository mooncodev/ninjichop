import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, S, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {
  Box, Button, Center, Flex, Link, Image, SimpleGrid, Heading, Avatar, Spinner, Text, Divider, Circle
} from "@chakra-ui/react";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {useAuth} from "../../services/useAuth";
import {wsSend, wsState} from "../../services/useWS";
import {fira} from "../../theme/foundations/fonts";

export const SFComplete = ({...rest}) => {
  const user = useAuth(s=>s.user)
  const tpl = useSF(s=>s.tpl)
  const {
    orderNumber,
    orderColor,
    purchasePrice,
    salesTax,
    salesFees,
    totalPrice,
    label,
    symbol,
    decimals,
    rcvrAddr,
    tokenAddr,
    watchType,
    amount,
    qrString,
    qrImage,
  } = useSF(s=>s.completeInfo)
  const { ws } = wsState();

  const [selectedCurrency, setSelectedCurrency] = useState('Ethereum');
  const [isConfirmEnabled, setConfirmEnabled] = useState(true);

  return (<>
    <Heading as='h1'>Complete</Heading>
    <Image boxSize='140px' src={qrImage}/>
    <Box>
      <Text>Order Number: {orderNumber}</Text>
      <Circle size='30px' bg={orderColor}></Circle>
      <Text>Purchase Price: {purchasePrice}</Text>
      <Text>Sales Tax: {salesTax}</Text>
      <Text>Sales Fees: {salesFees}</Text>
      <Text>Total Price: {totalPrice}</Text>
      <Text>Currency: {label}</Text>
      <Text>Symbol: {symbol}</Text>
      <Text>Decimals: {decimals}</Text>
      <Text>Receiving Address: {rcvrAddr}</Text>
      <Text>Token Address: {tokenAddr}</Text>
      <Text>Amount: {amount}</Text>
      <Text>QR String: <S sx={{...fira, color:'green', bgColor:'gray.50'}}>{qrString}</S></Text>
    </Box>

    <Button onClick={()=>{
      useSF.setState({confirmInfo: {}});
      useSF.setState({completeInfo: {}});
      wsSend({ type: 'getRecents' });
      setSfView('SFHome')}
    }>Finish</Button>
  </>);
}
