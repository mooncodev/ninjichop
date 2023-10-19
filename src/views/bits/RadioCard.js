import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox} userSelect='none'
        cursor='pointer' borderWidth='1px' borderRadius='md' boxShadow='md'
        _checked={{ bg: 'bog.600', color: 'white', borderColor: 'bog.600', }}
        _focus={{ boxShadow: 'outline', }} px={3} py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export function RadioButtons({onChange,options=[''],defaultOption=options[0],name=''}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: defaultOption,
    onChange: onChange,
  })
  const group = getRootProps()
  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
