import {
  ButtonGroup, Editable, EditablePreview, EditableInput, EditableTextarea, Flex, Heading, Box, SimpleGrid,
  IconButton, Input, Tooltip, useEditableControls, useBreakpointValue, Text,
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {useAuth} from "services/useAuth";
import {VFlex} from "../bits/UtilityTags";
import {useState} from "react";

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps
  } = useEditableControls();
  return isEditing && (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()}/>
    </ButtonGroup>
  );
}

export default function EditableCtrl({propName, label, textarea=false, forceLowerCase=false, sx={}}) {
  const initVal = useAuth(s=>s.user[propName])
  const [fieldVal, setFieldVal] = useState(String(initVal))
  const [msg, setMsg] = useState({color:'',text:''})

  const onSubmit = async(value)=>{
    if(value===initVal){return}
    useAuth.getState()._updateUser({[propName]:value}).then((res)=>{
      if(res.success){
        setFieldVal(forceLowerCase?value.toLowerCase():value)
        setTimeout(()=>{setMsg({color:'',text:''})},7000)
        setMsg({color:'green', text: 'Saved!'})
      }else{
        setFieldVal(initVal)
        //TODO: error feedback logic here
        setTimeout(()=>{setMsg({color:'',text:''})},7000)
        setMsg({color:'red', text: res.error ? res.error : 'Could not store the provided value'})
      }
    })
  }

  const rsvWidth = useBreakpointValue(['250px','320px','380px'])

  return (<VFlex sx={sx}>
    <Heading size='sm'>{label}</Heading>
    <Editable
      as={SimpleGrid}
      defaultValue={initVal} isPreviewFocusable={true} selectAllOnFocus={false}
      value={fieldVal}
      onChange={(v)=>{
        setFieldVal(forceLowerCase?v.toLowerCase():v)
      }}
      onSubmit={onSubmit}
      sx={{
        borderRadius:'10px',mt:1, h:'42px',
        w: rsvWidth,
        gridTemplateColumns:`${rsvWidth} 80px`,
        gridTemplateRows:`42px`,
        position:'relative',
      }}
    >
      <Tooltip label="Click to edit">
        <EditablePreview
          sx={{
            // position: 'absolute', right: '0', left: '0',
            // w: rsvWidth,
            display:'flex', alignItems:'center',px:4,
            //h: '42px',// py:2, px:4,
            bgColor:'gray.50',
            whiteSpace: 'nowrap', overflow: 'hidden',
          }}
          // border='1px solid lightgray'
          _hover={{
            background: "gray.200"
          }}
        />
      </Tooltip>
      {textarea?
        <EditableTextarea py={2} px={4}/>
        :<EditableInput py={2} px={4}/>
      }
      {/*<Input py={2} px={4} as={textarea?EditableTextarea:EditableInput} />*/}
      <EditableControls />
    </Editable>
    <Box h={3} ml={2} mt={1} fontSize='10px' color={msg.color}>{msg.text}</Box>
  </VFlex>);
}
