import {HFlex, HFlexSC, VFlex, VFlexCC} from "../bits/UtilityTags";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  Center,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {MdGradient, MdImage, MdOutlinePalette} from "react-icons/md";
import {TbDotsVertical, TbGridDots, TbGripVertical, TbMessageChatbot} from "react-icons/tb";
import {FaBitcoin} from "react-icons/fa";
import {CgTab} from "react-icons/cg";
// import {ColorWheelSvg} from "../../assets/Brand";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ColorPopover from "../bits/ColorPopover";
import {useAuth} from "../../services/useAuth";
import ImageUploadCtrl from "../LivePreview/ImageUploadCtrl";
import {getPath} from "../../helpers/pathStringUtils";
import {ArrowUpIcon} from "@chakra-ui/icons";

const specDefaults = {
  backgroundSpec:{
    bgType:'flat',
    bgFlatColor:'#FFF',
    bgGrdColor1:'#FFF',
    bgGrdColor2:'#CCC',
    bgGrdDir:'0deg',
    bgImage:'',
  },
  headlinesSpec: {
    font: {
      fontFamily: '',
      fontWeight: '',
      fontSize: '',
    },
    color: '#555',
  },
  tabsSpec: {
    borderRadius:'30px',
    bgColor:'#FFF',
    color:'#555',
    shadow:'dark-lg'
  },
  acctCardSpec: {
    borderRadius:'30px',
    bgColor:'#FFF',
    color:'#555',
    shadow:'dark-lg'
  },
}
const PropSlider = ({heading, min=0, max=100, step=1, valPrefix='', valSuffix='', onChange=(v)=>{}, valEnum, ...rest})=>{
  const hasValEnum = valEnum && valEnum.length;
  if(hasValEnum){
    max=valEnum.length-1;
  }
  const [sliderValue, setSliderValue] = useState(4)
  const handleChange = (e)=>{
    const exportVal = hasValEnum ? valEnum[e] : valPrefix + e + valSuffix;
    setSliderValue(e);
    onChange(exportVal);
  }
  return (
    <Box sx={{border:'1px solid', borderColor:'gray.200', borderRadius:'7px'}} {...rest}>
      <HFlex align='center' gap={3}>
        <Heading size='xs' my={3}>{heading}</Heading>
        {valSuffix==='deg' && (<ArrowUpIcon sx={{transform:`rotate(${sliderValue}deg)`}}/>)}
        <Box sx={{bgColor:'gray.200',borderRadius:'7px', px:'3px'}}>
          {valPrefix}
          {hasValEnum ? valEnum[sliderValue] : sliderValue}
          {valSuffix}
        </Box>
      </HFlex>
      <Slider aria-label='slider-ex-6' onChange={handleChange} min={min} max={max} step={step}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>)
}

const FontPicker = ({root='customTpl', onChange=(v)=>{}})=>{
  const [fontFamily, setFontFamily] = useState('inter')
  const [fontWeight, setFontWeight] = useState('500')
  const [fontSize, setFontSize] = useState('14px')

  const FontBox = ({children, value, ...rest})=>(
    <VFlexCC sx={{bgColor:'gray.50',borderRadius:'7px', border:'1px solid gray',h:'30px', cursor:'pointer'}}
             onClick={()=> {
               setFontFamily(value)
             }}
             fontFamily={value}
             {...rest}>
      <Text>{children}</Text>
    </VFlexCC>
  );
  useEffect(()=>{
      onChange({ fontFamily, fontWeight, fontSize })
    }, [fontFamily, fontWeight, fontSize]
  )

  return (
    <Box sx={{border:'1px solid', borderColor:'gray.200', borderRadius:'7px'}}>
      <Heading size='sm' my={3}>Fonts</Heading>

      <PropSlider heading='Font Size' onChange={setFontSize} min={9} max={30} valSuffix='px'/>
      <PropSlider heading='Font Weight' onChange={setFontWeight} min={2} max={9} valSuffix='00'/>

      <SimpleGrid columns={3} gap={1} maxWidth='600px' fontWeight={fontWeight} fontSize='12px'>
        <FontBox value='inter'>Inter</FontBox>
        <FontBox value='poppins'>Poppins</FontBox>
        <FontBox value='rubik'>Rubik</FontBox>
        <FontBox value='opensans'>Open Sans</FontBox>
        <FontBox value='mont'>Montserrat</FontBox>
        <FontBox value='quicksand'>Quicksand</FontBox>
        <FontBox value='playfair'>Playfair Display</FontBox>
        <FontBox value='raleway'>Raleway</FontBox>
        <FontBox value='fira'>Fira Code</FontBox>
      </SimpleGrid>
    </Box>
  )

}

const BackgroundSpec = ({onChange=(v)=>{}, ...rest})=>{
  const user = useAuth(s=>s.user)
  const init = {
    bgType: getPath('customTpl.backgroundSpec.bgType', user),
    bgFlatColor: getPath('customTpl.backgroundSpec.bgFlatColor', user),
    bgGrdColor1: getPath('customTpl.backgroundSpec.bgGrdColor1', user),
    bgGrdColor2: getPath('customTpl.backgroundSpec.bgGrdColor2', user),
    bgGrdDir: getPath('customTpl.backgroundSpec.bgGrdDir', user),
    bgImage: getPath('customTpl.backgroundSpec.bgImage', user),
  }
  const [bgType, setBgType] = useState(init.bgType) // flat|gradient|photo
  const [bgFlatColor, setBgFlatColor] = useState(init.bgFlatColor)
  const [bgGrdColor1, setBgGrdColor1] = useState(init.bgGrdColor1)
  const [bgGrdColor2, setBgGrdColor2] = useState(init.bgGrdColor2)
  const [bgGrdDir, setBgGrdDir] = useState(init.bgGrdDir)
  const [bgImage, setBgImage] = useState(init.bgImage)

  useEffect(()=>{
    onChange({bgType, bgFlatColor, bgGrdColor1, bgGrdColor2, bgGrdDir, bgImage,})
  }, [])
  useEffect(()=>{
    onChange({bgType, bgFlatColor, bgGrdColor1, bgGrdColor2, bgGrdDir, bgImage,})
  }, [bgType, bgFlatColor, bgGrdColor1, bgGrdColor2, bgGrdDir, bgImage,])

  const sxCard={bgColor:'gray.200',borderRadius:'7px', h:'50px', wordWrap:'break-all'}

  return (<VFlex gap={2}>
    <SimpleGrid columns={3} gap={2} mb={3} maxWidth='600px'>
      <Button sx={{...sxCard, outline:bgType==='flat'?'solid':'unset'}} onClick={()=>{setBgType('flat')}}><VFlexCC><MdOutlinePalette size='25'/><Text>Flat</Text></VFlexCC></Button>
      <Button sx={{...sxCard, outline:bgType==='gradient'?'solid':'unset'}} onClick={()=>{setBgType('gradient')}}><VFlexCC><MdGradient size='25'/><Text>Gradient</Text></VFlexCC></Button>
      <Button sx={{...sxCard, outline:bgType==='photo'?'solid':'unset'}} onClick={()=>{setBgType('photo')}}><VFlexCC><MdImage size='25'/><Text>Photo</Text></VFlexCC></Button>
    </SimpleGrid>
    {bgType==='flat' && (<>
      <ColorPopover btnText='Flat Color' initColor={init.bgFlatColor} onSave={setBgFlatColor}/>
    </>)}
    {bgType==='gradient' && (<>
      <ColorPopover btnText='Gradient Color 1' initColor={init.bgGrdColor1} onSave={setBgGrdColor1}/>
      <ColorPopover btnText='Gradient Color 2' initColor={init.bgGrdColor2} onSave={setBgGrdColor2}/>
      <PropSlider heading='Direction' onChange={setBgGrdDir} min={0} max={360} valSuffix='deg'/>
    </>)}
    {bgType==='photo' && (<>
      <ImageUploadCtrl path={'customTpl.backgroundSpec.bgImage'} label='Background Image' onSave={setBgImage}/>
    </>)}
  </VFlex>)
}

const HeadlinesSpec = ({onChange=(v)=>{}, ...rest})=>{
  const initColor = useAuth(s=>getPath('customTpl.headlinesSpec.color', s.user))
  const [font, setFont] = useState({
    fontFamily:'',
    fontWeight:'',
    fontSize:'',
  })
  const [color, setColor] = useState('#FFFFFF')

  useEffect(()=>{
      onChange({ font, color })
    }, [ font, color ]
  )
  const sxCard={bgColor:'gray.200',borderRadius:'7px', h:'50px', wordWrap:'break-all'}

  return (<VFlex gap={2}>
    <ColorPopover btnText='Text Color' initColor={initColor} path={'customTpl.headlinesSpec.color'} onSave={setColor}/>
    <FontPicker onChange={setFont}/>
    <Text fontFamily={font.fontFamily} fontWeight={font.fontWeight} fontSize={font.fontSize} color={color}>
      The quick brown fox jumps over the lazy dog.
    </Text>

  </VFlex>)
}

const TabsSpec = ({onChange=(v)=>{}, ...rest})=>{
  // const initBorderRadius = useAuth(s=>getPath('customTpl.acctCardSpec.borderRadius', s.user))
  // const initBgColor = useAuth(s=>getPath('customTpl.acctCardSpec.bgColor', s.user))
  // const initColor = useAuth(s=>getPath('customTpl.acctCardSpec.color', s.user))
  const initSize = useAuth(s=>getPath('customTpl.tabsSpec.size', s.user))
  const initVariant = useAuth(s=>getPath('customTpl.tabsSpec.variant', s.user))
  const initColorScheme = useAuth(s=>getPath('customTpl.tabsSpec.colorScheme', s.user))

  // const [borderRadius, setBorderRadius] = useState(initBorderRadius)
  // const [bgColor, setBgColor] = useState(initBgColor)
  // const [color, setColor] = useState(initColor)
  const [size, setSize] = useState(initSize)
  const [variant, setVariant] = useState(initVariant)
  const [colorScheme, setColorScheme] = useState(initColorScheme)

  useEffect(()=>{onChange({size, variant, colorScheme})}, [])
  useEffect(()=>{
      onChange({ size, variant, colorScheme })
    }, [ size, variant, colorScheme ]
  )
  const sxCard={bgColor:'gray.200',borderRadius:'7px', h:'50px', wordWrap:'break-all'}

  return (<VFlex gap={2}>
    {/*<ColorPopover initColor={initBgColor} btnText='Background Color' onSave={setBgColor}/>*/}
    {/*<ColorPopover initColor={initColor} btnText='Text Color' onSave={setColor}/>*/}
    {/*<PropSlider heading='Row Corners' onChange={setBorderRadius} min={0} max={30} valSuffix='px'/>*/}
    <PropSlider heading='Size' onChange={setSize}
                valEnum={['sm', 'md', 'lg']}/>
    <PropSlider heading='Variant' onChange={setVariant}
                valEnum={['line', 'enclosed', 'enclosed-colored', 'soft-rounded', 'solid-rounded', 'unstyled']}/>
    <PropSlider heading='Color Scheme' onChange={setColorScheme}
                valEnum={[
                  'whiteAlpha', 'blackAlpha', 'gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'linkedin', 'facebook', 'messenger', 'whatsapp', 'twitter', 'telegram'
                ]}/>
    <Tabs size={size} colorScheme={colorScheme} variant={variant} isFitted sx={{w:'100%'}}>
      <TabList><Tab>Left Tab</Tab><Tab>Right Tab</Tab></TabList>
    </Tabs>

  </VFlex>)
}

const AcctCardSpec = ({onChange=(v)=>{}, ...rest})=>{
  const initBorderRadius = useAuth(s=>getPath('customTpl.acctCardSpec.borderRadius', s.user))
  const initBgColor = useAuth(s=>getPath('customTpl.acctCardSpec.bgColor', s.user))
  const initColor = useAuth(s=>getPath('customTpl.acctCardSpec.color', s.user))
  const initShadow = useAuth(s=>getPath('customTpl.acctCardSpec.shadow', s.user))

  const [borderRadius, setBorderRadius] = useState(initBorderRadius)
  const [bgColor, setBgColor] = useState(initBgColor)
  const [color, setColor] = useState(initColor)
  const [shadow, setShadow] = useState(initShadow)

  useEffect(()=>{onChange({borderRadius, color, bgColor,shadow})}, [])
  useEffect(()=>{
      onChange({ borderRadius, color, bgColor,shadow })
    }, [ borderRadius, color, bgColor,shadow ]
  )
  const sxCard={bgColor:'gray.200',borderRadius:'7px', h:'50px', wordWrap:'break-all'}

  return (<VFlex gap={2}>
    <ColorPopover initColor={initBgColor} btnText='Background Color' onSave={setBgColor}/>
    <ColorPopover initColor={initColor} btnText='Text Color' onSave={setColor}/>
    <PropSlider heading='Row Corners' onChange={setBorderRadius} min={0} max={30} valSuffix='px'/>
    <PropSlider heading='Shadow' onChange={setShadow}
                valEnum={['none', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'dark-lg', 'outline', 'inner']}/>
    <Center sx={{bgColor, borderRadius, color, shadow, w:'90px', h:'40px'}}>Preview</Center>
  </VFlex>)
}

export default function TemplateCreator({onClose}){

  const [backgroundSpec, setBackgroundSpec] = useState(specDefaults.backgroundSpec)
  const [headlinesSpec, setHeadlinesSpec] = useState(specDefaults.headlinesSpec)
  const [tabsSpec, setTabsSpec] = useState(specDefaults.tabsSpec)
  const [acctCardSpec, setAcctCardSpec] = useState(specDefaults.acctCardSpec)

  function handleSave() {
    useAuth.getState()._updatePaths({
      "customTpl.backgroundSpec":backgroundSpec,
      "customTpl.headlinesSpec":headlinesSpec,
      "customTpl.tabsSpec":tabsSpec,
      "customTpl.acctCardSpec":acctCardSpec,
    }).catch()
  }

  function AccordionBtn ({Icon, text}) {
    return (<h2><AccordionButton><HFlex gap={2} flex={1}>
        <Icon size='25'/><Flex flexGrow={1}>{text}</Flex><AccordionIcon />
      </HFlex></AccordionButton></h2>)
  }

  return (
    <VFlex border='1px solid gray' bgColor='gray.50' borderRadius='8px' p={3} my={3} gap={3} w={['348px','400px',]}>
      <HFlexSC justify='space-between' mb={1}>
        <Heading size='md' my={1}>Create a Theme</Heading><Button size='sm' onClick={onClose}>X</Button>
      </HFlexSC>
      <Accordion allowToggle defaultIndex={2}>

        <AccordionItem>
          <AccordionBtn Icon={MdGradient} text='Background'/>
          <AccordionPanel pb={4}>
            <BackgroundSpec onChange={setBackgroundSpec}/>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionBtn Icon={TbMessageChatbot} text='Photo, Name, & Greeting'/>
          <AccordionPanel pb={4}>
            <HeadlinesSpec onChange={setHeadlinesSpec}/>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionBtn Icon={CgTab} text='Tabs'/>
          <AccordionPanel pb={4}>
            <TabsSpec onChange={setTabsSpec}/>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionBtn Icon={FaBitcoin} text='Account Cards'/>
          <AccordionPanel pb={4}>
            <AcctCardSpec onChange={setAcctCardSpec}/>
          </AccordionPanel>
        </AccordionItem>

      </Accordion>

      <Button w='100%' variant='solidBlue' onClick={handleSave}>Save Custom Template</Button>
    </VFlex>
  )
}
