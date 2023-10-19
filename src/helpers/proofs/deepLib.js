const ethers = require('ethers');
const _ = require("lodash");

const ola = [];
ola.push(ethers.BigNumber.from(100),ethers.BigNumber.from(200))
ola.arg1=ethers.BigNumber.from(100)
ola.arg2=ethers.BigNumber.from(200)
const log1 = {
  test1:['yooo'],
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
  // q2: [
  //   ethers.BigNumber.from(22),
  //   'r2',
  //   {
  //     3: ethers.BigNumber.from(33),
  //     s4: {
  //       test4: null,
  //       BN4: ethers.BigNumber.from(44),
  //       t5: {
  //         test: ['t5',ethers.BigNumber.from(61),ethers.BigNumber.from(62),'funky',undefined, null, true],
  //         BN3: ethers.BigNumber.from(55),
  //       }
  //     }
  //   }, {
  //     what:'hey!',
  //     deep:{
  //       deeper:{
  //         ola:ola
  //       }
  //     }
  //   }
  // ],
  // ola,
}

const deep={
  deepNumToString: (o) => {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        return toString(o[k]);
      }
      o[k] = '' + o[k];
    });

    return o;
  },
  isPlainObject: function(obj) {
    if ((obj != null ? obj.constructor : void 0) == null) {
      return false;
    }
    return obj.constructor.name === 'Object';
  },
  forEach: (obj,userFn,maxDepth=10) => {
    let rc = (vv, dep)=>{const currDep=dep+1;
      if (currDep>maxDepth+1)return vv
      if (Array.isArray(vv)) {
        if(!vv.length){return vv;}let nArr=[];
        for(let [k,v] of Object.entries(vv)){
          if(/\D/.test(k)){//recurses array and ola
            nArr[k]=rc(v,currDep);
          }else{
            nArr.push(rc(v,currDep));
          }
        } vv=nArr;
      }else if(deep.isPlainObject(vv)){
        Object.keys(vv).forEach(function (k) {
          vv[k] = rc(vv[k],currDep);//object recurse
        })
      }
      return userFn(vv);
    };return rc(obj,0);
  },
  xform: (obj,userFn,maxDepth=10) => {let rv={};
    function rc (vv, dep){
      let currDep=dep+1,mod,fnRv;
      if (currDep>maxDepth+1){return vv;}
      else if (Array.isArray(vv)) {
        if(!vv.length){return vv;}mod=[];
        for(let [k,v] of Object.entries(vv)){
          if(/\D/.test(k)){//recurses array and ola
            mod[k]=rc(v,currDep);
          }else{
            mod.push(rc(v,currDep));
          }
        }
        return mod;
      }else if(deep.isPlainObject(vv)){mod= {};
        Object.keys(vv).forEach(function (k) {
          mod[k] = rc(vv[k],currDep);//object recurse
        })
        return mod;
      }else{
        try{fnRv = userFn(vv);
        }catch(e){fnRv=vv;}
        if(fnRv===null&&fnRv!==vv){fnRv=vv}
        return fnRv;
      }
    }
    let _obj = _.clone(obj);
    // rv = rc(_obj,0);
    return rc(_obj,0);
  },
  select: function(root, filter, path) {
    let elementPath, k, selected, v;
    path = path == null?[]:path;
    selected = [];
    if (filter(root)) {
      selected.push({
        path: path,
        value: root
      });
    } else if (_.isObject(root)) {
      for (k in root) {
        v = root[k];
        elementPath = _.clone(path);
        elementPath.push(k);
        selected = selected.concat(deep.select(v, filter, elementPath));
      }
    }
    return selected;
  },
  transform: function(obj, filter, transform) {
    let k, transformed, v, _i, _len;
    if (filter(obj)) {
      return transform(obj);
    } else if (_.isArray(obj)) {
      transformed = [];
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        v = obj[_i];
        transformed.push(deep.transform(v, filter, transform));
      }
      return transformed;
    } else if (deep.isPlainObject(obj)) {
      transformed = {};
      for (k in obj) {
        v = obj[k];
        transformed[k] = deep.transform(v, filter, transform);
      }
      return transformed;
    } else {
      return obj;
    }
  },
}

let sel = deep.select(log1,(obj)=>{ return typeof obj == 'number' } );

let res1 = deep.xform(log1,(vvv)=>{
  if(vvv._isBigNumber&&vvv._hex)return vvv.toString()
  if(typeof(vvv)==='number')return vvv.toString()
  if(vvv==='yooo')return 'sup'
})
console.log(JSON.stringify(res1));