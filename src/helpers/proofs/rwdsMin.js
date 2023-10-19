// const {__,} = require('./logUtils');
const __ = console.log;
const _ = require('lodash');
const {
  uint256max,pow2_128,jsMaxSafeInt,gLimitRopsten,
  num,sEthToWei,last4,_toBN,_toHex,inTenMinutes,
  sAdd,sSub,sMul,sDiv,sAddRay,_Add,_Sub,_Mul,_Div,_AddRay,sRnd,sAbs,sPow,
  sFla,sExp,sHR,hrExp,sIs,sIs0,_F,
} = require('../util/static/mathUtils');
let exclusions = ['FX','LP','WB']
function balOf(a){return $[a].fx}
function xIsExcl(a){return exclusions.includes(a)}
let init$ = {
  FX:       {fx:0,eth:0},
  LP:       {fx:16,eth:16},
  WB:       {fx:20},
  h1:       {fx:0,xDA:0,xMDC:0,xETD:0,xWTD:0,eth:0,},
  h2:       {fx:0,xDA:0,xMDC:0,xETD:0,xWTD:0,eth:0,},
  h3:       {fx:0,xDA:0,xMDC:0,xETD:0,xWTD:0,eth:0,},
}, $ = _.cloneDeep(init$)

const c = {
  mag:123,
  DPS:0,
  min4divs:1,
  xTS:0,
  adMint:(a, amt)=>{
    c.xMint(a,amt);
    $[a].fx += amt;
  },
  fMint:(a, amt)=>{
    c.xMint(a,amt);
    $[a].fx += amt;
  },
  transfer:(from, to, amt)=>{
    if(balOf(from)<amt){console.warn('balOf(from)<amt');return;}
    c.xTransfer(from, to, amt)
    c.fTransfer(from, to, amt)
  },
  fTransfer:(from, to, amt)=>{
    $[from].fx -= amt;
    $[to].fx   += amt;
  },
  xTransfer:(from, to, amt)=>{
    /* min=4
  aaaa:9 --> user:0   (xTS was not impacted by user's bal of 0)
   [user] fx+9, xTS+9
  aaaa:9 --> user:2   (xTS was not impacted by user's bal of 2, and now should be impacted by 11)
   [user] fx+9, xTS+11
  aaaa:9 --> user:5   (xTS was impacted by user's bal of 5, and now should be impacted by 14 (+9))
   [user] fx+9, xTS+9
*/
    c.xMint(to, amt);
    c.xBurn(from, amt);
  },
  xMint:(a, amt)=> {
    //MUST be called BEFORE intended transfer updates balances
    if(!xIsExcl(a) && (balOf(a) + amt) > c.min4divs){
      //if the balance previously WAS NOT contributing to xTS
      // && now WILL contribute, add to xMint
      // ---extra to mint is the balance before this xfer
      let mintAmt = amt+((balOf(a) < c.min4divs)?balOf(a):0);
      c.xTS     += mintAmt;
      $[a].xMDC -= (c.DPS * mintAmt);
    }
  },
  xBurn:(a, amt)=> {
    //MUST be called BEFORE intended transfer updates balances
    //if from's balance was already under the minimum,
    // then they were already zero'd, and will remain zero'd,
    // so no need to adjust their rewards standing
    if(!xIsExcl(a) && balOf(a) > c.min4divs){
      //if the balance previously WAS contributing to xTS
      // && now WILL NOT contribute, add to xBurn
      // ---extra to burn is the resulting balance after this xfer
      let fromDestBal = balOf(a)-amt
      let burnAmt = amt+((fromDestBal < c.min4divs)?fromDestBal:0);
      c.xTS     -= burnAmt;
      $[a].xMDC += (c.DPS * burnAmt);
    }
  },
  xAddExclusion:(a)=>{
    //if their fx bal was above min4divs,
    exclusions.push(a);
    if(balOf(a)>c.min4divs){
      c.xTS  -= balOf(a)// -subtract bal from xTS
      $[a].xMDC = 0;// -delete them from xMDC
    }
  },
/*
  xMintOld:(a, mintAmt)=> {
    c.xTS     += mintAmt;
    $[a].xf   += mintAmt;
    $[a].xMDC -= (c.DPS * mintAmt);
  },
  xBurnOld:(a, burnAmt)=> {
    c.xTS     -= burnAmt;
    $[a].xf   -= burnAmt;
    $[a].xMDC += (c.DPS * burnAmt);
  },
  xSetBalance:(a, newBal)=> {
    if(c.xIsExcl(a)){return;}
    newBal = (newBal < c.min4divs)? 0 : newBal;
    let currBal = $[a].xf;
    if (currBal < newBal){
      c.xMintOld(a, (newBal - currBal))
    }
    if (currBal > newBal) {
      c.xBurnOld(a, (currBal - newBal))
    }
  },
*/
  xDistRwds:(amt)=>{
    $.FX.eth += amt;
    c.DPS    += (amt / c.xTS)
  },
  xWithdraw:(a)=> {
    let divAvail = c.xDAv(a);
    $[a].xWTD += divAvail;
    $[a].eth += divAvail;
    $.FX.eth -= divAvail;
  },
  xDAv:(_a)=>{let a = $[_a];
    let currShare = a.fx < c.min4divs?0:a.fx;
    a.xETD = (c.DPS * currShare) + a.xMDC;
    a.xDA   = a.xETD - a.xWTD
    return a.xDA;
  },
}
function rA(a) {
  return `[${a}] fx:${$[a].fx} xDA:${sRnd(c.xDAv(a),-2)} eth:${$[a].eth}`
}
function rAllDA() {
  return (c.xDAv('h1') + c.xDAv('h2') + c.xDAv('h3'))
}
function report(){
  return [rA('h1'),rA('h2'),rA('h3'),
    `AllDA/FXe:${rAllDA()}/${$.FX.eth} xTS:${c.xTS}`]
  // return {da1: da1, da2: da2, da3: da3,sum: sum,
  //   fxe: $.FX.eth, xts:c.xTS}
}

if(1/*??*/){
  __($)
  c.fMint('h1',2)
  c.fMint('h2',2)
  c.fMint('h3',40)
  __(report())
  c.xDistRwds(100)
  __(report())
  c.xWithdraw('h1')
  c.xWithdraw('h2')
  __(report())
  c.xDistRwds(100)
  __(report())
  for (let i = 0; i < 100; i++) {
    c.transfer('h1','h2',1)
    c.transfer('h2','h1',1)
  }
  c.xDistRwds(100)
  __(report())
  c.xWithdraw('h3')
  c.transfer('h3','h2',1)
  c.xWithdraw('h3')
  __(report())

  debugger;
}


