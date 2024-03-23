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
  UnorderedList,ListItem
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
      <Flex w='100%' h='150px' bgGradient='linear(90deg,  gray.950, gray.750)' shadow='0px 0px 25px 25px black' zIndex='1'/>

      <VFlexCC w='100%' id='top' bgGradient='linear(0deg,  gray.950, gray.550)' color={'white'}>
        <HStack w={limitWidth} mt={'100px'} justify={'center'}>

          <VFlex w={['100%','100%','45%']} textAlign='center' gap={8} align='center'>
            <Heading size='lg'>NINJICHOP<br/>LLC</Heading>
            <Text>
              <strong>Ninjichop LLC</strong> is a full-stack, full-service applications development company based out of Whitesburg, Kentucky.
            </Text>
            <Text>
              This page is a placeholder for a formal site for the company, and is not (yet) meant to represent my capabilities as a developer!
              I am busy working on projects for clients, but perhaps soon I will build this page up some more.
            </Text>
            <Text>
              Generally speaking, a "JS Everywhere" methodology is applied to all projects.
              This approach lends greatly to simplicity, modularity, performance, and many more advantages.
            </Text>
          </VFlex>
        </HStack>

        <HStack w={limitWidth} my={2} justify={'center'}>
          <VFlex>
            <UnorderedList>
              <ListItem>React</ListItem>
              <ListItem>Chakra UI</ListItem>
              <ListItem>React Native (ios, android, web)</ListItem>
              <ListItem>Expo</ListItem>
              <ListItem>Express</ListItem>
              <ListItem>Mongoose</ListItem>
              <ListItem>Brand Asset Procurement</ListItem>
              <ListItem>Architectural Design</ListItem>
            </UnorderedList>
            <HFlex flexWrap='wrap' justify='center' gap='15px'>
              {/*<Button as={Link} variant='feature' isExternal*/}
              {/*  href='downloads/CoinStarz Pitchdeck 1.83.docx.pdf'>*/}
              {/*  Pitchdeck*/}
              {/*</Button>*/}
              <Button as={Link} variant='feature' mt={5} href='#'>
                Fancy Button
              </Button>
            </HFlex>
            {/*<Button as={Link} variant='solidPink' isExternal href='#'>*/}
            {/*  Buy CoinStarz Tokens*/}
            {/*</Button>*/}
          </VFlex>
        </HStack>

      </VFlexCC>


      <AppFooter />


    </>

  );
}
