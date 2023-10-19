import {
  Button,
  Popover, PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader, PopoverTrigger,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BtnXs, TextXs } from './UtilityTags.js';
import { useFxStore } from 'services/index.js';

export default function PopoverFXGetConfig() {

  const _getConfigLabels = useFxStore(s=>s.fxGetConfigRaw)

  const GetConfig = ()=>(<>{_getConfigLabels.map((v,i)=>(<TextXs key={v}>{v}</TextXs>))}</>)

  return (
    <Popover>
      <PopoverTrigger>
        <Button>FrogeX Settings</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>FrogeX Settings Verbatim</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <GetConfig/>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
