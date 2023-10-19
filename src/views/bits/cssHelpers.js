/**@example
 *  ...bgImg(Based), ...abs(0,0,'20px',0),
 */
export const bgImg = (img)=>({ background:`50% 50%/cover no-repeat url(${img})` })
export const pxNumToRem = (v)=>{
  if(['vw','vh','em','%','px'].indexOf(v)>-1){return v}return (parseInt(v) * .0625) + 'rem'}
export const numToPxStr = (v)=>{
  if(/\D/.test(v)){return v}return (v + 'px')}
export const absXY=(x='0',y='0')=>({position:'absolute',top:numToPxStr(y),right:numToPxStr(x),bottom:numToPxStr(y),left:numToPxStr(x),})
export const absX=(x='0')=>({ position:"absolute", right:numToPxStr(x), left:numToPxStr(x),})
export const absY=(y='0')=>({ position:"absolute", top:numToPxStr(y), bottom:numToPxStr(y),})
export const abs0=()=>({ position:"absolute", top:'0', bottom:'0',right:'0', left:'0',})
export const abs=(top,right,bottom,left,rv={position:"absolute"})=>{
  if(top||top===0){rv.top=numToPxStr(top)}if(right||right===0){rv.right=numToPxStr(right)}
  if(bottom||bottom===0){rv.bottom=numToPxStr(bottom)}if(left||left===0){rv.left=numToPxStr(left)}return rv;
}
