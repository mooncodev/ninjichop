import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {Box, Button, Center, Flex, Link, Image, SimpleGrid, Heading, Avatar, Spinner
} from "@chakra-ui/react";
import {useSF, sfState, setSfView} from "../../services/useSF";

export const SFGuide = ({...rest}) => {
  return (<>
    <Heading as='h1'>SFGuide</Heading>
  </>);
}
