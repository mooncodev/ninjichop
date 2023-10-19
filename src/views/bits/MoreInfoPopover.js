import {
  HStack,
  Popover, Portal,
  PopoverAnchor, PopoverArrow,
  PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverTrigger, Icon
} from '@chakra-ui/react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useRef } from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import { TextXs } from './UtilityTags.js';

export function MoreInfoPopover(props) {
  const {children} = props;

  return (
    <Popover
      isLazy
      lazyBehavior="unmount"
      placement="bottom"
      closeOnBlur={true}
    >
        <PopoverTrigger>
          <InfoIcon/>
        </PopoverTrigger>
      <Portal>
      <PopoverContent>
        <PopoverArrow/>
        <PopoverCloseButton/>
        <br/>
        <PopoverBody>
          <TextXs>{children}</TextXs>
        </PopoverBody>
      </PopoverContent></Portal>
    </Popover>
  )
}
