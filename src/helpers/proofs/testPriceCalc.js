const {k0,num,sEthToWei,last4,_toBN,_toHex,inTenMinutes,
  sAdd,sSub,sMul,sDiv,sAddRay,_Add,_Sub,_Mul,_Div,_AddRay,
  sRnd,sAbs,sPow,sFla,sExp,sHR,hrExp, sIsEq} = require("../math/zmath");
const [__,__E] = [console.log,console.error];
const weiToUSD = (inputWei)=>{
  let ethPrice = '2660';
  let weiPrice = sExp(ethPrice,-18);
  return '$'+sRnd(sMul(sAbs(inputWei), weiPrice),-18)
}
let rsvWETH=sExp('20',18);
let rsvFROGEX=sExp('20',18);
//WETH 20000000000000000000
//FROGEX 6700000000000000000
let amtFrogex = sExp('1_000_000_000',9);//"1" frogex
let ethOut = getAmountOut(amtFrogex,rsvFROGEX,rsvWETH);
let priceOf1FrogeX = weiToUSD(ethOut);
// __(priceOf1FrogeX)

function getAmountOut(amountIn, reserveIn, reserveOut)  {//((x^fee * Y) / (X + x^fee)
  let amountInWithFee = _Mul(amountIn,997);
  let numerator = _Mul(amountInWithFee,reserveOut);
  let denominator = _Add(_Mul(reserveIn,1000),amountInWithFee);
  let amountOut = _Div(numerator, denominator);
  return amountOut;
}

let sub = sSub('376353708374310181692',
               '365353708374310181692')

// __('sub: ',sub)
// debugger;
