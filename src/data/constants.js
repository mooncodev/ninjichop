export const SUPPORTED_CHAIN_IDS = [1, 4, 3, 42, 5, 56, 97, 1337]
export const desktopSidebarWidth = '20px'
const {NODE_ENV,REACT_APP_SERVER_ORIGIN_DEV,REACT_APP_SERVER_ORIGIN_PROD} = process.env
export const PHASE=3;
export const clientOrigin=window.location.origin;
// export const serverOrigin='http://coinstarz.com:5000';
export const serverOrigin = (NODE_ENV==='development') ? REACT_APP_SERVER_ORIGIN_DEV : REACT_APP_SERVER_ORIGIN_PROD;
// export const serverOrigin='http://localhost:5000';

// export const clientOrigin='http://localhost:3002';
// export const clientOrigin='http://coinstarz.com';

//matching def in csz-api/models/UserProfile.js
export const enumCurrencies = [
  {watchType:'bitcoin', label:'Bitcoin', symbol: 'BTC', decimals:'8'},
  {watchType:'ethereum', label:'Ethereum', symbol: 'ETH', decimals:'18'},
  {watchType:'ethereumToken', label:'Ethereum Token', symbol: '', decimals:''},
  {watchType:'binanceCoin', label:'Binance Coin', symbol: 'BNB', decimals:'18'},
  {watchType:'cardano', label:'Cardano', symbol: 'ADA', decimals:'6'},
  {watchType:'ethereumToken', label:'ETH: Tether', symbol:'USDT', decimals:'6'},
  {watchType:'ethereumToken', label:'ETH: USD Coin', symbol:'USDC', decimals:'6'},
]

export const enumSocLinksLabels = [
  'Email', 'Instagram', 'Twitter','Twitch',
  'Facebook', 'Spotify', 'Opensea', 'Telegram', 'Soundcloud',
]
export const enumSocLinksIconSets = [
  'Color', 'FlatOutline', 'FlatSolid',
]
