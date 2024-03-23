/*eslint-disable*/
import React from "react";
import {Flex, Image, Link, List, ListItem, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {NavLink, useNavigate} from 'react-router-dom';
import {HFlex, HFlexCC, VFlexCS} from "../bits/UtilityTags";
import BrandLogo from "assets/title-logo.png";
import BrandLogoTitle from "assets/title-logo.png";
import DiscordPng from 'assets/SMIcons/Discord.png'
import FacebookPng from 'assets/SMIcons/Facebook.png'
import InstagramPng from 'assets/SMIcons/Instagram.png'
import RedditPng from 'assets/SMIcons/Reddit.png'
import TelegramPng from 'assets/SMIcons/Telegram.png'
import TwitterPng from 'assets/SMIcons/Twitter.png'
export default function AppFooter(props) {
  const nav = useNavigate()

  // const linkTeal = "red.200"=
  return (
    <VFlexCS id='AppFooter'
             justifyContent="space-between"
             backgroundColor='black'
             px="20px"
             // minHeight="280px"
             gap={5}
    >
      <Image mt={6} src={BrandLogo} h={['60px','60px','80px']} cursor='pointer' onClick={()=>{nav('/')}}/>
      <HFlexCC gap={5} flexWrap='wrap'>
        <HFlex gap={5}>
          <Link isExternal href='#' cursor='pointer'><Image h='60px' src={DiscordPng}/></Link>
          <Link isExternal href='#' cursor='pointer'><Image h='60px' src={FacebookPng}/></Link>
          <Link isExternal href='#' cursor='pointer'><Image h='60px' src={InstagramPng}/></Link>
        </HFlex>
        <HFlex gap={5}>
          <Link isExternal href='#' cursor='pointer'><Image h='60px' src={RedditPng}/></Link>
          <Link isExternal href='#' cursor='pointer'><Image h='60px' src={TelegramPng}/></Link>
          <Link isExternal href='#' cursor='pointer'><Image h='60px' src={TwitterPng}/></Link>
        </HFlex>
      </HFlexCC>
      <List display="flex" my={{ base: "10px", xl: "15px" }}>
          <ListItem me={{ base: "20px", md: "44px", }}>
            <Text color="gray.400">
              &copy; {1900 + new Date().getYear()},{" "}
              {/* <Link */}
              {/*   as={NavLink} */}
              {/*   color="bog.600" */}
              {/*   to="/" */}
              {/*   target="_parent" */}
              {/* > */}
              {"Ninjichop LLC"}
              {/* </Link> */}
            </Text>

          </ListItem>
          <ListItem me={{ base: "20px", md: "44px", }} textAlign='center'>
            <Link href="#top"
                  target="_parent"
                  color="gray.400">
              {"Back to Top"}
            </Link>
          </ListItem>
          {/*<ListItem me={{ base: "20px", md: "44px", }}>*/}
          {/*  <Link to="/support" as={NavLink}*/}
          {/*        color="gray.400"*/}
          {/*        target="_parent"*/}
          {/*  >*/}
          {/*    {"Support"}*/}
          {/*  </Link>*/}
          {/*</ListItem>*/}
        </List>

    </VFlexCS>
  );
}
