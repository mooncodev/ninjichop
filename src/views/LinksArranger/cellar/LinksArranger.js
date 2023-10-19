import { Link } from "react-router-dom";
import { VFlex } from 'views/bits/UtilityTags.js';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import {useCallback, useState} from "react";
import {Box, Button } from "@chakra-ui/react";
import {DraggableItem} from "./DraggableItem";
const style = {
  width: 400,
}
export default function LinksArranger() {

  const [cards, setCards] = useState([
    {id: 1, currency: 'Bitcoin (BTC)',     addr:'rf483y9c4bryf39',show:true, hitCount: 0},
    {id: 2, currency: 'Ethereum (ETH)',    addr:'5gv54gvrc344gv5',show:true, hitCount: 0},
    {id: 3, currency: 'Binance coin (BNB)',addr:'fx34fx4gx45xg54',show:true, hitCount: 0},
    {id: 4, currency: 'Cardano (ADA)',     addr:'m89l8rl9m8l9m98',show:true, hitCount: 0},
    {id: 5, currency: 'Tether (USDT)',     addr:'hddhhhd9f3v9j9c',show:true, hitCount: 0},
    {id: 6, currency: 'USD Coin (USDC)',   addr:'22m2m4m42mr24m2',show:true, hitCount: 0},
  ])
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])
  const renderCard = useCallback((card, index) => {
    return (
      <DraggableItem
        key={card.id}
        index={index}
        id={card.id}
        currency={card.currency}
        addr={card.addr}
        show={card.show}
        hitCount={card.hitCount}
        moveCard={moveCard}
      />
    )
  }, [])

  return (
    <VFlex>
      <Button variant='solidBlue' color='white'>+ Add Address</Button>
      <Box>
        <DndProvider backend={HTML5Backend}>
          <Box style={style}>{cards.map((card, i) => renderCard(card, i))}</Box>

        </DndProvider>
      </Box>

    </VFlex>
  )
}
