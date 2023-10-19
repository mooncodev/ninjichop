import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button, Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex, Icon, Image,
  Stack,
} from '@chakra-ui/react';
import IconBox from "components/Icons/IconBox.js";
import { AppSidebarHelp } from "components/Sidebar/AppSidebarHelp.js";
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import BrandLogoSvg from 'assets/logos/brand-logo.svg';
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';
import { desktopSidebarWidth } from 'data/constants.js';
import { SBNavLink } from './SBNavLink.js';
import { useAppStore } from '../../services/useAppStore.js';
import {HFlexSC} from "../bits/UtilityTags";

export function AppSidebar(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  // verifies if routeName is the one active (in browser input)

  //  Chakra Color Mode
  const mainText = "gray.200"

  const SBCloseButton = ()=>{return(
    <DrawerCloseButton as={Button}
      color={mainText}
      _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }}
    />);
  }

  // SIDEBAR
  const [isMobile, isDesktop] = useDeviceMode()
  const appNavDrawerOpen = useAppStore(state => state.appNavDrawerOpen)

  useEffect(()=>{
    //close drawer on ALL deviceMode changes
    console.log('deviceMode changed');
    useAppStore.getState().set_appNavDrawerOpen(false)
  },[isDesktop])

  const btnRef = React.useRef();
  // Color variables
  return (
    isMobile && (
        <Drawer isOpen={isDesktop?false:appNavDrawerOpen}
                onClose={() => useAppStore.getState().set_appNavDrawerOpen(false)}
                finalFocusRef={btnRef} placement="right">
          <DrawerOverlay backdropFilter="saturate(200%) blur(3px)"/>
          <DrawerContent style={{background:'transparent',borderRadius:'9px',
            top:'7px', right:'7px', bottom:'auto', width:'11rem',
          }}>
            <DrawerBody px="1rem">
              <SBCloseButton/>
              <Box pt={8} textAlign='center'>
                <Stack my={5} direction="column" alignItems="center">
                  <SBNavLink to='./dash'>Dashboard</SBNavLink>
                  <SBNavLink to='./subscriptions'>Subscriptions</SBNavLink>
                  <SBNavLink to='./wallet-history'>Wallet History</SBNavLink>
                  <SBNavLink to='./settings'>User Settings</SBNavLink>
                </Stack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )
  );
}

// PROPS

AppSidebar.propTypes = {};
export default AppSidebar;

