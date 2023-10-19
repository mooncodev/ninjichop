import { createIcon } from "@chakra-ui/icons";
import { Box, chakra, Icon, Image } from '@chakra-ui/react';
import React from 'react';
// froge-title-logo-ff-color-512.png
// froge-logo-512.png

export const FrogeTitleLogoColorPng = (rest)=>(<Image {...rest} src={'assets/logos/froge-title-logo-ff-color-512.png'}/>)

import IconFroge from 'assets/logos/froge-logo.svg'
import IconUniswap from 'assets/logos-other/uniswap-logo.png'
import Icon1inch from 'assets/logos-other/1inch-logo.png'
import IconPancakeswap from 'assets/logos-other/pancakeswap-vector-1024.png'
import IconWhitebit from 'assets/logos-other/Discord-Logo-Color.svg'
import IconTelegram from 'assets/logos-other/telegram-logo.svg'
import IconEthscan from 'assets/logos-other/etherscan-logo-circle.svg'
import IconBscscan from 'assets/logos-other/bscscan-logo-circle.svg'
// import IconKektools from ''
import IconDextools from 'assets/logos-other/dextools-logo.png'
import IconMedium from 'assets/logos-other/Medium-Logo-Black-RGB.svg'
import IconTwitter from 'assets/logos-other/Twitter-logo-circle-blue.svg'
import IconInstagram from 'assets/logos-other/instagram-logo.png'
import IconReddit from 'assets/logos-other/reddit-logo.png'
import IconYoutube from 'assets/logos-other/youtube-logo.png'
import IconLinkedin from 'assets/logos-other/LinkedIn.png'
import IconFacebook from 'assets/logos-other/facebook-logo.svg'
import IconDiscord from 'assets/logos-other/Discord-Logo-Color.svg'
import IconCmc from 'assets/logos-other/Discord-Logo-Color.svg'
import IconCoingecko from 'assets/logos-other/Discord-Logo-Color.svg'
import IconNomics from 'assets/logos-other/Discord-Logo-Color.svg'
import FaEmail from 'assets/logos-other/Discord-Logo-Color.svg'
import { HiOutlineMail } from 'react-icons/hi';
import FrogeLogoSvg from './logos/froge-logo.svg';

export const links = {
  Uniswap:{               icon:IconUniswap, url:"https://app.uniswap.org/#/swap?outputCurrency=0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1"  },
  OneInch:{               icon:Icon1inch, url:"https://app.1inch.io/#/1/swap/ETH/0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1"  },
  PancakeSwap:{           icon:IconPancakeswap, url:"https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x93ab30c08421750d5c7993fb621c6ff32fe3f89e"  },
  Whitebit:{              icon:IconWhitebit, url:"https://whitebit.com/trade/FROGE_USDT"  },
  FrogeOfficialSite:{          icon:IconFroge, url:"https://frogefinance.com"  },
  FrogeDashboardApp:{          icon:IconFroge, url:"https://frogedashboard.app"  },
  FrogeTgCommunity:{           icon:IconTelegram, url:"https://t.me/FrogeFinanceOfficial"  },
  FrogeTgAnnounce:{            icon:IconTelegram, url:"https://t.me/frogeannouncements"  },
  FrogeShop:{             icon:IconFroge, url:"https://froge.shop"  },
  FrogeStudio:{            icon:IconFroge, url:"https://www.frogememes.com"  },
  FrogeCommSite:{         icon:IconFroge, url:"https://froge.community"  },
  FrogeAdminEmail:{         icon:HiOutlineMail, url:"mailto:admin@froge.fi"  },
  FrogeFAQs:{            icon:IconFroge, url:"https://froge.guide"  },
  FrogeInvaders:{         icon:IconFroge, url:"https://froge.live"  },
  Etherscan:{             icon:IconEthscan, url:"https://etherscan.io/token/0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1"  },
  BscScan:{               icon:IconBscscan, url:"https://www.bscscan.com/token/0x93ab30c08421750d5c7993fb621c6ff32fe3f89e"  },
  // Kektools:{              icon:IconKektools, url:"https://kek.tools/t/0x5fa54fddf1870c344dbfabb37dfab8700ec0def1?pair=0x5119155c5644c31c94f2fbaf0ccc79c4f92fb686"  },
  Dextools:{              icon:IconDextools, url:"https://www.dextools.io/app/ether/pair-explorer/0x5119155c5644c31c94f2fbaf0ccc79c4f92fb686"  },
  Medium:{                icon:IconMedium, url:"https://frogex.medium.com/"  },
  Twitter:{               icon:IconTwitter, url:"https://twitter.com/FrogeFi"  },
  Instagram:{             icon:IconInstagram, url:"https://instagram.com/frogearmy"  },
  Reddit:{                icon:IconReddit, url:"https://reddit.com/r/FrogeFinance/"  },
  Youtube:{               icon:IconYoutube, url:"https://www.youtube.com/channel/UCifr_KT59UfBMU8MAJyj-Jg"  },
  LinkedIn:{              icon:IconLinkedin, url:"https://www.linkedin.com/company/froge-finance/"  },
  Facebook:{              icon:IconFacebook, url:"https://www.facebook.com/froge.finance/"  },
  Discord:{               icon:IconDiscord, url:"https://discord.gg/KjCCcuWkVF"  },
  CoinMarketCap:{         icon:IconCmc, url:"https://coinmarketcap.com/currencies/froge-finance/"  },
  Coingecko:{             icon:IconCoingecko, url:"https://www.coingecko.com/en/coins/froge-finance"  },
  Nomics:{                icon:IconNomics, url:"https://nomics.com/assets/froge-froge-finance"  }
};

export const ICON = ({size=['30px','30px'], img, })=>{
  return (<Box sx={{ width:size[0],height:size[1],backgroundImage: img,
    backgroundRepeat: 'no-repeat',backgroundPosition: '50% 50%',backgroundSize: 'contain',
  }} />)
}

export const icons = {
  Uniswap: ICON({img:IconUniswap}),
  OneInch: ICON({img:Icon1inch}),
  PancakeSwap: ICON({img:IconPancakeswap}),
  Whitebit: ICON({img:IconWhitebit}),
  FrogeOfficialSite: ICON({img:IconFroge}),
  FrogeDashboardApp: ICON({img:IconFroge}),
  FrogeTgCommunity: ICON({img:IconTelegram}),
  FrogeTgAnnounce: ICON({img:IconTelegram}),
  FrogeShop: ICON({img:IconFroge}),
  FrogeStudio: ICON({img:IconFroge}),
  FrogeCommSite: ICON({img:IconFroge}),
  FrogeAdminEmail: ICON({img:HiOutlineMail}),
  FrogeFAQs: ICON({img:IconFroge}),
  FrogeInvaders: ICON({img:IconFroge}),
  Etherscan: ICON({img:IconEthscan}),
  BscScan: ICON({img:IconBscscan}),
  Dextools: ICON({img:IconDextools}),
  Medium: ICON({img:IconMedium, size:['120px','28px']}),
  Twitter: ICON({img:IconTwitter}),
  Instagram: ICON({ img: IconInstagram }),
  Reddit: ICON({ img: IconReddit }),
  Youtube: ICON({ img: IconYoutube }),
  LinkedIn: ICON({ img: IconLinkedin }),
  Facebook: ICON({ img: IconFacebook }),
  Discord: ICON({ img: IconDiscord }),
  CoinMarketCap: ICON({ img: IconCmc }),
  Coingecko: ICON({ img: IconCoingecko }),
  Nomics: ICON({ img: IconNomics }),
};
