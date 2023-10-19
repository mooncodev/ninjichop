const hre = require("hardhat");
const {ethers} = hre;
const { BigNumber, provider } = ethers;
const { MaxUint256 } = ethers.constants;
const { parseEther, parseUnits, formatUnits, defaultAbiCoder,hexValue  } = ethers.utils;
const {__, logE, ethScanURI,   appendToLog,
  ___pressanykey___, ___pause___, num, expand9,expand18,unexpand9,unexpand18
} = require('./logUtils');
const _toBN = (val)=>{return ethers.BigNumber.from(val)}
const _toHex = (val)=>{return hexValue(parseInt(val))}
const noExp = (v)=>{
  let data= String(v).split(/[eE]/);
  if(data.length===1) return data[0];
  let z= '', sign= v<0? '-':'',
    str= data[0].replace('.', ''),
    mag= Number(data[1])+ 1;
  if(mag<0){
    z= sign + '0.';
    while(mag++) z += '0';
    return z + str.replace(/^\-/,'');
  }
  mag -= str.length;
  while(mag--) z += '0';
  return str + z;
}

let left, right, decimals=18
let a = '23523523'
let b = '23523523.324435353434453354200'
let c = 2353.3242
let val = '1000222000222000444555444555444555444000' //1 quadrillion at 18 dec
//challenge: convert d to read: 1,000,222,000,222,000.444555444555444555444555
//we can assume d is a string and in full precision (no truncations, just expanded by dec)

function hrUnexpand(val, decimals){
  let left = val.slice(0, -decimals);
  let right = val.slice(-decimals);
  left=left.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return left+'.'+right
}

[,left,right] = val.match(/(\d+)\.?(\d+)?/);
decs = right.length;
__(left)
__(right)
right = left.slice(-decimal)+right
__(left)
__(right)
return parseFloat(val).toFixed(decimal).toString()

debugger;

