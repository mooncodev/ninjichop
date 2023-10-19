import {useAuth} from "../../services/useAuth";
import {useState} from "react";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent, PopoverFooter,
  PopoverTrigger,
  useBoolean
} from "@chakra-ui/react";
import {HFlex} from "./UtilityTags";
import {HexColorPicker} from "react-colorful";
import {getPath} from "../../helpers/pathStringUtils";


export function ColorControls({initialColor='#FFFFFF', onChange=()=>{}, onSave=()=>{}}) {
  const [color, setColor] = useState(initialColor);
  const recentColors = useAuth(s=>s.user.recentColors)
  const handleChange = (value)=>{
    setColor(value)
    onChange(value)
  }
  const handleSave = ()=>{
    const savedColor = color;
    //if saved color isn't already in recentColors, save to profile
    if(recentColors.indexOf(savedColor)===-1){
      let itemsMod = [...recentColors]
      itemsMod.unshift(savedColor)
      itemsMod.pop()
      useAuth.getState()._updateUser({recentColors:itemsMod}).catch()
    }
    onSave(savedColor)
  }
  return (<>
    <HexColorPicker color={color} onChange={handleChange} />
    <Box bgColor={color} h='20px' my={2} w='100%' borderRadius={20}/>
    <HFlex justify='space-between' fontFamily='fira' fontWeight='900'>
      <Box color={color} bgColor='white' borderRadius={8} px={4}>{color}</Box>
      <Box color={color} bgColor='black' borderRadius={8} px={4}>{color}</Box>
    </HFlex>
    <HFlex className="buttons" my={2} flexBasis='53.333333%' flexWrap='wrap' gap={1}>
      {recentColors.map((v,i,a)=>(
        <Box key={i+v} _hover={{border:'2px solid black'}} onClick={()=>handleChange(v)} boxSize={7} borderRadius={20} bgColor={v}/>
      ))}
    </HFlex>
    <Button onClick={() => handleSave()} w='100%'>Choose {color}</Button>
  </>)
}


export default function ColorPopover({initColor="#FFFFFF", btnText="Pick a color", onChange=(v)=>{}, onSave=(v)=>{}, ...rest}) {
  // const initColor = useAuth(s=>getPath(path, s.user))
  // const uColor = useAuth(s=>s.user[propName])
  const [color, setColor] = useState(initColor);
  const [isEditing, setIsEditing] = useBoolean(false)

  const handleChange = (value)=>{
    setColor(value)
    onChange(value)
  }
  const handleSave = (savedColor)=>{
    if(savedColor!==initColor){
      // useAuth.getState()._updateUser({[propName]:savedColor}).catch()
      onSave(savedColor)
    }
    setIsEditing.off()
  }

  return (<Popover
    isOpen={isEditing}
    onOpen={setIsEditing.on}
    onClose={setIsEditing.off}
    // closeOnBlur={true}
  >
    <HFlex gap={3} {...rest}>
      <PopoverTrigger>
        <Box boxSize={10} borderRadius={20} sx={{bgColor:color, border:'1px solid', borderColor:'gray.100'}}/>
      </PopoverTrigger>
      <PopoverTrigger>
        <Button w='fit-content'>{btnText}</Button>
      </PopoverTrigger>
    </HFlex>
    <PopoverContent w='227px'>
      <PopoverArrow />
      {/*<PopoverCloseButton />*/}
      {/*<PopoverHeader>Confirmation!</PopoverHeader>*/}
      <PopoverBody>
        <ColorControls onSave={handleSave} onChange={handleChange} initialColor={color}/>
      </PopoverBody>
    </PopoverContent>
  </Popover>)
}
