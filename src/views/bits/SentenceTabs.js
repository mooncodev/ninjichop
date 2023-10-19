import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import React from 'react';
import { S, TextXs } from './UtilityTags.js';
import { mont } from '../../theme/foundations/fonts.js';

const SentenceTabsStyleConfig = {
  parts: ['SentenceTabs'],
  baseStyle: {
    SentenceTabs:{
      position: "relative",
      width: "345px",
      height: 'fit-content',
      px: "1.2rem",
      pt: "0",
      pb: "1.2rem",
      gap:'5px',
      // minWidth: "300px",
      // maxWidth: "360px",
      // wordBreak: "break-all",
      backgroundColor: 'global.panel',
      borderRadius:'panelsRadius',
      backgroundClip: "border-box",
      overflow:'auto',
    },
  },
  sizes: {
    sm: {
      SentenceTabs:{},
    },
    md: {
      SentenceTabs:{},
    },
  },
  variants: {
    alignCenter: {
      SentenceTabs:{},
    },
  },
  defaultProps: {
  },
};

export function SentenceTabs({ sentence,panelContents,id,...rest }) {
  const noMarg = {marginStart:'0', marginInline:'0',paddingInline:'0',}
  const sentenceBase = {
    bgColor:'bog.600', borderRadius:'7px',
    textAlign: 'center',
    display:'block',
    color:'bog.200',
  }
  const allText = {
  }
  const links = {
    ...noMarg, ...allText,
    display:'inline-block',
    color: 'bog.400',
    padding:'0 .2rem',
    borderRadius:'7px',
    textDecor:'underline',
  }
  const linksSelected = {
    color: 'bog.200',
    bg: 'bog.700'
  }
  const panelBase = {
    bgColor:'bog.600', borderRadius:'7px',
    maxH:'17rem',overflowY:'auto',
  }
  const panelTitle = {
    ...mont.lt.sm
  }
  const panelBody = {
    ...mont.md.md
  }
  const [tabIndex, setTabIndex] = React.useState(0)
  const onClickTab = (elIdx)=>{
    // console.log(id,`(idx: ${tabIndex} elIdx: ${elIdx})`)
    if(elIdx===tabIndex){setTabIndex(0)
    }else{setTabIndex(elIdx)}
  }

  return (
    <Tabs  index={tabIndex}
           isLazy={true} lazyBehavior={'unmount'}
           variant='soft-rounded' {...rest}>
      <TabList style={sentenceBase}>
        <Tab display='none'>null</Tab>
          {(()=>{
            let elIdxCtr = 1
            return sentence.map((v,i)=>{
            if(v.substr(0,2)==="##"){
              const elIdx = elIdxCtr;elIdxCtr++;
              return (<Tab sx={links} _selected={linksSelected} aria-selected='false'
                           onClick={()=>onClickTab(elIdx)} key={i}>{v.slice(2)}</Tab >)
            }else{
              return (<S style={allText} key={i}>{v}</S>)
            }
          })})()}
      </TabList>
      <TabPanels sx={panelBase}>
        <TabPanel display='none'>null</TabPanel>
        {Object.values(panelContents).map((v,i)=>
          <TabPanel key={i}>{v.title && (
            <TextXs sx={panelTitle} as={'h4'}>{v.title}</TextXs>)}
            <VStack sx={panelBody} >{v.body}</VStack>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}

export const SentenceTabsComponent = {
  components: {
    SentenceTabs: SentenceTabsStyleConfig,
  },
};


