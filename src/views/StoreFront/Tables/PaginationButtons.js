import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Icon, Input, Tag, TagLabel, TagLeftIcon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, } from '@chakra-ui/react';
import {
  BiChevronLeft,
  BiChevronRight,
  BiCurrentLocation,
  BiFirstPage,
  BiLastPage
} from 'react-icons/bi';
import {HFlex} from "../../bits/UtilityTags";

export function PaginationButtons({
  table,
  ...rest
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  useLayoutEffect(()=>{
    if (showInput && inputRef.current){
      inputRef.current.focus();
    }
  },[showInput]);

  useEffect(()=>{
    if (showInput && inputRef.current) {
      // if(e.target.value===null){return}
      let v = Number(inputRef.current.value);
      let rvIdx, rvDispVal
      const max = table.getPageCount();
      if(v>max){v=max}else if(v<1){v=1}
      table.setPageIndex(v-1);
      setInputVal(v.toString());
    }
  },[inputVal]);

  return (
    <HFlex mt={1} gap={1}>
      <Button h={6}
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
      >
        <Icon as={BiFirstPage} boxSize={6}/>
      </Button>
      <Button h={6}
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
      >
        <Icon as={BiChevronLeft} boxSize={6}/>
      </Button>
      <Tag
        onClick={()=>setShowInput(true)}
        onBlur={()=>setShowInput(false)}
      >
        <TagLeftIcon as={BiCurrentLocation}/>
        {showInput ? (
            <NumberInput
              allowMouseWheel
              w='60px'
              size='xs'
              min={1}
              max={table.getPageCount()}
              onChange={v => setInputVal(v.toString())}
            >
              <NumberInputField
                ref={inputRef}
                placeholder='Go to'
                onBlur={()=>setShowInput(false)}
                value={inputVal}
              />
              <NumberInputStepper width={3}>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
        ) : (
          <TagLabel>
        {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
          </TagLabel>
          ) }
      </Tag>
      <Button h={6}
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
      >
        <Icon as={BiChevronRight} boxSize={6}/>
      </Button>
      <Button h={6}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
      >
        <Icon as={BiLastPage} boxSize={6}/>
      </Button>
    </HFlex>
  );
}

