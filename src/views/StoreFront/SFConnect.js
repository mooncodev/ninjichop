import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {
  Box, Button, Center, Flex, Link, Image, SimpleGrid, Heading, Avatar, Spinner, Input, PinInput, PinInputField
} from "@chakra-ui/react";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {useAuth} from "../../services/useAuth";
import {useWS, wsState} from "../../services/useWS";
import Select from "react-select";
import {enumCurrencies} from "../../data/constants";

export const SFConnect = ({...rest}) => {
  const publicHandle = useAuth(s=>s.user.publicHandle)
  const stationDefs = useAuth(s=>s.user.stationDefs)
  const wsErrorMsg = useWS(s=>s.wsErrorMsg)
  const defaultPIN = '1234'
  const defaultSN = {label:stationDefs[0].stationName, value:stationDefs[0].stationName}
  const [accessPIN, setAccessPIN] = useState(defaultPIN);
  const [stationName, set_stationName] = useState(defaultSN);
  const [submitIsDisabled, set_submitIsDisabled] = useState(true);

  const selectOpts = useCallback(stationDefs.reduce((uniqueStations, v) => {
    // Only add to the list if this station name is not already included
    if (!uniqueStations.find(station => station.label === v.stationName)) {
      uniqueStations.push({label: v.stationName, value: v.stationName});
    }
    return uniqueStations;
  }, []), [stationDefs]);

  const selectOnChange = (newValue, actionMeta)=>{
    set_stationName(newValue);
  }
  // useEffect(()=>{
  //   set_stationName(selectOpts[0].value)
  // },[])
  useEffect(()=>{
    if(
      /^\d{4}$/.test(accessPIN)
      && stationName != null
      && stationDefs.find(v=>v.stationName === stationName.value)
    ){
      // valid inputs
      set_submitIsDisabled(false)
    }else{
      // invalid inputs
      set_submitIsDisabled(true)
    }
  },[accessPIN,stationName])

  return (<>
    <Heading as='h1'>Connect</Heading>
    {wsErrorMsg && <p>{wsErrorMsg}</p>}
    <HFlex gap={3} w='98%' align='center'>
      <Flex w='100px' justify='end'>Station:</Flex>
      <Select styles={{container:(styles)=>({...styles, width: '100%', height: 'auto'})}}
        defaultValue={defaultSN}
        value={stationName}
        onChange={selectOnChange}
        // autoFocus={true}
        isClearable={true}
        isSearchable={true}
        options={selectOpts}
      />
    </HFlex>
    <HFlex gap={3} w='98%' align='center'>
      <Flex w='100px' justify='end'>PIN:</Flex>
      <HFlex>
        <PinInput size='md' defaultValue={defaultPIN} onChange={v=>setAccessPIN(v)} colorScheme='blackAlpha'>
          <PinInputField /><PinInputField /><PinInputField /><PinInputField />
        </PinInput>
      </HFlex>
      {/*<Input type='number' min='0' max='9999' placeholder='0123' value={accessPIN}*/}
      {/*       onChange={e=>setAccessPIN(e.target.value)}/>*/}
    </HFlex>
    <Button isDisabled={submitIsDisabled} onClick={()=> {
      useSF.setState({stationName: stationName.value})
      wsState().wsConnect(accessPIN, stationName.value, publicHandle)
    }}>Connect</Button>
  </>);
}
