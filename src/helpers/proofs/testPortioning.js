const {sExp} = require("../util/static/mathUtils.js")
let c = {};
// let ttlFeePctBuys = 500;  // 500
// let ttlFeePctSells = 800; // 800
c.ethPtnChty    = 200;    // 200
c.ethPtnMktg    = 100;    // 100
c.ethPtnLqty    = 60; // 60
c.tknPtnLqty    = 40; // 40
c.ethPtnRwds    = 400;    // 400
let _ethPtnTotal = c.ethPtnChty+c.ethPtnMktg+c.ethPtnLqty+c.ethPtnRwds;    // must = prev 4
let _ovlPtnTotal = _ethPtnTotal+c.tknPtnLqty; // 40

let tokens = 1000;

let magLqTknPct = (c.tknPtnLqty * 10000) / _ovlPtnTotal;
let lqtyTokenAside = (tokens * magLqTknPct)/10000;

let createdEth = tokens - lqtyTokenAside;

let ES_CHTY = (createdEth * c.ethPtnChty) / _ethPtnTotal;
let ES_MKTG = (createdEth * c.ethPtnMktg) / _ethPtnTotal;
let ES_LQTY = (createdEth * c.ethPtnLqty) / _ethPtnTotal;
let ES_RWDS = (createdEth * c.ethPtnRwds) / _ethPtnTotal;
let ES_RWDS2 = createdEth - ES_CHTY - ES_MKTG - ES_LQTY;

let sum =  lqtyTokenAside + ES_CHTY + ES_MKTG + ES_LQTY + ES_RWDS;
    console.log()





