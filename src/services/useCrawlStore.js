import { create } from 'zustand';
import React from 'react';
import axios from 'axios';

export const epoch = {
  now: ()=>Math.floor(Date.now()/1000),
  diff: (epoch)=>Math.floor(Date.now()/1000)-epoch,
}

export const useCrawlStore = create((set,get) => ({
  ethPrice: '-',
  ethPriceTS: '-',
  fetch_ethPrice: async (state) => {
    if(epoch.diff(get().ethPriceTS) < 5){
      console.log('too soon to update ethPrice');
      return get().ethPrice;
    }
    set({ethPriceTS: epoch.now()});
    console.log('OK updating ethPrice')
    const res = await axios('/api/etherscan?method=ethPrice')
    if(res.data) {
      set({ethPrice: res.data});
    }
    return get().ethPrice
  },
}))
