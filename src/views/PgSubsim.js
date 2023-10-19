import {useEffect, useMemo, useRef, useState} from 'react';
import {
  Box, Grid, Heading, SimpleGrid, Text, Button,
  Input, InputGroup, InputRightElement, InputLeftElement, Divider, useToast,
} from '@chakra-ui/react';
import {
  BtnXs, HFlex, HFlexCC, HFlexSC, S, TextXs, VFlex, VFlexCC, VFlexCS
} from './views/bits/UtilityTags.js';
import {format} from 'date-fns';
import ApiKeyModal from './views/stripe/ApiKeyModal.js';
import StripeIntentModal from './views/stripe/StripeIntentModal.js';
import { authState, useAuth } from './useAuth.js';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export default function PgSubsim() {
  const verifyEmailInput = useRef(null);
  const userPrefInput = useRef(null);
  const user = useAuth(s=>s.user);
  const isAuthenticated = useAuth(s=>s.isAuthenticated);
  const [mustVerify, setMustVerify] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const toast = useToast();

  const creds = ['mooncodev@gmail.com','qqqq1111']
  const register = async ()=> {
    const res = await authState()._register(creds[0], creds[1])
    if(res.mustVerify){
      setStatusMessage('please verify email')
      setMustVerify(true)
    }else{
      setStatusMessage(res.message)
      setMustVerify(false)
    }
  }
  const login = async ()=> {
    const res = await authState()._login(creds[0], creds[1])
    if(res.mustVerify){
      setStatusMessage('please verify email')
      setMustVerify(true)
    }if(res.success){
      setStatusMessage('login success!')
      setMustVerify(false)
      // history.push('/dash');
    }
  }
  const logout=async ()=> {
    await authState()._logout()
    toast({title: "Successfully logged out.", status: "info",});
    setStatusMessage('')
  }
  const delUser=()=>authState().delUser()

  const verifyEmail = async ()=>{
    const codeVal = parseInt(verifyEmailInput.current.value.trim())
    const res = await authState()._verify(codeVal)
    if(res.success){
      setStatusMessage('login success!')
      setMustVerify(false)
      // history.push('/dash');
    }
  }
  const setUserPref = async ()=>{
    const inputVal = userPrefInput.current.value.trim()
    const res = await authState()._updateUser({name:inputVal})
    if(res.success){
      setStatusMessage('login success!')
      setMustVerify(false)
      // history.push('/dash');
    }
  }
  const resetAll = async ()=>{
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('logout');
  }

  useEffect(() => {

  }, [user]);

  return (<>

    <VFlex my={6} alignSelf={'center'}>
      <Heading>Simulator</Heading>
      <HFlex gap={2}>
        <BtnXs onClick={register}>register</BtnXs>
        {!user ? (<BtnXs bgColor='#AFC' onClick={login}>login</BtnXs>)
          :(<><BtnXs bgColor='#AFC' onClick={logout}>logout {user.email}</BtnXs>
            <BtnXs sx={{h:'12px',bgColor:'#A55'}} onClick={delUser}>delUser</BtnXs></>)}
      </HFlex>

      {user && (
        <Box sx={{border:'1px solid black', borderRadius:'6px', p:'5px'}}>
          {Object.entries(user).map(([kk,vv],i,a)=>(<Box key={i}>{kk}: {JSON.stringify(vv)}</Box>))}
        </Box>
      )}
      <Box sx={{border:'1px dotted black', borderRadius:'6px', p:'5px', w:'400px', overflow:'auto'}}>
        sessionStorage: {JSON.stringify(sessionStorage)}<br/>
        ls-logout: {String(localStorage.getItem('logout'))}<br/>
        isAuthenticated: {String(isAuthenticated)}<br/>

      </Box>
      {mustVerify && (
        <Box sx={{border:'1px solid black', borderRadius:'6px', p:'5px'}}>
          <Input ref={verifyEmailInput} placeholder='Verification Code'/>
          <Button onClick={verifyEmail}>Verify</Button>
        </Box>
      )}
      {statusMessage && (
        <Box color='red'>{statusMessage}</Box>
      )}
      <SimpleGrid mt={4} spacing={3} columns={1} w='200px'>
        <BtnXs onClick={resetAll}>reset all</BtnXs>
        <Button onClick={authState()._getUser}>Refresh</Button>
      </SimpleGrid>
      <SimpleGrid mt={4} spacing={3} columns={1} w='200px' sx={{border:'2px solid blue', borderRadius:'6px', p:'5px'}}>
        <Input ref={userPrefInput}/>
        <Button onClick={setUserPref}>Set userPref</Button>
      </SimpleGrid>
    </VFlex>
  </>);
}

