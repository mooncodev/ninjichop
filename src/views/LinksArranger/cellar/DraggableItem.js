import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {RxDragHandleDots2} from "react-icons/rx";
import {HFlexSC, VFlex} from "../bits/UtilityTags";
import {BsInfoCircle} from "react-icons/bs";
import {Box, HStack} from "@chakra-ui/react";
import {FaRegEye} from "react-icons/fa";
import {TbTarget} from "react-icons/tb";
const style = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export const ItemTypes = {
  CARD: 'card',
}

export const DraggableItem = (
  { provided, snapshot, currency, addr, show, hitCount, index, moveCard }
) => {
  return (
    <HStack justify={'space-between'}
              style={{ ...style }}>
      <BsInfoCircle/>
      <VFlex>
        <Box fontWeight='bold'>{currency}</Box>
        <Box>{addr}</Box>
      </VFlex>
      <Box><FaRegEye color={show?'green':'red'} onClick={()=>{}}/></Box>
      <Box><TbTarget/>{String(hitCount)}</Box>
      <Box><RxDragHandleDots2 style={{backgroundColor:'teal'}}/></Box>
    </HStack>
  )
}
