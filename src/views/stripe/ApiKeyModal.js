import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useAppStore } from 'services/useAppStore.js';
import { authState, useAuth } from 'services/useAuth.js';
import { HFlexSC, selectElmtContents, TextXs, VFlex } from '../bits/UtilityTags.js';
import { CopyToClipboardButton } from '../../hooks/CTCBButton.js';
import { fira, mont } from '../../theme/foundations/fonts.js';
import {planState} from "services/usePlan";

export default function ApiKeyModal({  }) {
  const isOpen = useAppStore(s=>s.apiKeyModalIsOpen)
  const apiKey = useAuth(s=>s.lnpUserNewApiKey)
  const txtarea = useRef(null)
  const onClose = ()=>{
    useAuth.setState({lnpUserNewApiKey: ''})
    useAppStore.getState().set_apiKeyModalIsOpen(false)
  }

  useEffect(()=>{
    if(apiKey){
      selectElmtContents(txtarea.current)
    }
  },[apiKey])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalHeader>Generate New API Key</ModalHeader>
          {apiKey ? (

            <VFlex>
              <TextXs>Click to select:</TextXs>
              <HFlexSC>
                <Textarea readOnly ref={txtarea} value={apiKey} resize='none' onClick={(e)=>{
                  selectElmtContents(e.currentTarget);
                }} sx={{...fira}}/>
                <CopyToClipboardButton text={apiKey} sx={{
                  backgroundColor: 'gray.100',
                  border: '1px solid',
                  borderColor: 'gray.500',
                  w:'120px',
                  h:'80px',
                  justifyContent:'center',
                  alignItems:'center',
                  ...mont.md.md
                }}/>
              </HFlexSC>
              <TextXs color='red.300'>
                Store this key somewhere safe as it cannot be retrieved,
                and is not stored anywhere.  The key will not exist anywhere
                besides your own hands once this popup is closed. Our server
                only stores a key which is cryptographically paired with this API key.
              </TextXs>
            </VFlex>
          ) : (<>
            <Button onClick={()=>planState().generateNewApiKey()}>
              Generate Key
            </Button>
            <TextXs>Note: Any pre-existing API Keys for this account will be replaced on our end of things.</TextXs>
          </>)}
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

