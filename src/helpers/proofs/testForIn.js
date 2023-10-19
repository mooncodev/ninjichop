const __ = console.log;
let bals = {
  contract: {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',xTS:'0'},
  pair:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  aaaa:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  chty:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  mktg:     {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  h1:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  h2:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  h3:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
  h4:       {eth:'0',fx:'0',xf:'0',xMDC:'0',xWD:'0',},
}


/*
for(let [kAcct,oSymbols] of Object.entries(bals)){
  __(kAcct,oSymbols)
  for(let [kSymbol,sBal] of Object.entries(oSymbols)){
    __(kSymbol,sBal)
  }

}
*/
let inclAccts = ['contract','mktg']

// let a = Object.entries(bals)
// let b = Array.from(Object.entries(bals))
let inScope = Object.entries(bals).filter(([k,v],ii,aa)=>{
  return inclAccts.indexOf(k)>-1;
})


for(let [kAcct,oSymbols] of inScope){
  __(kAcct, oSymbols)
}

debugger