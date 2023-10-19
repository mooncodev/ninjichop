
import {
  Center,
  Flex,
} from '@chakra-ui/react';

import PropTypes from "prop-types";
import React from "react";
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';
import { BtnBrandIcon } from '../bits/UtilityTags.js';
import { useAppStore } from '../../services/useAppStore.js';
import { HamburgerIcon } from '@chakra-ui/icons';

import { NavLink } from 'react-router-dom';

export default function AppNavControls(props) {
  const [isMobile, isDesktop] = useDeviceMode()
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  return (
    <Flex id='FCB-AppNavbarLinks'
      pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }}
      alignItems="center" flexDirection="row" gap={isMobile?'1.2rem':'.8rem'}
    >

      {isMobile && (
        <Center id="AppMenuIcon"
                onClick={() => useAppStore.getState().set_appNavDrawerOpen(!useAppStore.getState().appNavDrawerOpen)}
                cursor='pointer'
                __css={{
                  color: 'global.bg',
                  bgColor: 'brand.blue1',
                  h: '2rem',
                  w: '2rem',
                  borderRadius: '7px',
                  _hover:{ bgColor: 'brand.blue2', },
                }}>
          <HamburgerIcon boxSize={5}/>
        </Center>
      )}

    </Flex>
  );
}

