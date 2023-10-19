import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box, Button, Drawer, DrawerBody, DrawerCloseButton,
  DrawerContent, DrawerHeader, DrawerOverlay,
  Flex, Icon, Link, Stack, StackDivider, Text, VStack,
} from '@chakra-ui/react';
import IconBox from "components/Icons/IconBox";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RocketIcon } from '../Icons/Icons';


const AppSidebarContent = ({ onClick }) => (
  <VStack
    divider={<StackDivider borderColor="gray.900" />}
    spacing={4}
    align="stretch"
  >
    <Link onClick={onClick}>Home</Link>
    <Link onClick={onClick}>Item 2</Link>
    <Link onClick={onClick}>Item 3</Link>
    <Link onClick={onClick}>Item 4</Link>
    <Link onClick={onClick}>Item 5</Link>
    <Link href="https://chakra-ui.com" isExternal>
      Sign out <ExternalLinkIcon mx="2px" />
    </Link>
  </VStack>
);

const AppSidebar = ({ isOpen, variant, onClose }) => {
  if(variant ==='sidebar'){
    return (
      <Box position="fixed" left={0} p={5} w="200px" top={0} h="100%" bg="#dfdfdf">
        <AppSidebarContent onClick={onClose} />
      </Box>
    )
  }else if(variant ==='drawer'){
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <AppSidebarContent onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
};

export default AppSidebar;
