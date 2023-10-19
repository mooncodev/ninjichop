const ethers = require('ethers');

const ola = [];
ola.push(ethers.BigNumber.from(100),ethers.BigNumber.from(200))
ola.arg1=ethers.BigNumber.from(100)
ola.arg2=ethers.BigNumber.from(200)
const log1 = {
  test1:[],
  BN1:ethers.BigNumber.from(1),
  a2:{
    test2:null,
    test2b: {},
    BN2:ethers.BigNumber.from(2),
    b3:{
      test3:false,
      BN3:ethers.BigNumber.from(3),
      c4:{
        test4:undefined,
        BN4:ethers.BigNumber.from(4),
        d5:{
          test5:NaN,
          BN5:ethers.BigNumber.from(5),
          e6:{
            test:'hello',
            BN6:ethers.BigNumber.from(6),
            f:{
              test:900_000_000,
              BN7:ethers.BigNumber.from(7),
            }
          }
        }
      }
    }
  },
  q2: [
    ethers.BigNumber.from(22),
    'r2',
    {
      3: ethers.BigNumber.from(33),
      s4: {
        test4: null,
        BN4: ethers.BigNumber.from(44),
        t5: {
          test: ['t5',ethers.BigNumber.from(61),ethers.BigNumber.from(62),'funky',undefined, null, true],
          BN3: ethers.BigNumber.from(55),
        }
      }
    }, {
      what:'hey!',
      deep:{
        deeper:{
          ola:ola
        }
      }
    }
  ],
  ola,
}

const ss={
  deepNumToString: (o) => {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        return toString(o[k]);
      }
      o[k] = '' + o[k];
    });

    return o;
  },
  deepBnToStr: (obj,maxDepth=8) => {
    let rc = (vv, dep)=>{const currDep=dep+1;
      if (vv==null)return vv
      if(vv._isBigNumber&&vv._hex)return vv.toString()
      if(typeof(vv)==='number')return vv.toString()
      if (currDep>maxDepth)return vv
      if (Array.isArray(vv)) {
        if(!vv.length){return vv;}let nArr=[];
        for(let [k,v] of Object.entries(vv)){
            if(/\D/.test(k)){//recurses array and ola
              nArr[k]=rc(v,currDep);
            }else{
              nArr.push(rc(v,currDep));
            }
        } vv=nArr;
      }else if(typeof(vv)==='object'){
        Object.keys(vv).forEach(function (k) {
          vv[k] = rc(vv[k],currDep);//object recurse
        })
      }return vv;
    };return rc(obj,0);
  }
}

let res1 = ss.deepBnToStr(log1)
let res2 = ss.deepBnToStr('432423423')
let res3 = ss.deepBnToStr(324423423)
console.log(JSON.stringify(res1));