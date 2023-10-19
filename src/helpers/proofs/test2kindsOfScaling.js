const {sExp} = require("../util/static/mathUtils.js")
let methodA = 1;
let methodB = !methodA;
let ES_CHTY,ES_MKTG,ES_LQTY_PREFLIGHT
  ,TS_CHTY,TS_MKTG,TS_LQTY,TS_RWDS, TS_LQTY_PREFLIGHT,
  snapCHTY,snapMKTG,snapLQTY,snapRWDS
  ;

  let LQTY_PCT_OF_SPLIT_AS_ETH = 5000;

  snapCHTY = TS_CHTY = 1000;
  snapMKTG = TS_MKTG = 1000;
  snapLQTY = TS_LQTY = 2000;
  snapRWDS = TS_RWDS = 4000;


  let lqtyTokenHalf = (snapLQTY*LQTY_PCT_OF_SPLIT_AS_ETH)/10000;
  let lqtyEthHalf = snapLQTY - lqtyTokenHalf;
  TS_LQTY_PREFLIGHT = lqtyTokenHalf;

  if(methodA){
    snapLQTY = lqtyEthHalf;//methodA: halve the snap before scaling createdEth
  }

  let tokensToSwap = snapCHTY + snapMKTG + lqtyEthHalf + snapRWDS;
  let snapSum = snapCHTY + snapMKTG + snapLQTY + snapRWDS;

  //[SWAP ACTION] ...tokensToSwap becomes n ETH...
let createdEth = 7000; //arbitrary number

let ETH_SPLIT_CHTY = (createdEth * snapCHTY) / snapSum;
let ETH_SPLIT_MKTG = (createdEth * snapMKTG) / snapSum;
let ETH_SPLIT_LQTY = (createdEth * snapLQTY) / snapSum;
let ETH_SPLIT_RWDS = (createdEth * snapRWDS) / snapSum;
if(methodB){
  LQTY_SEEDBACK = ETH_SPLIT_LQTY/2;//methodB: redist half of the liquidity eth

}

ES_CHTY += ETH_SPLIT_CHTY;//set aside CHTY ETH
ES_MKTG += ETH_SPLIT_MKTG;//set aside MKTG ETH
ES_LQTY_PREFLIGHT += ETH_SPLIT_LQTY;//set aside LQTY ETH
ETH_SPLIT_RWDS+=createdEth-(ETH_SPLIT_CHTY+ETH_SPLIT_MKTG+ETH_SPLIT_LQTY+ETH_SPLIT_RWDS);
  //find val where...  FROGE_SUPPLY * FROGE_PRICE



