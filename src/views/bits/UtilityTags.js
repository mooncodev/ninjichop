import { Button, chakra, Flex, Icon, IconButton, Link, Text, VStack, } from '@chakra-ui/react';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

import useCopyToClipboard from 'hooks/useCopyToClipboard.js';
import { MdCopyAll, MdOutlineCheckCircle, MdOutlineHistory } from 'react-icons/md';
import { fira, mont } from '../../theme/foundations/fonts.js';
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';

export function BtnCopyToClipboard({ code }) {
  // isCopied is reset after 3 second timeout
  const [isCopied, handleCopy] = useCopyToClipboard();
  return (
    <button onClick={() => handleCopy(code)}>
      {isCopied ? <MdOutlineCheckCircle /> : <MdCopyAll />}
    </button>
  );
}

export function BtnReadMore({onClick=()=>{}}) {
  const textColor = "white"

  return (
    <Button
      onClick={()=>onClick()}
      p="0px"
      variant="no-hover"
      bg="transparent"
      my={{ sm: "1.5rem", lg: "0px" }}
    >
      <Text
        fontSize="sm"
        color={textColor}
        fontWeight="bold"
        cursor="pointer"
        transition="all .5s ease"
        my={{ sm: "1.5rem", lg: "0px" }}
        _hover={{ me: "4px" }}
      >
        Read on
      </Text>
      <Icon
        as={BsArrowRight}
        boxSize="20px"
        fontSize="2xl"
        transition="all .5s ease"
        mx=".3rem"
        cursor="pointer"
        pt="4px"
        _hover={{ transform: "translateX(20%)" }}
      />
    </Button>
  );
}

export const IBtn = ({ onClick, I, scheme, ...rest }) => {
  return <IconButton onClick={onClick} aria-label="" icon={<I/>} colorScheme={scheme} {...rest}/>;
};
/** @example <ExtLinkBtn href='' text='' /> */
export const ExtLinkBtn = ({ href, text, dest, children, ...rest }) => {
  if(dest) {
    href = {
      'testNums': 'https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=elements&element=payment#test',
    }[dest];
  }
  return (
    <Link href={href} color="blue.500" bgColor="blue.100" p={1}
          borderRadius={7} isExternal>{text?text:children} <ExternalLinkIcon ml="2px"/></Link>
  );
};
/** @example <ExtLinkBtn href='' text='' /> */
export const TestDetails = ({ href, text, dest, ...rest }) => {
  function fillCard(){
    let inputElement = document.getElementById("inputId");

// Focus on the input element
    inputElement.focus();

// Simulate keypress events
    let event = new Event("keypress");
    event.key = "a";
    event.code = "KeyA";
    event.charCode = "97";
    inputElement.dispatchEvent(event);


    document.getElementById('Field-numberInput').setAttribute('value','4000 0000 0000 9995')
    document.getElementById('Field-expiryInput').setAttribute('value','0124')
    document.getElementById('Field-cvcInput').setAttribute('value','343')
    document.getElementById('Field-postalCodeInput').setAttribute('value','28227')
    //us bank acct tab
  }
  function fillEmailName(){
    //us bank acct tab
    document.getElementById('Field-emailInput').setAttribute('value','jb32442876@gmail.com')
    document.getElementById('Field-nameInput').setAttribute('value','Joe Berger')
  }
  function selCopy(e){
    navigator.clipboard.writeText(e.currentTarget.textContent)
    selectElmtContents(e.currentTarget)
  }
  const R = (<tr/>)
  const D1 = ({children})=>(<td colSpan={1} onClick={selCopy}>{children}</td>)
  const D2 = ({children})=>(<td colSpan={2} onClick={selCopy}>{children}</td>)
  return (
    <VStack>
      <HFlex>
        <ExtLinkBtn text="test nums" dest='testNums'/>
        {/* <BtnXs onClick={fillCard}>Card</BtnXs> */}
        {/* <BtnXs onClick={fillEmailName}>EmailName</BtnXs> */}
      </HFlex>
      <chakra.table sx={{ ...fira, fontSize:'11px' }}><tbody>
        <tr><td>Account #</td><td>BSB #</td><td>Type</td><td>Result</td></tr>
        <tr><D1>900123456</D1><D1>000-000</D1><td>becs dir debit</td><td>success</td></tr>
        <tr><D1>111111113</D1><D1>000-000</D1><td>becs dir debit</td><td>account_closed</td></tr>
        <tr><D2>4242 4242 4242 4242</D2><td>card</td><td>success</td></tr>
        <tr><D2>4000 0025 0000 3155</D2><td>card</td><td>req auth</td></tr>
        <tr><D2>4000 0000 0000 9995</D2><td>card</td><td>insufficient_funds</td></tr>
        <tr><D2>4000 0000 0000 0341</D2><td>card</td><td>attach->declined</td></tr>
      </tbody></chakra.table>
    </VStack>
  );
};
export const BtnXs = ({children,sx={}, ...rest})=>(<Button
    sx={{
      w: 'min-content',
      fontSize:'9px',
      p: '7px',
      my: '2px',
      h: 'min-content',
      ...sx,
    }} {...rest}>{children}</Button>
)

export const BtnFrMap = ({children,...rest})=>(
  <chakra.button {...rest}
          sx={{
            w: 'min-content',
            ...mont.md.sm,
            p: '7px',
            h: 'min-content',
          }}>{children}</chakra.button>
)

export const BtnBrandIcon = ({type,children,...rest})=> {
  const _icon = {
    burger: HamburgerIcon,
    history: MdOutlineHistory,
  }[type]
  return (<Button as={_icon} id="BtnBrandIcon"
                  __css={{
                    color: 'global.bg',
                    bgColor: 'brand.green',
                    h: '2rem',
                    w: 'auto',
                    p: '3px',
                    borderRadius: '7px',
                  }} {...rest}><MdOutlineHistory>{children}</MdOutlineHistory></Button>);
}

export const VFlex = (p)=>(
  <Flex display='flex' direction="column" align="stretch" justify='stretch' {...p} />)
export const VFlexCC = (p)=>(
  <Flex display='flex' direction="column" align="center"  justify='center' {...p} />)
export const VFlexCS = (p)=>(
  <Flex display='flex' direction="column" align="center"  justify='stretch' {...p} />)
export const VFlexSC = (p)=>(
  <Flex display='flex' direction="column" align="stretch" justify='center' {...p} />)
export const HFlex = (p)=>(
  <Flex display='flex' direction="row" justify="stretch" align='stretch' {...p} />)
export const HFlexCC = (p)=>(
  <Flex display='flex' direction="row" justify="center"  align='center' {...p} />)
export const HFlexCS = (p)=>(
  <Flex display='flex' direction="row" justify="center"  align='stretch' {...p} />)
export const HFlexSC = (p)=>(
  <Flex display='flex' direction="row" justify="stretch" align='center' {...p} />)

export const TextXs = (props)=>(<Text fontSize="xs" color="gray.400" {...props} />)
export const S = (props)=>(<chakra.span {...props} />)
export const P = (props)=>(<Text {...props} />)


export const sxGlassBg = {
  backgroundColor: "transparent",
  backdropFilter: "saturate(180%) blur(5px)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "7px",
  boxShadow: '4px 4px 19px 0 rgba(0, 0, 0, 0.2)'
}
export const sxGlassBg2 = {
  'background': 'rgba(0, 0, 0, 0.15)',
  'borderRadius': '7px',
  backdropFilter: "saturate(180%) blur(5px)",
  border: '1px solid rgba(30, 30, 60, 1)',
  fontWeight:200,
  boxShadow: '4px 4px 19px 0 rgba(0, 0, 0, 0.2)'
}

const cssNeuMoBtn_clear = {
  borderRadius:'13px',
  background:'linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(150,150,150,0.20))',
  boxShadow: '8px 8px 9px 0 rgba(0, 0, 0, 0.15),' +
    '-4px -4px 12px 0 rgba(215, 215, 215, 0.1)',
}

export function selectElmtContents(elmt) {
  const range = document.createRange();
  range.selectNodeContents(elmt);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
