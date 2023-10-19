import {
  Box,
  Button, Card, CardBody, CardFooter, CardHeader,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Portal, SimpleGrid,
  Stack,
  Text,
  useTheme, chakra, Divider, Spacer, Link,
} from '@chakra-ui/react';
import React from 'react';
import {AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import AppNav from './navs/AppNav.js';
import {HFlex, VFlex, VFlexCC} from './bits/UtilityTags.js';
import HoCSZPng from "assets/HoCSZ.png";
import HoIGPng from "assets/HoIG.png";
// import FedCSZPng from "assets/FedCSZ.png";
// import CreatorsPng from "assets/Creators.png";
import AppFooter from './navs/AppFooter.js';
import {motion, AnimatePresence} from "framer-motion";
import {useAppStore} from "../services/useAppStore";

export default function PgLanding() {
  const nav = useNavigate()
  const theme = useTheme()
  const limitWidth = {
    base:'98%',
    md:'95%',
    lg:'860px',
  }
  const Spacer = ()=>(<Box sx={{
    bgGradient:'linear(90deg,  blue.900, black)',
    shadow:'0px 0px 11px 11px black',
    h:'20px',w:'100%', zIndex:'1',
  }} />);
  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">


      <>
        <Flex w='100%' h='90px' bgGradient='linear(90deg,  gray.950, gray.750)' shadow='0px 0px 14px 14px black' zIndex='1'/>

        <VFlexCC w='100%' id='top' bgGradient='linear(0deg,  gray.950, gray.750)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w={['100%','100%','45%']} textAlign='center' gap={8} align='center'>
              <Heading size='lg'>GET PAID<br/>WITH CRYPTO NOW</Heading>
              <Text>
                <strong>Kranz Merchant</strong> enables your customers to pay with the crypto that you want to accept.
              </Text>
              <Text>
                It has robust tracking and record keeping for your books, too!
              </Text>
              <HFlex flexWrap='wrap' justify='center' gap='15px'>
                {/*<Button as={Link} variant='feature' isExternal*/}
                {/*  href='downloads/CoinStarz Pitchdeck 1.83.docx.pdf'>*/}
                {/*  Pitchdeck*/}
                {/*</Button>*/}
                <Button as={Link} variant='feature' isExternal href='#'>
                  Join Our Telegram
                </Button>
              </HFlex>
              {/*<Button as={Link} variant='solidPink' isExternal href='#'>*/}
              {/*  Buy CoinStarz Tokens*/}
              {/*</Button>*/}
            </VFlex>
{/*
            <Flex w='55%' alignItems='center' display={['none','none','flex']}>
              <AnimatePresence>
                <motion.img
                  style={{zIndex: '1', height: '400px', position:'absolute'}}
                  key={HoIGPng} src={HoIGPng}
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{ease: "easeOut", duration: 2.3,}}
                />
                <motion.img
                  style={{zIndex: '1', height: '400px', position:'absolute'}}
                  key={HoCSZPng} src={HoCSZPng}
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 160, opacity: 1}}
                  transition={{ease: "easeInOut", duration: 2, delay:1.2}}
                />
              </AnimatePresence>
            </Flex>
*/}

          </HStack>
        </VFlexCC>

{/*
        <Spacer/>

        <VFlexCC id='section-what-is-coinstarz' w='100%' bgGradient='linear(#F2587A, black)' color={'white'}>
          <HStack w={limitWidth} my={10} justify={'center'} flexWrap={'wrap-reverse'}>

            <VFlex w={['100%','100%','49%',]} textAlign='center' gap={8} align='center'>
              <chakra.em size='lg'>How does it work?</chakra.em>
              <Heading size='lg'>Kranz Merchant Platform</Heading>
              <Text>
                CoinStarz makes Crypto and NFTs easier to use.
              </Text>
              <Text>
                We provide a platform to help you put all of your
                crypto addresses in one place: making it easier
                for you to accept many various Cryptos or trade NFTs.
              </Text>
              <Text>
                Everyone can be a star and start accepting crypto today!
              </Text>
              <Button variant='solidPink' onClick={()=>{
                useAppStore.getState().set_authModalIsOpen(true, 'signup').catch()
              }}>Sign Up</Button>
            </VFlex>
            <Flex justify='center' w={['100%','100%','50%',]}>
              <Image sx={{zIndex:'1', h:'400px'}} src={FedCSZPng}/>
            </Flex>

          </HStack>
        </VFlexCC>

        <Spacer/>

        <VFlexCC w='100%' bgGradient='linear(210deg,#160b32 20%, #D058D0)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w='50%' textAlign='center' gap={8} align='center'>
              <chakra.em size='lg'>Coming Soon!</chakra.em>
              <Heading size='lg'>CoinStarz Token</Heading>
              <Text>
                Receive your crypto directly, with no middleman,
                banking app, or website that gets a cut of your
                hard-earned pay.
              </Text>
              <Text>
                You will only need ONE click to our platform to display
                all the cryptocurrencies that you accept, with all of
                their corresponding addresses, ready to go.
              </Text>
              <Button variant='solidPink' onClick={()=>{
                // useAppStore.getState().set_authModalIsOpen(true, 'signup')
              }}>Token Info</Button>
            </VFlex>
            <Flex justify='center' w='50%' display={['none','none','flex']}>
              <Image sx={{zIndex:'1', h:'400px'}} src={CreatorsPng}/>
            </Flex>

          </HStack>
        </VFlexCC>

        <Spacer/>

        <VFlexCC w='100%' bgGradient='linear(90deg, #F2587A, #160b32)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w='50%' textAlign='center' gap={8} align='center'>
              <Heading size='lg'>Ready to start accepting crypto?</Heading>
              <Text>
                Crypto as a payment method is inevitable.
                You want to be on the leading-edge of this
                highly innovative frontier.
              </Text>
              <Button variant='solidPink' onClick={()=>{
                useAppStore.getState().set_authModalIsOpen(true, 'signup')
              }}>Token Info</Button>
            </VFlex>
          </HStack>
        </VFlexCC>
*/}

        <Spacer/>

        <AppFooter />


      </>

  );
}
