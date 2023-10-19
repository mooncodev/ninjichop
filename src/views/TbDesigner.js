import { Link } from "react-router-dom";
import {HFlex, VFlex} from './bits/UtilityTags.js';
import {useCallback, useEffect, useState} from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading, Popover, PopoverTrigger, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader, PopoverArrow,PopoverFooter,
  SimpleGrid,
  Switch, useBoolean
} from "@chakra-ui/react";
import AcctLinksDnD from "./LinksArranger/AcctLinksDnD";
import AcctLinksAdder from "./LinksArranger/AcctLinksAdder";
import TemplatePicker from "./TemplatePicker/TemplatePicker";
import {authState, useAuth} from "../services/useAuth";
import ColorPopover from "./bits/ColorPopover";
import PropSwitch from "./bits/PropSwitch";


export default function TbDesigner() {

  return (
    <VFlex>

        <VFlex gap={2}>
          <AcctLinksAdder/>
          <AcctLinksDnD/>
          <br/>
        </VFlex>

      <TemplatePicker/>
    </VFlex>
  )
}
