import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {Box, Button, Center, Flex, Link, Image, SimpleGrid, Heading, Avatar, Spinner
} from "@chakra-ui/react";
import {SlSocialInstagram, SlSocialSpotify, SlSocialTwitter} from "react-icons/sl";
import {TfiEmail} from "react-icons/tfi";
import {CopyIcon, LinkIcon} from "@chakra-ui/icons";
import {CopyToClipboardButton} from "../../hooks/CTCBButton";
import CryptoIcon from "../../hooks/CryptoIcon/CryptoIcon";
import TbDesigner from "../TbDesigner";
import TbSettings from "../TbSettings";
import {abs0} from "../bits/cssHelpers";
import {authState, useAuth} from "../../services/useAuth";
import SocLinkIcon from "../../hooks/SocLinkIcon/SocLinkIcon";
import {templateDefs} from "../../data/templateDefs";
import {TbDotsVertical, TbGridDots, TbGripVertical} from "react-icons/tb";
import {MdOutlineImageSearch, MdOutlineMarkunreadMailbox} from "react-icons/md";
import {clientOrigin, desktopSidebarWidth} from "../../data/constants";
import {useMutationObservable} from "../../hooks/useMutationObservable";
import {SFConfirm} from "./SFConfirm";
import {SFConnect} from "./SFConnect";
import {SFComplete} from "./SFComplete";
import {SFHistory} from "./SFHistory";
import {SFHome} from "./SFHome";
import {SFGuide} from "./SFGuide";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {getBackgroundSx} from "../TemplatePicker/getBackgroundSx";
import {useWS} from "../../services/useWS";
import {SFBackButton} from "./SFBackButton";
import ActivityItemModal from "./ActivityItemModal/ActivityItemModal";

/*
* photo
* name
* greeting
* tablistTabs
* tablistTabSelected
*
* */

function scrollbarVisible(element) {
  return element.scrollHeight > element.clientHeight;
}

const StoreFront = ({liveMode=false}) => {
  // user = liveMode ? useLoaderData() : user;
  const { "*" : publicHandle } = useParams(); // Get the splat parameter
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const user = useAuth(s=>s.user)
  const tpl = useSF(s=>s.tpl)
  const wsStatusMsg = useWS(s=>s.wsStatusMsg)
  const sfView = useSF(s=>s.sfView); //SFConnect|SFHome|SFConfirm|SFComplete|SFGuide|SFHistory
  const scrollableRef = useRef(null);
  const [scrollVis, setScrollVis] = useState('0');
  const [gridCols, setGridCols] = useState(3);

  const onAppMainMutation = useCallback((mutationList) => {
    if(scrollbarVisible(scrollableRef.current)){setScrollVis('1');
    }else{setScrollVis('0');}}, [setScrollVis]);

  useEffect(()=>{
    if(!user.email){return}
    const tpl = (user.template === 'Custom')
        ? user.customTpl
        : templateDefs.find(v=>v.label===user.template)
    useSF.setState({tpl})
    setLoading(false)
  },[user])

  useEffect(() => {
    if(liveMode){
      authState()._getUserPublic(publicHandle).catch()
    }
  }, []);

  // if(scrollableRef && scrollableRef.current){
  //   useMutationObservable(scrollableRef.current, onAppMainMutation);
  // }
/*
  useEffect(() => {
    if (scrollableRef.current) {
      useMutationObservable(scrollableRef.current, onAppMainMutation);
    }
  }, [scrollableRef, onAppMainMutation]);
*/

  if(loading){ return (
      <Center w='100vw' h='100vh'>
        <Spinner />
      </Center>
    );
  }
  return (<>
    <Box ref={scrollableRef} userSelect='none' id='StoreFront'
      sx={{
        height: '100%', overflowY: "scroll", overflowX: "hidden", paddingTop:'30px',
        display: 'flex', flexDirection: 'column', flexBasis: '100vh', alignItems: 'center',
        //backgroundColor: `#000000`,//brand.bg
        backgroundColor: `rgba(17,22,35,${scrollVis})`,//brand.bg
        "&::-webkit-scrollbar": {width: "6px", backgroundColor: 'inherit',},
        "&::-webkit-scrollbar-track": {width: "2px", backgroundColor: 'inherit',},
        "&::-webkit-scrollbar-thumb": {background: "blue.700", borderRadius: "24px",},
        ...abs0(), ...getBackgroundSx(tpl.backgroundSpec),
      }}>
      <SFBackButton/>
      <VFlexCS gap={1} sx={{w: '360px', h: '100%', mt: '24px'}}>
        {wsStatusMsg && <Box fontSize={11}>{wsStatusMsg}</Box>}
        {user.image && <Avatar size='xl' src={user.image} onClick={()=> {
          useSF.setState({sfView: 'SFHome'})
        }}/>}
        <VFlexCS gap={1} sx={{...tpl.headlinesSpec.font, color: tpl.headlinesSpec.color}}>
          {user.name&&(<HFlexCC textAlign='center'>{user.name}</HFlexCC>)}
          {user.greeting&&(<HFlexCC textAlign='center'>{user.greeting}</HFlexCC>)}
        </VFlexCS>
        {sfView==='SFConnect' && (
          <SFConnect/>
        )}
        {sfView==='SFHome' && (
          <SFHome/>
        )}
        {sfView==='SFConfirm' && (
          <SFConfirm/>
        )}
        {sfView==='SFComplete' && (
          <SFComplete/>
        )}
        {sfView==='SFGuide' && (
          <SFGuide/>
        )}
        {sfView==='SFHistory' && (
          <SFHistory/>
        )}

        {/*<VFlexCC mt='auto' w='100%'>*/}
        {/*  <Link onClick={()=>setSfView('SFConnect')}>Connect</Link>*/}
        {/*  <Link onClick={()=>setSfView('SFHome')}>Home</Link>*/}
        {/*</VFlexCC>*/}
      </VFlexCS>
    </Box>
    <ActivityItemModal/>
  </>)
}

export default StoreFront
