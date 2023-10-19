// const {__,} = require('./logUtils');
const hre = require("hardhat");
const {ethers} = hre;
const __ = console.log;
const _ = require('lodash');
const {
  uint256max,pow2_128,jsMaxSafeInt,gLimitRopsten,
  num,sEthToWei,last4,_toBN,_toHex,inTenMinutes,
  sAdd,sSub,sMul,sDiv,sAddRay,_Add,_Sub,_Mul,_Div,_AddRay,sRnd,sAbs,sPow,
  sFla,sExp,sHR,hrExp,sIs,sIs0,_F,
} = require('../util/static/mathUtils');
let _isExcludedFromFees = {'flowx':1,'aaaa':1}
let ethToUSD = '4040',frogeToUSD = '0.000004487';

// let s1 = solScaleToPcts()
// debugger;
let amts = {
  fx1:     sExp(1,9),
  fx10k:   sExp(10_000,9),
  fx1mn:   sExp(1_000_000,9),
  fx1bn:   sExp(1_000_000_000,9),
  fx4bn:   sExp(4_000_000_000,9),
  fx4p6bn: sExp(4_600_000_000,9),
  eth2:    sExp(2,18),
  eth1:    sExp(1,18),
  ethp01:  sExp(.01,18),
}
let swapGlobal = false;
let FEE_CHTY = [100,100];
let FEE_MKTG = [100,100];
let FEE_LQTY = [100,200];
let FEE_RWDS = [200,400];
let LQTY_PCT_OF_SPLIT_AS_ETH = 5000;//50%
let TOTAL_FEES_BUYS = FEE_CHTY[0] + FEE_MKTG[0] + FEE_LQTY[0] + FEE_RWDS[0];
let TOTAL_FEES_SELLS = FEE_CHTY[1] + FEE_MKTG[1] + FEE_LQTY[1] + FEE_RWDS[1];
let TSPLIT = {CHTY:'0',MKTG:'0',LQTY:'0',RWDS:'0'};
let TOTAL_CIRC_FX = sExp(500_000_000_000,9);//500bn FX;
let mag = '1000000';
let tokenLiquidationThreshold = sExp(1_000_000_000,9);//1mn
let MAX_SELL_LIMIT_AMT = sExp(1000000000,9);//1bn

let bals = {
  flowx: {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',xTS:'0'},
  pair:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  aaaa:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  chty:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  mktg:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h1:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h2:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h3:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h4:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
}
bals.aaaa.fx=TOTAL_CIRC_FX
bals.aaaa.eth=sEthToWei(40)
bals.h1.eth=sEthToWei(40)
bals.h2.eth=sEthToWei(40)
bals.h3.eth=sEthToWei(40)
let userMap = Object.keys(bals).reduce((a,c)=>(a[c]='0',a),{})
let _xbalances = {...userMap};
let _xTotalSupply='0';
let xMagnitude = sPow('2',128);
let xMagdDivPerShare = '0';
let xMagdDivCorrections = {...userMap};//SIGNED - intended to be negative capable
let xClaimedDividends = {...userMap};
let xTotalDividendsDistributed='0';
let xTokenHoldersMap = {keys:[],values:{...userMap},indexOf:{...userMap},inserted:{...userMap}};
let xMinTokenBalForDivs = sExp(100_000_000,9);

SIM_addLiquidity({
  eth:sExp('20',18).toString(),
  fx:sExp(20_000_000_000, 9).toString(),
  user:'aaaa'
});

// simulate airdorp
send(sExp(1_000_000_000,9), 'fx', 'aaaa', 'h1')
send(sExp(1_000_000_000,9), 'fx', 'aaaa', 'h2')
send(sExp(1_000_000_000,9), 'fx', 'aaaa', 'h3')
send(sExp(397_000_000_000,9), 'fx', 'aaaa', 'h4')
// contractReceiveEth(amts.ethp01, 'aaaa')

// __('snapshot0',bals)

market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h1').buy.ethAmountIn(amts.eth1)
market('h2').sell.fxAmountIn(amts.fx1bn)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h3').buy.ethAmountIn(amts.eth1)
market('h2').sell.fxAmountIn(amts.fx1bn)
debugger;
// __('snapshot1',bals)

function fxTransfer(opts){
  let {from, to, inputAmt} = opts;
  let nBuyOrSell = from==='pair'?0:1
  __(`<<fxTransfer>>: from:${opts.from} to:${opts.to}  amountfx:${hrExp(inputAmt,-9)} nBuyOrSell:${nBuyOrSell}`)
  let amount = opts.inputAmt.toString();
  let doLiquidate = !swapGlobal && sIs(bals.flowx.fx,'>',tokenLiquidationThreshold) && nBuyOrSell === 1;

  if(doLiquidate){
    swapGlobal = true;
    __('<doLiquidate>')
    let lqtyTokenHalf = _Div(_Mul(TSPLIT.LQTY,LQTY_PCT_OF_SPLIT_AS_ETH),10000);
    let lqtyEthHalf = _Sub(TSPLIT.LQTY, lqtyTokenHalf);
    let tokensToSwap = _AddRay(TSPLIT.CHTY, TSPLIT.MKTG, lqtyEthHalf, TSPLIT.RWDS);
    let tokenSplitTotal = _AddRay(TSPLIT.CHTY, TSPLIT.MKTG, TSPLIT.LQTY, TSPLIT.RWDS);
    let initialContractEthBal = bals.flowx.eth;
// contract itself sells its tokens and recieves ETH,
    market('flowx').sell.fxAmountIn(tokensToSwap)

// how much ETH did we just swap into?
    let createdEth = _Sub(bals.flowx.eth, initialContractEthBal); //0.1 ETH
    let ETH_SPLIT_CHTY = _Div(_Mul(createdEth, TSPLIT.CHTY), tokenSplitTotal);
    let ETH_SPLIT_MKTG = _Div(_Mul(createdEth, TSPLIT.MKTG), tokenSplitTotal);
    let ETH_SPLIT_LQTY = _Div(_Mul(createdEth, TSPLIT.LQTY), tokenSplitTotal);
    let ETH_SPLIT_RWDS = _Div(_Mul(createdEth, TSPLIT.RWDS), tokenSplitTotal);
    let _totalSplit = _AddRay(ETH_SPLIT_CHTY,ETH_SPLIT_MKTG,ETH_SPLIT_LQTY,ETH_SPLIT_RWDS)
    ETH_SPLIT_RWDS=_Add(ETH_SPLIT_RWDS,_Sub(createdEth,_totalSplit));
    let ethSplitTotal = ETH_SPLIT_CHTY+ETH_SPLIT_MKTG+ETH_SPLIT_LQTY+ETH_SPLIT_RWDS;

    send(ETH_SPLIT_CHTY, 'eth', 'flowx', 'chty')
    send(ETH_SPLIT_MKTG, 'eth', 'flowx', 'mktg')
    // add rewards to dividend pool
    xMagdDivPerShare = _Add(xMagdDivPerShare,
      _Div(_Mul(ETH_SPLIT_RWDS, xMagnitude), bals.flowx.xTS)
    );
    xTotalDividendsDistributed = _Add(xTotalDividendsDistributed, ETH_SPLIT_RWDS);
    SIM_addLiquidity({eth:ETH_SPLIT_LQTY,fx:lqtyTokenHalf, user:'flowx'});
    TSPLIT = {CHTY:'0',MKTG:'0',LQTY:'0',RWDS:'0'};
    swapGlobal = false;
  }

  let doApplyfees = !doLiquidate && !_isExcludedFromFees[from] && !_isExcludedFromFees[to]
  if (doApplyfees) {
    let amountBeforeFees=amount;
    let feeSum = nBuyOrSell===0?TOTAL_FEES_BUYS:TOTAL_FEES_SELLS;
    let feesTarget = sRnd(_Div(_Mul(amount, feeSum),10000));
    //      TSPLIT.CHTY += (feesTarget * (FEE_CHTY[nBuyOrSell]*1000/ totalFeePct)) / 1000;
    TSPLIT.CHTY = _Add(TSPLIT.CHTY, _Div(_Mul(feesTarget, FEE_CHTY[nBuyOrSell]), feeSum));
    TSPLIT.MKTG = _Add(TSPLIT.MKTG, _Div(_Mul(feesTarget, FEE_MKTG[nBuyOrSell]), feeSum));
    TSPLIT.LQTY = _Add(TSPLIT.LQTY, _Div(_Mul(feesTarget, FEE_LQTY[nBuyOrSell]), feeSum));
    TSPLIT.RWDS = _Add(TSPLIT.RWDS, _Div(_Mul(feesTarget, FEE_RWDS[nBuyOrSell]), feeSum));
    let feesActual = _AddRay(TSPLIT.RWDS,TSPLIT.CHTY,TSPLIT.MKTG,TSPLIT.LQTY);
    //give our contract some tokens as a fee
    amount = _Sub(amount, feesActual);
    let feeReport={
      amountBeforeFees:amountBeforeFees,
      feeSum:feeSum,
      feesTarget:feesTarget,
      feesActual:feesActual,
      amountAfterFees:amount,
    }
    __(`<doApplyfees> feeReport: `,feeReport)

    send(feesActual, 'fx', from, 'flowx')
  }
  send(amount, 'fx', from, to)
}
function swapExactETHForFX(user, {ethAmountIn}) {//buy specifying input ETH
  let calcFxAmountOut = _F(SIM_getAmountOut(ethAmountIn,['eth','fx']))
  __(`NEW TX: [${user}] BUYS ${hrExp(calcFxAmountOut,-9)} FX WITH ${hrExp(ethAmountIn,-18)} ETH`)
  fxTransfer({from:'pair',to:user,inputAmt:calcFxAmountOut})
  send(ethAmountIn, 'eth', user, 'pair')
}
function swapETHForExactFX(user, {fxAmountOut}) {//buy specifying desired output FX
  let calcEthAmountIn = _F(SIM_getAmountIn(fxAmountOut,['eth','fx']))
  __(`NEW TX: [${user}] BUYS ${hrExp(fxAmountOut,-9)} FX WITH ${hrExp(calcEthAmountIn,-18)} ETH`)
  fxTransfer({from:'pair',to:user,inputAmt:fxAmountOut})
  send(calcEthAmountIn, 'eth', user, 'pair')
}
function swapExactFXForETH(user, {fxAmountIn}) {//sell specifying input FX
  let calcEthAmountOut = _F(SIM_getAmountOut(fxAmountIn,['fx','eth']))
  __(`NEW TX: [${user}] SELLS ${hrExp(fxAmountIn,-9)} FX FOR ${hrExp(calcEthAmountOut,-18)} ETH`)
  fxTransfer({from:user,to:'pair',inputAmt:fxAmountIn})
  send(calcEthAmountOut,'eth','pair',user)
}
function swapFXForExactETH(user, {ethAmountOut}) {//sell specifying desired output ETH
  let calcFxAmountIn = _F(SIM_getAmountIn(ethAmountOut,['fx','eth']))
  __(`NEW TX: [${user}] SELLS ${hrExp(calcFxAmountIn,-9)} FX FOR ${hrExp(ethAmountOut,-18)} ETH`)
  fxTransfer({from:user,to:'pair',inputAmt:calcFxAmountIn})
  send(ethAmountOut,'eth','pair',user)
}
function __rptTxIO(amountIn, path)  {
  let hrAmt = `${hrExp(amount,type==='buy'?-18:-9)} ${type==='buy'?'weth':'fx'}`
  let hrRv = `${hrExp(returnVal,type==='buy'?-9:-18)} ${type==='buy'?'fx':'weth'}`
  __(`${type} input ${hrAmt}, expected return: ${hrRv}`)
}


function market(user){
  let snap1 = _.cloneDeep(bals);
  let cb = (msg)=>__(`END TX [${user}] ${msg}, diff:`,__getBalsDiff(snap1, bals))
  return {
    buy:{
      ethAmountIn:(amount)=>{
        swapExactETHForFX(user, {ethAmountIn:amount});cb(`buy ethAmountIn: ${hrExp(amount,-18)}`)
      },
      fxAmountOut:(amount)=>{
        swapETHForExactFX(user, {fxAmountOut:amount});cb(`buy fxAmountOut: ${hrExp(amount,-9)}`)
      },
    },
    sell:{
      fxAmountIn:(amount)=>{
        swapExactFXForETH(user, {fxAmountIn:amount});cb(`sell fxAmountIn: ${hrExp(amount,-9)}`)
      },
      ethAmountOut:(amount)=>{
        swapFXForExactETH(user, {ethAmountOut:amount});cb(`sell ethAmountOut: ${hrExp(amount,-18)}`)
      },
    },
  }
}

function __getBalsDiff(snap1, snap2, rv={})  {
  Array.from(Object.entries(snap1)).forEach(([kAcct,oSymbols],i,a)=>{
    Array.from(Object.entries(oSymbols)).forEach(([kSymbol,val],i,a)=>{
      let v1=val,v2=snap2[kAcct][kSymbol];
      if(!_.isEqual(v1,v2)){
        // let chPct1=sRnd(sMul(sDiv(v2,v1),'100'),-3)
        let chPct2=sRnd(sMul(sMul(sSub('1',sDiv(v2,v1)),'100'),-1),-3)
        if(kSymbol==='eth'){v1=hrExp(v1,-18);v2=hrExp(v2,-18)}
        if(['fx','xf','xTS'].includes(kSymbol)){v1=hrExp(v1,-9);v2=hrExp(v2,-9)}
        rv[`${kAcct}.${kSymbol}`] = {
          before:v1, after:v2,
          change:sSub(v2,v1),
          changePct: (sIs0(v1)&&sIs0(v2))?'0'
            :sIs0(v1)?'100':sIs0(v2)?'-100'
              :`${chPct2.indexOf('-')<0?'+':''}${chPct2}%`
              // :`${chPct1},${chPct2}`
        }
      }
    })
  })
  return rv;
}
function SIM_getAmountOut(amountIn, path)  {//((x^fee * Y) / (X + x^fee)
  let [reserveIn,reserveOut]=[bals.pair[path[0]],bals.pair[path[1]]];
  let amountInWithFee = _Mul(amountIn,997);
  let numerator = _Mul(amountInWithFee,reserveOut);
  let denominator = _Add(_Mul(reserveIn,1000),amountInWithFee);
  let amountOut = _Div(numerator, denominator);
  return amountOut;
}
function SIM_getAmountIn(amountOut, path)  {//((x^fee * Y) / (X + x^fee)
  let [reserveIn,reserveOut]=[bals.pair[path[0]],bals.pair[path[1]]];
  let numerator = _Mul(_Mul(reserveIn,amountOut),1000);
  let denominator = _Mul(_Sub(reserveOut,amountOut),997);
  let amountIn = _Add(_Div(numerator,denominator),1);
  return amountIn;
}
function lpSwap(amount, type, user){
  // let expectedReturn = SIM_expectedOut(amount,type)
  let expectedReturn2 = SIM_getAmountOut(amount,['fx','eth'])
  let returnVal = sRnd(expectedReturn2);
  let hrAmt = `${hrExp(amount,type==='buy'?-18:-9)} ${type==='buy'?'weth':'fx'}`
  let hrRv = `${hrExp(returnVal,type==='buy'?-9:-18)} ${type==='buy'?'fx':'weth'}`
  __(`${type} input ${hrAmt}, expected return: ${hrRv}`)
  if(type==='buy'){
    bals.pair.eth = sAdd(bals.pair.eth,amount)
    bals.pair.fx= sSub(bals.pair.fx,returnVal)
    bals[user].fx= sAdd(bals[user].fx,returnVal)
    bals[user].eth= sSub(bals[user].eth,amount)
  }else{
    bals.pair.eth = sSub(bals.pair.eth,returnVal)
    bals.pair.fx= sAdd(bals.pair.fx,amount)
    bals[user].fx= sSub(bals[user].fx,amount)
    bals[user].eth= sAdd(bals[user].eth,returnVal)
  }
}
function send(amount, symbol, from, to){
  bals[from][symbol] = _Sub(bals[from][symbol],amount)
  bals[to][symbol] = _Add(bals[to][symbol],amount)
  if(symbol==='fx'){
    let noRwds=['pair','aaaa','flowx','chty','mktg'];
    if(!noRwds.includes(from)){xSetBalance(from, bals[from][symbol])}
    if(!noRwds.includes(to)){xSetBalance(to, bals[to][symbol])}
  }
}
function contractReceiveEth(amount, from){
  if(sIs(bals.flowx.xTS,'<=','0')){return}
  bals[from].eth = _Sub(bals[from].eth,amount)
  bals.flowx.eth = _Add(bals.flowx.eth,amount)
  xMagdDivPerShare = _Add(xMagdDivPerShare,
    _Div(_Mul(amount, xMagnitude), bals.flowx.xTS)
  );
  xTotalDividendsDistributed = _Add(xTotalDividendsDistributed, amount);
}
function SIM_addLiquidity({eth,fx,user}){
  let snap1 = _.cloneDeep(bals);
  bals.pair.eth=_Add(bals.pair.eth,eth)
  bals.pair.fx=_Add(bals.pair.fx,fx)
  bals[user].eth=_Sub(bals[user].eth,eth)
  bals[user].fx=_Sub(bals[user].fx,fx)
  __(`${user}, SIM_addLiquidity, diff:`,__getBalsDiff(snap1, bals))
}
function xBalanceOf(account){return bals[account].xf;}

function xWithdrawableDividendOf(account){
  return xAccumulativeDividendOf(account) - bals[account].xCD;
}
function xAccumulativeDividendOf(account){
  let f1= _Mul(xMagdDivPerShare,xBalanceOf(account));
  let f2= sAdd(f1,bals[account].xMDC);
  let f3= sDiv(f2,xMagnitude);
  return f3;
}
function _xSetBalance(account, newBalance) {
  let currentBalance = xBalanceOf(account);
  if (sIs(currentBalance, '<', newBalance)) {
    let mintAmount = _Sub(newBalance, currentBalance);
    // _xMint(account, mintAmount);
    bals.flowx.xTS = _Add(bals.flowx.xTS,mintAmount);
    bals[account].xf = _Add(bals[account].xf,mintAmount);
    bals[account].xMDC =
      sSub(bals[account].xMDC, sMul(xMagdDivPerShare, mintAmount));
  }
  else if (sIs(currentBalance, '>', newBalance)) {
    let burnAmount = _Sub(currentBalance, newBalance);
    // _xBurn(account, burnAmount);
    bals.flowx.xTS = _Sub(bals.flowx.xTS,burnAmount);
    bals[account].xf = _Sub(bals[account].xf, burnAmount);
    bals[account].xMDC =
      sAdd(bals[account].xMDC, sMul(xMagdDivPerShare, burnAmount));
  }
}
function xSetBalance(account, newBalance) {
  if (sIs(newBalance, '>=', xMinTokenBalForDivs)) {
    _xSetBalance(account, newBalance);
  } else {
    _xSetBalance(account, 0);
  }
  xProcessAccount(account);
}

function xProcessAll(gas) {
  let numberOfTokenHolders = bals.filter(v=>sIs(v.xf,'>','0')).length;
  if (numberOfTokenHolders === 0) {return;}
  for(let key of Object.keys(_xbalances)){
    xProcessAccount(key)
  }
}

function xProcessAccount(account) {
  let _withdrawableDividend = xWithdrawableDividendOf(account);
  if (sIs(_withdrawableDividend, '>', '0')) {
    bals[account].xCD = _Add(bals[account].xCD, _withdrawableDividend);
    // (bool success,) = account.call{value: _withdrawableDividend, gas: xGasForTransfer}("");
    send(_withdrawableDividend, 'eth', 'flowx', account)
      return true;
  }else{return false;}
}



// debugger;
