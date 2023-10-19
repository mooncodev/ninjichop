let var_A = {a:11};
let var_B = ['hey','there'];
let var_C = 0.5;
let var_D = 'detroit';

function updateFn(a1,a2,a3,a4){
  var_A.a = a1
  var_B.push(a2)
  var_C = a3;
  var_D = a4;
}
const updateConst=(a1,a2,a3,a4)=>{
  var_A.a = a1
  var_B.push(a2)
  var_C = a3
  var_D = a4
}
function reportFn(){
  console.log(var_A,var_B,var_C,var_D)
}
const reportConst=()=>{
  console.log(var_A,var_B,var_C,var_D)
}
module.exports = {
  var_A,var_B,var_C,var_D,
  updateFn, updateConst,
  reportFn,  reportConst
};