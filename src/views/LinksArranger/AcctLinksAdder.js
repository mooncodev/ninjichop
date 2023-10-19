import React, {useEffect, useCallback, useRef, useState} from "react";
import {Box, Button, Center, Flex, HStack, Image, Input, SimpleGrid} from "@chakra-ui/react";
import Select from 'react-select';
import {HFlexSC, VFlex} from "views/bits/UtilityTags";
import {useAuth} from "services/useAuth";
import {enumCurrencies} from "data/constants";

export default function AcctLinksAdder(){
  const [showLinkAddForm, setShowLinkAddForm] = useState(false);
  const [ddValue, setDdValue] = useState('');
  const [tokenLabel, setTokenLabel] = useState('MuchoTexto');
  const [tokenAddr, setTokenAddr] = useState('0x10E85bEeeda544806c2eb38F8568AdEB2aFFD8B5');
  const [tokenLPAddr, setTokenLPAddr] = useState('0x10E85bEeeda544806c2eb38F8568AdEB2aFFD8B5');
  const [tokenSymbol, setTokenSymbol] = useState('MTXO');
  const [tokenDecimals, setTokenDecimals] = useState('18');
  const [rcvrAddr, setRcvrAddr] = useState('0xda46eee9b7E7f5d40d599c778a5E607F7e8242BD');
  const [showTokenAddrInput, setShowTokenAddrInput] = useState(null);
  const userAcctLinks = useAuth(s=>s.user.acctLinks)
  const addrElmt = useRef(null)
  const addrElmtToken = useRef(null)
  const submitNewLink = ()=>{
    let _ddValue = JSON.parse(ddValue)
    if(_ddValue.watchType === 'ethereumToken'){
      _ddValue.label = tokenLabel
      _ddValue.symbol = tokenSymbol
      _ddValue.decimals = tokenDecimals
    }else{
      setTokenAddr('')
    }
    const itemsMod = [
      {
        ..._ddValue,
        rcvrAddr, tokenAddr,
        show:true, hitCount: 0
      },
      ...userAcctLinks
    ];
    useAuth.getState()._updateUser({acctLinks:itemsMod}).then()

  }
  useEffect(()=>{
    if(ddValue){
      const _ddValue = JSON.parse(ddValue)
      setShowTokenAddrInput(_ddValue.watchType==='ethereumToken')
    }
  },[ddValue])

  const selectOpts = useCallback(enumCurrencies.map((v,i,a)=>{
    return {label:`${v.label}`, value:JSON.stringify(v)}
  }),[])

  return (<>
    <HFlexSC gap={3}>
      <Button variant='solidBlue' color='white' fontSize='16px'
              onClick={()=>setShowLinkAddForm(!showLinkAddForm)}>
        {!showLinkAddForm?'+ Add Account':'Cancel'}
      </Button>
      {/*<Button variant='outlinePink' w='160px' fontSize='16px'>+ Add Embed</Button>*/}
    </HFlexSC>
    {showLinkAddForm && (<Box border='1px solid gray' borderRadius='7px' p={4}>
      <Box>Currency:
        <Select
          onChange={(v)=>{
            setDdValue(v.value)
          }}
          isClearable={true}
          isSearchable={true}
          options={selectOpts}
        />

        {/*<Select placeholder='Select Currency' ref={currencyElmt}>*/}
        {/*  {enumCurrencies.map((v,i)=>(<option key={i} value={JSON.stringify(v)}>{v.label}&nbsp;({v.symbol})</option>))}*/}
        {/*</Select>*/}
      </Box>
      <Box>Receiving Address: <Input value={rcvrAddr} onChange={e=>setRcvrAddr(e.currentTarget.value)}/></Box>
      {showTokenAddrInput && (<>
        <Box>Token Label: <Input value={tokenLabel} onChange={e=>setTokenLabel(e.currentTarget.value)}/></Box>
        <Box>Token Address: <Input value={tokenAddr} onChange={e=>setTokenAddr(e.currentTarget.value)}/></Box>
        <Box>Token LP Address: <Input value={tokenLPAddr} onChange={e=>setTokenLPAddr(e.currentTarget.value)}/></Box>
        <Box>Token Symbol: <Input value={tokenSymbol} onChange={e=>setTokenSymbol(e.currentTarget.value)}/></Box>
        <Box>Token Decimals: <Input value={tokenDecimals} onChange={e=>setTokenDecimals(e.currentTarget.value)}/></Box>
      </>)}
      <Button variant='outlineBlue' w='100px' fontSize='16px' onClick={submitNewLink}>Submit</Button>
    </Box>)}
  </>)
}
