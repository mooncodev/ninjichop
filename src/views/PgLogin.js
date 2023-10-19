import {
  Flex,
  useTheme,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VFlexCC } from './bits/UtilityTags.js';
import AppFooter from './navs/AppFooter.js';
import Login from "./auth/Login";

export default function PgLogin() {
  const nav = useNavigate()
  const theme = useTheme()
  const limitWidth = {
    base:'98%',
    md:'668px',
    lg:'860px',
  }
  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">


      <>
        <Flex w='100%' h='90px' bgGradient='linear(90deg,  #271457, #3c2283)' shadow='0px 0px 14px 14px black' zIndex='1'/>
        <VFlexCC w='100%' id='top' bgGradient='linear(170deg,#4d2ea2, black 60%)'
                 bgColor='black' minHeight='700px' pt={10}>

          <Login/>
        </VFlexCC>



        <AppFooter />


      </>

  );
}
