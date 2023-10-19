import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, S, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Image,
  SimpleGrid,
  Heading,
  Avatar,
  Spinner,
  Input,
  Text,
  Circle,
  Stat,
  StatLabel,
  StatNumber, StatHelpText, Badge, Collapse, HStack, Tag, TagLabel, TagRightIcon
} from "@chakra-ui/react";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {useWS, wsSend, wsState} from "../../services/useWS";
import {fira, rale} from "../../theme/foundations/fonts";
import {MdOpenInFull} from "react-icons/md";

const RecentItem = ({ item }) => {
  const tpl = useSF(s=>s.tpl)
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <Box
      sx={{border: '1px solid #BBBBBB',borderRadius: 6, w:260, m: 2, p: 2,
        ...rale, fontSize: 11, bgColor: tpl.acctCardSpec.bgColor
      }}
      onClick={handleToggle}
      cursor="pointer"
    >
      <Stat w={'100%'}>
        <HFlexSC w={'100%'} justify="space-between">
          <Flex as={Badge} bgColor={item.orderColor} w={'100%'} justify="space-between">
            <S>#{item.orderNumber}</S>
            <S>{item.status}</S>
          </Flex>
        </HFlexSC>
        <StatNumber>${item.totalPrice}</StatNumber>
        <StatHelpText>{item.label}</StatHelpText>
        <Collapse startingHeight={0} in={show}>
          <StatHelpText>{item.amount}</StatHelpText>
          <Tag as={Button} size='xl' bgColor={item.orderColor} p={2} textAlign='center' onClick={()=>{
            useSF.getState().set_activityItemModalIsOpen(true, {orderNumber:item.orderNumber})
          }}>
            <TagLabel>Open Order Detail</TagLabel>
            <TagRightIcon as={MdOpenInFull}/>
          </Tag>
        </Collapse>
      </Stat>
    </Box>
  );
};

export const SFHome = ({...rest}) => {
  const [purchasePrice, setPurchasePrice] = useState(9.99);
  const ws = useWS(s => s.ws);
  const recents = useSF(s => s.recents);
  const tpl = useSF(s=>s.tpl)

  useEffect(() => {
    wsSend({ type: 'getMasterLog' });
    const recentsInterval = setInterval(()=>{
      //response handled in useWS.js sets recents
      wsSend({ type: 'getRecents' });
    }, 3000);
    // cleared on unmount to avoid mem leaks
    return () => clearInterval(recentsInterval);
  }, []);

  return (
    <>
      <Heading as='h1'>Home</Heading>
      <HFlex>
        Purchase Price:
        <Input
          colorScheme='telegram'
          bgColor='white'
          type='number'
          min='0'
          placeholder='24.95'
          value={purchasePrice}
          onChange={e => setPurchasePrice(e.target.value)}
        />
      </HFlex>
      <Button w={100} variant='outline' onClick={()=>{
        wsSend({ type: 'create', purchasePrice });
      }}>Let's Go!</Button>
      {/*<Button onClick={() => wsState().wsClose()}>Disconnect</Button>*/}
      <Box mt={5}>
        <HFlex>
          <Box>Recent Activity</Box>
          <Button size='xs' ml={3} onClick={() => setSfView('SFHistory')}>History</Button>
        </HFlex>

        {recents && recents.map((item, i) => <RecentItem key={i} item={item} />)}
      </Box>
    </>
  );
}
