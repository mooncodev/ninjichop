let flex = .1;
let rv = []
let gr = 1.618
for(let i=1;i<850;i++){
  let _rv = {}/* , lowRv,highRv */
  let low = i / gr, high = i * gr;
  let lowDiff = low - Math.floor(low)
  // let highDiff = high - Math.floor(high)
  // if(lowDiff<flex||lowDiff>(1-flex)){lowRv=low;}
  // if(highDiff<flex||highDiff>(1-flex)){highRv=high;}
  if(lowDiff<flex||lowDiff>(1-flex)){
    rv.push({
      low: low,
      base: i,
      high: high
    })

  }

}

console.dir(rv)
