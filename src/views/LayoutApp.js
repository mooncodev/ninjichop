import {Box, ChakraProvider, Flex, Grid, Image, Portal, Stack, useDisclosure, useStyleConfig} from '@chakra-ui/react';
// import Configurator from "views/app/Configurator.js";
import AppFooter from "views/navs/AppFooter.js";
// Layout components
import AppNav from "views/navs/AppNav.js";
import AppSidebar from "views/navs/AppSidebar.js";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {NavLink, Outlet, useLocation, useRouteMatch} from 'react-router-dom';
// Custom Chakra theme
// import theme from "theme/theme.js";
// Custom components
// import { appNavDrawerOpenAtom, signatureAtom, w3rLibraryAtom } from './services/atoms.js';
import { useDeviceMode } from '../theme/foundations/breakpoints.js';
import { desktopSidebarWidth } from 'data/constants.js';
import { useMutationObservable } from '../hooks/useMutationObservable.js';
import BrandLogoSvg from "../assets/logos/brand-logo.svg";
import {SBNavLink} from "./navs/SBNavLink";
import {HFlexSC,VFlex} from "./bits/UtilityTags";
import {useScroll} from "framer-motion";
import {appState, useAppStore} from "../services/useAppStore";

function scrollbarVisible(element) {
  return element.scrollHeight > element.clientHeight;
}
export default function LayoutApp(props) {
  const { variant, children, ...rest } = props;

  const appMainRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    container: appMainRef
  })
  // const isAppMainScrolled = useAppStore(s=>s.isAppMainScrolled)

  function onScrollChange(value){
    if(value>5 && !appState().isAppMainScrolled){
      appState().set_isAppMainScrolled(true)
    }
    else if(value<=5 && appState().isAppMainScrolled){
      appState().set_isAppMainScrolled(false)
    }
  }
  useEffect(() => {
    scrollY.on('change', onScrollChange);
  }, []);
  // useEffect(()=>{
  //   if(scrollYProgress.current>2 && !isAppMainScrolled){
  //     useAppStore.setState({isAppMainScrolled:true})
  //   }else if(scrollYProgress.current<=2 && isAppMainScrolled){
  //     useAppStore.setState({isAppMainScrolled:false})
  //   }
  // },[scrollYProgress.current])
  // const [scrollVis, setScrollVis] = useState('0');
  // const onAppMainMutation = useCallback((mutationList) => {
  //   if(scrollbarVisible(appMainRef.current)){setScrollVis('1');
  //   }else{setScrollVis('0');}}, [setScrollVis]);
  // useMutationObservable(appMainRef.current, onAppMainMutation);

  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  const [isMobile, isDesktop] = useDeviceMode()
  const limitWidth = {
    base:'99%',
    md:'99%',
    lg:'660px',
  }

  // const route = useRoutes()
  return (
    <>
      <AppSidebar/>

      <Box id='AppMain' ref={appMainRef}
           sx={{
             height: '100%',
             overflowY: "scroll",
             overflowX: "hidden",
             // marginLeft:isDesktop?desktopSidebarWidth:'0',
             paddingRight:isDesktop?'7px':'1px',
             paddingTop:'70px',
             display: 'flex',
             flexDirection: 'column',
             flexBasis: '100vh',
             backgroundColor: `#F9F9FA`,//brand.bg
             // backgroundColor: `rgba(17,22,35,${scrollVis})`,//brand.bg
             justifyContent: 'start',
             alignItems: 'center',
             "&::-webkit-scrollbar": {
               width: "6px",
               backgroundColor: 'inherit',
               zIndex:'9999',
             },
             "&::-webkit-scrollbar-track": {
               width: "2px",
               backgroundColor: 'inherit',
               zIndex:'9999',
             },
             "&::-webkit-scrollbar-thumb": {
               background: "brand.a",
               zIndex:'9999',
               // borderRadius: "24px",
             },
           }}>
        <VFlex sx={{
          w: limitWidth,
          justifyContent: 'center',
        }}>
          <Outlet/>

        </VFlex>
      </Box>
    </>
  );
}
