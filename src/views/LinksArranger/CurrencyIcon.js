import React from "react";
import {Image} from "@chakra-ui/react";
import BTCpng from "../../assets/logos-other/bscscan-logo.png";
import ETHpng from "../../assets/logos-other/tg-channel.png";
import BNBpng from "../../assets/logos-other/twitter-logo.png";
import ADApng from "../../assets/logos-other/LinkedIn.png";
import USDTpng from "../../assets/logos-other/dextools-logo.png";
import USDCpng from "../../assets/logos-other/discord-logo.png";

export default function CurrencyIcon({ symbol }){
  const isrc = {
    'Bitcoin (BTC)': BTCpng,
    'Ethereum (ETH)': ETHpng,
    'Binance coin (BNB)': BNBpng,
    'Cardano (ADA)': ADApng,
    'Tether (USDT)': USDTpng,
    'USD Coin (USDC)': USDCpng,
  }[symbol]
  return (
    <Image src={isrc} sx={{
      border: '1px solid gray',
      borderRadius:'50px',
      w:'20px',
      h:'20px',
    }}/>
  );
}
