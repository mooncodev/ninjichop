import React, {useEffect, useState} from "react";
import {HFlexSC, HFlexCC, TextXs, VFlex, VFlexCC, VFlexCS} from 'views/bits/UtilityTags.js';
import {Box, Button, Center, Icon, Image, Input, Radio, RadioGroup, SimpleGrid, Switch} from "@chakra-ui/react";
import {useAuth} from "services/useAuth";
import {templateDefs} from "../TemplatePicker/TemplatePicker";
import {ChevronLeftIcon, ChevronRightIcon, CloseIcon} from "@chakra-ui/icons";
import {SlSocialInstagram, SlSocialSpotify, SlSocialTwitter} from "react-icons/sl";
import {TfiEmail} from "react-icons/tfi";
import CurrencyIcon from "../LinksArranger/CurrencyIcon";
import StoreFront from "../StoreFront/StoreFront";
import {MdOutlinePhoneAndroid} from "react-icons/md";

const sxPreviewToggleBtn = {
  w: '40px',
  h: '40px',
  position: 'fixed',
  top: '150px',
  right: '-1px',
  bgColor: 'gray.300',
  borderRadius: '8px 0 0 8px',
  overflow: 'hidden',
  zIndex:'0',
  border:'1px solid gray'
}
const sxPreviewWrapper = {
  w: '180px',
  h: '320px',
  position: 'fixed',
  right: '8px',
  top: '200px',
  borderRadius: '10px',
  overflowY: 'scroll',
  border: '7px solid black',
  "&::-webkit-scrollbar": {width: "0",},
  boxSizing: 'content-box',
  zIndex:'900',
}
const sxScaler = {
  transform: `scale(50%)`,
  position: 'absolute', top: '-50%', right: '-50%', bottom: '-50%', left: '-50%',
  // zoom:0.5,
}
const Scaler = ({pct, children})=>(<Box sx={sxScaler}>{children}</Box>)
export default function LivePreview() {
  // const user = useAuth(s=>s.user)
  const [showPreview, setShowPreview] = useState(false);
  // const tpl = templateDefs.find(v=>v.label===user.template)
  return (<>
    <Button sx={sxPreviewToggleBtn}
            onClick={()=>setShowPreview(!showPreview)}>
      {showPreview ? <CloseIcon/> : <Icon as={MdOutlinePhoneAndroid} boxSize='24px'/>}
    </Button>

    {showPreview && (
      <VFlexCS sx={sxPreviewWrapper} id='preview-wrapper'>
        <Scaler pct={50}>
          <StoreFront liveMode={false}/>
        </Scaler>
      </VFlexCS>
    )}
  </>)
}
