import {
  Box, Button, Heading, Icon, Link,
  Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, Image,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {HFlex, HFlexSC, selectElmtContents, TextXs, VFlex} from 'views/bits/UtilityTags.js';
import { CopyToClipboardButton } from 'hooks/CTCBButton.js';
import {fira, mont, rale} from 'theme/foundations/fonts.js';
import {planState} from "services/usePlan";
import {sfState, useSF} from "services/useSF";
import {first4, last4, surr4s} from "../../../helpers/math/zmath.mjs";
import {NavLink} from "react-router-dom";
import {BiLinkExternal} from "react-icons/bi";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import QRCode from "qrcode";
import {abs} from "../../bits/cssHelpers";
import {wsSend} from "../../../services/useWS";
import {toast} from "../../../App";

async function generateQrImage(qrString){
  return QRCode.toDataURL(qrString)
}

export default function ActivityItemModal({  }) {
  const masterLog = useSF(s => s.masterLog);
  const context = useSF(s=>s.activityItemModalContext)
  const isOpen = useSF(s=>s.activityItemModalIsOpen)
  const [activityItem,set_activityItem] = useState({})
  const [showConfirmPrompt,set_showConfirmPrompt] = useState(false)
  const [qrImage,set_qrImage] = useState('')
  const onClose = ()=>{
    useSF.getState().set_activityItemModalIsOpen(false, {orderNumber:''})
  }

  useEffect(()=>{
    if(context.orderNumber && masterLog.length){
      set_activityItem(masterLog.find(v=>v.orderNumber===context.orderNumber))
    }
  },[context])

  function PropDisplay({label, accessor, mod=v=>v}){
    let valDisplay = activityItem[accessor] ? mod(activityItem[accessor]) : ''

    return (
      <HFlexSC>
        <Box sx={{...rale, mr:3,}}>{label}:</Box>
        {valDisplay && (
          <CopyToClipboardButton text={activityItem[accessor]} sx={{
            backgroundColor: 'gray.100',
            h:'30px',
            justifyContent:'center',
            alignItems:'center',
            ...mont.md.md
          }} children={valDisplay}/>
        )}
      </HFlexSC>
    )
  }

  const handleOrderCancelButton = async ()=>{
    set_showConfirmPrompt(true)
  }
  const handleConfirmYes = ()=>{
    wsSend({ type: 'cancel', orderNumber: activityItem.orderNumber })
    set_showConfirmPrompt(false)
  }
  const handleConfirmNo = ()=>{
    set_showConfirmPrompt(false)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={7}>
            <VFlex gap={2}>
              <TextXs>Click to copy:</TextXs>

              <PropDisplay label='Order' accessor='orderNumber' mod={v=>'#'+v}/>
              <PropDisplay label='Status' accessor='status'/>
              <PropDisplay label='Station' accessor='stationName'/>
              <PropDisplay label='Purchase Price' accessor='purchasePrice' mod={v=>'$'+v}/>
              <PropDisplay label='Total Price' accessor='totalPrice' mod={v=>'$'+v}/>
              <PropDisplay label='Currency' accessor='label'/>
              <PropDisplay label='Symbol' accessor='symbol'/>
              {activityItem.watchType === 'ethereumToken' && (<>
                <PropDisplay label='Token Address' accessor='tokenAddr' mod={surr4s}/>
                <PropDisplay label='Pair Address' accessor='tokenLPAddr' mod={surr4s}/>
              </>)}
              <PropDisplay label='Recipient' accessor='rcvrAddr' mod={surr4s}/>
              <PropDisplay label='Sender' accessor='senderAddr' mod={surr4s}/>
              <PropDisplay label='Tx Hash' accessor='txHash' mod={surr4s}/>
              {activityItem.txHash && (
                <Link isExternal bgColor={'gray'} borderRadius={5} w='fit-content' px={2}
                      href={`https://etherscan.io/tx/${activityItem.txHash}`}>
                  Open Transaction Explorer
                  <ExternalLinkIcon mx={1} mb={1} />
                </Link>
              )}

              {/*Regenerate QR Image*/}
              {activityItem.qrString && (
                <VFlex mt={5}>
                  <Button onClick={()=>{
                    if(qrImage) {
                      set_qrImage('')
                    }else {
                      QRCode.toDataURL(activityItem.qrString).then(img=>{
                        set_qrImage(img)
                      })
                    }
                  }}>{qrImage ? 'Dismiss' : 'Regenerate'} QR Image</Button>
                  {qrImage && (<>
                    <Image w='100%' src={qrImage}/>
                    <Box>{activityItem.qrString}</Box>
                  </>)}
                </VFlex>
              )}

              {/*Cancel Order*/}
              {['pending','created'].indexOf(activityItem.status)>-1 && (
                <VFlex mt={5}>
                  {!showConfirmPrompt ? (
                    <Button onClick={handleOrderCancelButton} colorScheme='red'>
                      Cancel Order
                    </Button>
                  ) : (
                    <VFlex gap={1} sx={{bgColor:'white', borderRadius:'9px', border:'solid red 2px', p:'5px'}}>
                      <Box>Are you sure you want to cancel this order?
                        This will remove (delete) the order from the tracking feature.
                        Only do this if the customer will <strong>not</strong> use
                        the QR Image to perform a transaction.</Box>
                      <HFlex gap={4}>
                        <Button size='sm' w='50%' bgColor='red' color='white' onClick={handleConfirmNo}>X</Button>
                        <Button size='sm' w='50%' bgColor='green' color='white' onClick={handleConfirmYes}>&#x2713;</Button>
                      </HFlex>
                    </VFlex>
                  )}
                </VFlex>
              )}

              {/*<PropDisplay label='QR String' accessor='qrString'/>*/}
            </VFlex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

