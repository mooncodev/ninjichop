import { Link } from "react-router-dom";
import {HFlex, VFlex} from './bits/UtilityTags.js';
import {
  Divider,
  FormControl,
  Heading,
  FormHelperText,
  SimpleGrid,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Button, Box
} from "@chakra-ui/react";
import {authState, useAuth} from "../services/useAuth";
import EditableCtrl from "./LivePreview/EditableCtrl";
import ImageUploadCtrl from "./LivePreview/ImageUploadCtrl";
import {useState} from "react";
import StationManager from "./LinksArranger/StationManager";


export default function TbSettings() {
  const user = useAuth(s=>s.user)
  return (
    <VFlex w={['100%','100%','550px']}>

      <ImageUploadCtrl path='image' label='Profile Image' circular/>
      <Divider my={2}/>
      <EditableCtrl propName='name' label='Name'/>
      <Divider my={2}/>
      {/*<EditableCtrl propName='greeting' label='Greeting'/>*/}
      {/*<Divider my={2}/>*/}
      <EditableCtrl propName='publicHandle' label='Public Link Handle' forceLowerCase/>
      <Divider my={2}/>
      <StationManager />
      <Divider my={2}/>
      <EditableCtrl propName='salesTax' label='Sales Tax %' />
      <Divider my={2}/>
      <EditableCtrl propName='salesFees' label='Sales Fees %' />
      <Divider my={2}/>
      {/*Note: bio is a textarea, which has an issue where expanding
         the field vertically overlaps over elements below */}
      {/*<EditableCtrl propName='bio' label='Bio' textarea/>*/}
      {/*<Divider my={2}/>*/}

      {/*<FormControl as='fieldset'>*/}
      {/*  <Heading as={FormLabel} size='sm' htmlFor='nsfw-warning' mb='0'>*/}
      {/*    Preferred Link*/}
      {/*  </Heading>*/}

      {/*  <FormHelperText>Select only if you're a fan.</FormHelperText>*/}
      {/*  <RadioGroup defaultValue='uri'>*/}
      {/*    <VFlex gap={3}>*/}
      {/*      <Radio value='uri'><Input w='340px' disabled placeholder={`coinstarz.com/${user.publicHandle}`}/></Radio>*/}
      {/*      <Radio value='subdomain'><Input w='340px' disabled placeholder={`${user.publicHandle}.coinstarz.com/`}/></Radio>*/}
      {/*      <Radio value='custom'><Input w='340px' disabled placeholder={`your domain`}/></Radio>*/}
      {/*    </VFlex>*/}
      {/*  </RadioGroup>*/}
      {/*</FormControl>*/}

      <Divider my={2}/>

      <FormControl as={SimpleGrid} templateColumns='auto 60px' alignItems='start'>
        <VFlex>
          <Heading as={FormLabel} size='sm' htmlFor='show-kzm-credit' mb='0'>
            Show Krypto Merchant Credit
          </Heading>
          <FormHelperText>We appreciate you showing our logo credit in the footer, but feel free to hide it.</FormHelperText>
        </VFlex>
        <Switch id='show-kzm-credit' isChecked={user.showKzmCredit} alignSelf='center' justifySelf='end'
                onChange={ (e)=>{
                  authState()._updateUser({showKzmCredit:e.currentTarget.checked}).then()
                }}/>
      </FormControl>

      <Divider my={2}/>

{/*
      <FormControl as={SimpleGrid} templateColumns='auto 60px' alignItems='start'>
        <VFlex>
          <Heading as={FormLabel} size='sm' htmlFor='nsfw-warning' mb='0'>
            NSFW WARNING
          </Heading>
          <FormHelperText>Show a warning before displaying your page.</FormHelperText>
        </VFlex>
        <Switch id='nsfw-warning' isChecked={user.showNsfwWarning} alignSelf='center' justifySelf='end'
                onChange={ (e)=>{
                  authState()._updateUser({showNsfwWarning:e.currentTarget.checked}).then()
                }}/>
      </FormControl>

      <Divider my={2}/>
*/}

    </VFlex>
  )
}
