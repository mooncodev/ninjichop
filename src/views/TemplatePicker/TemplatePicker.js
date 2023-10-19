import React, {useEffect, useState} from "react";
import {Box, Button, Center, Heading, SimpleGrid} from "@chakra-ui/react";
import {HFlex, VFlex} from "../bits/UtilityTags";
import {useAuth} from "../../services/useAuth";
import TemplateCreator from "./TemplateCreator";
import {templateDefs} from "../../data/templateDefs";
import {getBackgroundSx} from "./getBackgroundSx";

function StyledThemeDummy({tpl}){
  return (
    <VFlex sx={getBackgroundSx(tpl.backgroundSpec)} p={4} gap={4} borderRadius='7px'>
      <br/>
      <Box sx={tpl.acctCardSpec} w='100%' h='20px'/>
      <Box sx={tpl.acctCardSpec} w='100%' h='20px'/>
      <Box sx={tpl.acctCardSpec} w='100%' h='20px'/>
      <Box sx={tpl.acctCardSpec} w='100%' h='20px'/>
    </VFlex>
  )
}

export default function TemplatePicker(){
  const activeTemplate = useAuth(s=>s.user.template)
  const customTpl = useAuth(s=>s.user.customTpl)

  const [showTplCreator, setShowTplCreator] = useState();
  const [items, setItems] = useState();
  const [cards, setCards] = useState()

  useEffect(()=>{
  },[])
  const onSelectTemplate = (label) => {
    useAuth.getState()._updateUser({template:label}).then()
  }
  const onSelectCreateYourOwn = () => {
    setShowTplCreator(!showTplCreator)
  }

  return (<>
    <br/>
    <HFlex>
      <Heading size='md' mb={3}>Themes</Heading>
      <Button ml={3} size='sm' onClick={onSelectCreateYourOwn}>{showTplCreator?'Close Theme Editor':'Edit Custom Theme'}</Button>
    </HFlex>
    {showTplCreator && (<TemplateCreator onClose={onSelectCreateYourOwn}/>)}
    <SimpleGrid columns={3} gap={2} maxWidth='600px' gridAutoFlow={'dense'} templateColumns='repeat(auto-fit, minmax(150px, 1fr))'>
      <VFlex p={2} gap={4} borderRadius='7px'
             border={activeTemplate==="Custom"?'3px dashed pink':'3px solid transparent'}
             onClick={()=>{onSelectTemplate("Custom")}}
      >
        <StyledThemeDummy tpl={customTpl}/>
        <Center fontWeight={activeTemplate === "Custom"?'bold':'normal'}>Custom</Center>
      </VFlex>
      {templateDefs.map((v,i)=> {
        const {bgType,bgFlatColor,bgGrdColor1,bgGrdColor2,bgGrdDir,bgImage} = v.backgroundSpec
        return (
          <VFlex key={v.label} p={2} gap={4} borderRadius='7px'
                 border={activeTemplate === v.label ? '3px dashed pink' : '3px solid transparent'}
                 onClick={() => {
                   onSelectTemplate(v.label)
                 }}
          >
            <StyledThemeDummy tpl={v}/>
            <Center fontWeight={activeTemplate === v.label?'bold':'normal'}>{v.label}</Center>
          </VFlex>
        )
      })}
    </SimpleGrid>
  </>)
}
