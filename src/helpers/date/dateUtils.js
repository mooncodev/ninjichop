
export const autoTzOffset=(os=new Date().getTimezoneOffset()/60)=>os
export const epochExpand=(epochMS) => {
  const d = new Date(epochMS);
  const a = [d.getFullYear(),(d.getMonth()), d.getDate(),
    d.getHours(),d.getMinutes(),d.getSeconds()]
  const dateStr = [a[0],a[1],a[2],].join('-')
  const timeStr = [a[3],a[4],a[5],].join(':')
  return {epoch:epochMS, split:a, isoDate:dateStr, isoTime:timeStr, hrDate:dateStr, hrTime:timeStr};
};

export const offsetEpoch=(epochMS, offsetHours)=>{
  let offsetMS = (offsetHours * (60*60*1000))
  return offsetMS>0?epochMS + offsetMS:epochMS - offsetMS
}
