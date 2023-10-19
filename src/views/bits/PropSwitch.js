import {authState, useAuth} from "../../services/useAuth";
import {FormControl, FormHelperText, FormLabel, Heading, SimpleGrid, Switch} from "@chakra-ui/react";
import {VFlex} from "./UtilityTags";

export default function PropSwitch({heading, helpText, propName}){
  const stateToggle = useAuth(s=>s.user[propName])
  return (
    <FormControl as={SimpleGrid} templateColumns='auto 60px' w={['300px','300px','360px']} mb={3}>
      <VFlex>
        <Heading as={FormLabel} size='sm' htmlFor={propName} mb='0'>{heading}</Heading>
        <FormHelperText>{helpText}</FormHelperText>
      </VFlex>
      <Switch id={propName} isChecked={stateToggle} alignSelf='center' justifySelf='end'
              onChange={ (e)=>{authState()._updateUser({[propName]:e.currentTarget.checked}).then()}}
      />
    </FormControl>
  )
}
