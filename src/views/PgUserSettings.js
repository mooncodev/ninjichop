import React, { useState } from 'react';
import { Box, Grid, Heading, Spinner, Text, } from '@chakra-ui/react';
import { BtnXs, HFlexSC, IBtn } from './bits/UtilityTags.js';
import { authState } from '../services/useAuth.js';
import { MdCancel, MdCheck } from 'react-icons/md';
// import { sendPasswordResetEmail } from 'firebase/auth';


export default function PgUserSettings() {
  const [showPwResetConfirm,setShowPwResetConfirm] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [didSendMessage,setDidSendMessage] = useState('')

  function onCancelPwReset(){
    setIsLoading(true)
    setShowPwResetConfirm(false)
    setDidSendMessage('')
  }
  async function onConfirmPwReset(){
    // setIsLoading(true)
    // const res = await sendPasswordResetEmail(
    //   authState().auth,
    //   authState().user.email
    // ).then((r)=>{
    //   return 'success'
    // }).catch((e)=>{
    //   return 'error'
    // })
    // if(res==='success'){
    //   setDidSendMessage('Email Sent!')
    //   setIsLoading(false)
    //   setTimeout(()=>{
    //     onCancelPwReset(false)
    //   },3000)
    // }else{
    //   setDidSendMessage('Could not send email, please try again.')
    // }
  }
  function onShowPwResetConfirm(){
    setIsLoading(false)
    setShowPwResetConfirm(true)
  }
  return (
    <>
      <Heading>Account</Heading>
      <Text>Email: {authState().user.email}</Text>
      <Box>
        {showPwResetConfirm? (
          <HFlexSC sx={{bgColor:'gray.50', borderRadius:'15px', p:'1rem', w:'fit-content'}}>
            {isLoading ? (
              <Spinner/>
            ) : didSendMessage ? (
              <>
                {didSendMessage}
              </>
            ): (
              <>
                <Text>Send Email?</Text>
                <IBtn I={MdCancel} onClick={onCancelPwReset} w="60px" h="30px" bgColor={'red.100'}>Cancel</IBtn>
                <IBtn I={MdCheck} onClick={onConfirmPwReset} w="60px" h="30px" bgColor={'green.300'}>Confirm</IBtn>
              </>
            )}
          </HFlexSC>
        ):(
          <>
            <BtnXs onClick={onShowPwResetConfirm}>Change Password</BtnXs>
          </>)}
      </Box>
      <br/>
      <Heading>Other Settings</Heading>
      {/* <Text>Subscription: {} </Text> */}
      {/* <BtnXs>Change Plan</BtnXs> */}
    </>
  );
}
