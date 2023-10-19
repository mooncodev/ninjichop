// const {__,} = require('./logUtils');
const __ = console.log;
const _ = require('lodash');
const {
  uint256max,pow2_128,jsMaxSafeInt,gLimitRopsten,
  num,sEthToWei,last4,_toBN,_toHex,inTenMinutes,
  sAdd,sSub,sMul,sDiv,sAddRay,_Add,_Sub,_Mul,_Div,_AddRay,sRnd,sAbs,sPow,
  sFla,sExp,sHR,hrExp,sIs,sIs0,_F,
} = require('../util/static/mathUtils');

let amts = {
  fx1:     sExp(1,9),
  fx10k:   sExp(10_000,9),
  fx1mn:   sExp(1_000_000,9),
  fx1bn:   sExp(1_000_000_000,9),
  fx4bn:   sExp(4_000_000_000,9),
  fx4p6bn: sExp(4_600_000_000,9),
  fx397bn: sExp(397_000_000_000,9),
  eth10:    sExp(10,18),
  eth2:    sExp(2,18),
  eth1:    sExp(1,18),
  ethp01:  sExp(.01,18),
}
let bals = {
  flowx:    {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h1:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h2:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h3:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h4:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h5:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h6:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h7:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
  h8:       {eth:'0',xf:'0',xMDC:'0',xAD:'0',xWD:'0',xCD:'0',},
}
if(1/*setup*/){
  bals.h1.eth=sEthToWei(40)
  bals.h2.eth=sEthToWei(40)
  bals.h3.eth=sEthToWei(40)
  bals.h4.eth=sEthToWei(40)
  bals.h5.eth=sEthToWei(40)
  bals.h6.eth=sEthToWei(40)
  bals.h7.eth=sEthToWei(40)
  bals.h8.eth=sEthToWei(40)
}
let xMag = '100000000';
// let xMag = sPow('2',148);
let xMagdDivPerShare = '0';
let xMinTokenBalForDivs = '0'/*sExp(100_000_000,9)*/;

const x = {
  xTotalSupply:'0',
  xDistributeDivs:(wei)=>{
    bals.flowx.eth=sAdd(bals.flowx.eth,wei);
    let mdps1 = _Mul(wei, xMag);
    let mdps2 = _Div(mdps1, x.xTotalSupply);
    let mdps3 = _Add(xMagdDivPerShare,mdps2);
    xMagdDivPerShare = mdps3
  },
  xWithdrawableDividendOf:(acct)=>{
    let ttlAccDiv1= _Mul(xMagdDivPerShare,bals[acct].xf);
    let ttlAccDiv2= _Add(ttlAccDiv1,bals[acct].xMDC);
    let ttlAccDiv3= _Div(ttlAccDiv2,xMag);
    bals[acct].xAD = ttlAccDiv3;
    let xWD= sSub(ttlAccDiv3, bals[acct].xCD)
    bals[acct].xWD = xWD;
    return xWD;
  },
  _xSetBalance:(acct, newBalance)=> {
    let currentBalance = bals[acct].xf;
    if (sIs(currentBalance, '<', newBalance)) {
      let mintAmount = _Sub(newBalance, currentBalance);
      x.xTotalSupply = _Add(x.xTotalSupply,mintAmount);
      bals[acct].xf = _Add(bals[acct].xf,mintAmount);
      bals[acct].xMDC =
        _Sub(bals[acct].xMDC, _Mul(xMagdDivPerShare, mintAmount));
    }
    else if (sIs(currentBalance, '>', newBalance)) {
      let burnAmount = _Sub(currentBalance, newBalance);
      x.xTotalSupply = _Sub(x.xTotalSupply,burnAmount);
      bals[acct].xf = _Sub(bals[acct].xf, burnAmount);
      bals[acct].xMDC =
        _Add(bals[acct].xMDC, _Mul(xMagdDivPerShare, burnAmount));
    }
  },
  xSetBalance:(account, newBalance)=> {
    if (sIs(newBalance, '>=', xMinTokenBalForDivs)) {
      x._xSetBalance(account, newBalance);
    } else {
      x._xSetBalance(account, 0);
    }
    // x.xProcessAccount(account);
  },
  xProcessAccount:(account)=> {
    let _withdrawableDividend = x.xWithdrawableDividendOf(account);
    bals[account].xCD = _Add(bals[account].xCD, _withdrawableDividend);
    bals.flowx.eth = sSub(bals.flowx.eth,_withdrawableDividend);
    bals[account].eth = sAdd(bals[account].eth,_withdrawableDividend);
  },
  xGetAllWD:()=>{
    let wd1 = x.xWithdrawableDividendOf('h1');
    let wd2 = x.xWithdrawableDividendOf('h2');
    let wd3 = x.xWithdrawableDividendOf('h3');
    let wd4 = x.xWithdrawableDividendOf('h4');
    let wd5 = x.xWithdrawableDividendOf('h5');
    let wd6 = x.xWithdrawableDividendOf('h6');
    let wd7 = x.xWithdrawableDividendOf('h7');
    let wd8 = x.xWithdrawableDividendOf('h8');
    let sum = sAddRay(wd1,wd2,wd3,wd4,wd5,wd6,wd7,wd8)
    return {wd1: wd1, wd2: wd2, wd3: wd3, wd4: wd4,
      wd5: wd5,wd6: wd6,wd7: wd7,wd8: wd8,sum: sum,
      fxe: bals.flowx.eth, xts:x.xTotalSupply}
  },
}

// simulate airdorp
// contractReceiveEth(amts.ethp01, 'aaaa')

// __('snapshot0',bals)

if(1/*??*/){
  __(bals)
  x.xSetBalance('h1',amts.fx1)
  x.xDistributeDivs(amts.eth1)
  x.xSetBalance('h1',amts.fx1bn)
  x.xSetBalance('h2',amts.fx1bn)
  __('0',x.xGetAllWD())
  x.xSetBalance('h3',amts.fx1bn)
  x.xSetBalance('h4',amts.fx397bn)
  x.xSetBalance('h5',amts.fx1bn)
  x.xSetBalance('h6',amts.fx1bn)
  x.xSetBalance('h7',amts.fx1bn)
  x.xSetBalance('h8',amts.fx1bn)
  __('0',x.xGetAllWD())

  x.xDistributeDivs(amts.eth10)
  __('1',x.xGetAllWD())
  x.xDistributeDivs(amts.eth1)
  __('2',x.xGetAllWD())
  x.xProcessAccount('h1')
  __('3',x.xGetAllWD())
  x.xProcessAccount('h2')
  x.xProcessAccount('h3')
  x.xProcessAccount('h5')
  x.xProcessAccount('h6')
  x.xProcessAccount('h7')
  x.xProcessAccount('h8')
  __('4',x.xGetAllWD())

  x.xSetBalance('h1','0')
  x.xSetBalance('h2','0')
  x.xSetBalance('h3','0')
  x.xSetBalance('h5','0')
  x.xSetBalance('h6','0')
  x.xSetBalance('h7','0')
  x.xSetBalance('h8','0')
  __('5',x.xGetAllWD())
  x.xProcessAccount('h4')
  __('6',x.xGetAllWD())
  x.xSetBalance('h4',sExp(1,9))
  __('7',x.xGetAllWD())
  x.xDistributeDivs(amts.eth1)
  __('8',x.xGetAllWD())

}

debugger;

