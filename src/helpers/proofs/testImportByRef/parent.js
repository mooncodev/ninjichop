const child = require('./child')

let {
  var_A,var_B,var_C,var_D,
  updateFn, updateConst,
  reportFn, reportConst
} = require('./child');

updateFn(1000, 'yoooo',{a:'red'})

console.log('globalA, globalB', globalA, globalB)
reportFn();
reportConst();

updateConst(15,'sup?',['red'])

console.log('globalA, globalB', globalA, globalB)
reportFn();
reportConst();