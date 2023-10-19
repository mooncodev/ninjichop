import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, S, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Image,
  SimpleGrid,
  Heading,
  Avatar,
  Spinner,
  Input,
  Text,
  Circle,
  Stat,
  StatLabel,
  StatNumber, StatHelpText, Badge, Collapse, HStack, Portal
} from "@chakra-ui/react";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {awaitRecents, useWS, wsSend, wsState} from "../../services/useWS";
import {fira, rale} from "../../theme/foundations/fonts";
import {abs} from "../bits/cssHelpers";
import {CheckIcon} from "@chakra-ui/icons";
import {AnimatePresence, motion} from "framer-motion";

export const SFBackButton = ({...rest}) => {
  const ws = useWS(s => s.ws);
  const tpl = useSF(s=>s.tpl)
  const sfView = useSF(s=>s.sfView); //SFConnect|SFHome|SFConfirm|SFComplete|SFGuide|SFHistory
  const [buttonText, setButtonText] = useState('Disconnect');
  const [confirmText, setConfirmText] = useState('Are you sure?');
  const [showConfirmPrompt,set_showConfirmPrompt] = useState(false)
  const handleBack = async ()=>{
    if(sfView === 'SFHome'){
      setConfirmText('Really Disconnect?')
      set_showConfirmPrompt(true)
    }
    if(sfView === 'SFConfirm'){
      await wsSend({ type: 'cancel', orderNumber: sfState().confirmInfo.orderNumber });
      setSfView('SFHome');
    }
    if(sfView === 'SFComplete'){
      setConfirmText(<Box>Are you sure you want to cancel this order?  This will remove the order from the tracking feature.  Only do this if the customer will <strong>not</strong> use the QR Image to perform a transaction.</Box>)
      set_showConfirmPrompt(true)
    }
    if(sfView === 'SFHistory'){
      setSfView('SFHome');
    }
  }
  const handleConfirmYes = async ()=>{
    if(sfView === 'SFHome'){
      wsState().wsClose();
      set_showConfirmPrompt(false)
    }
    if(sfView === 'SFComplete'){
      await wsSend({ type: 'cancel', orderNumber: sfState().completeInfo.orderNumber });
      setSfView('SFHome');
      set_showConfirmPrompt(false)
    }
  }
  const handleConfirmNo = ()=>{
    set_showConfirmPrompt(false)
  }

  useEffect(() => {
    if(sfView === 'SFHome'){setButtonText('Disconnect')}
    if(sfView === 'SFConfirm'){setButtonText('Cancel')}
    if(sfView === 'SFComplete'){setButtonText('Cancel')}
    if(sfView === 'SFHistory'){setButtonText('Back')}
    if(sfView === 'SFGuide'){setButtonText('Cancel')}
  }, [sfView]);

  if(sfView==='SFConnect') {return null;}
  return (
    <Portal>
        {!showConfirmPrompt && (
          <Button size='sm' sx={{...abs(10,null,null,10)}} onClick={handleBack}>{buttonText}</Button>
        )}
        <AnimatePresence>
          {showConfirmPrompt && (
            <motion.div
              initial={{ left: -40, opacity: 0 }}
              animate={{ left: 8, opacity: 1 }}
              exit={{ left: -40, opacity: 0 }}
              style={{
                ...abs(10,null,null,10),
                borderRadius:'9px', border:'solid red 2px',
                backgroundColor:'white',padding:'5px'
              }}
            >
              <VFlex gap={1} sx={{  }}>
                <Box>{confirmText}</Box>
                <HFlex gap={4}>
                  <Button size='sm' w='50%' bgColor='red' color='white' onClick={handleConfirmNo}>X</Button>
                  <Button size='sm' w='50%' bgColor='green' color='white' onClick={handleConfirmYes}>&#x2713;</Button>
                </HFlex>
              </VFlex>
            </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
