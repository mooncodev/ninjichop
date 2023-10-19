
export function getPath(path, entity){
  return path.split('.').reduce((a, b) => a && a[b], entity);
}
export function setPath(path, entity, value, upsert=true){
  const pathParts = path.split('.');
  let obj = entity;
  for (let i=0;i<pathParts.length;i++){
    let part = pathParts[i];
    //if part matches array lookup eg. '[3]', remove brackets and convert to INT
    if(part.indexOf(0)==='[' && part.charAt(part.length-1)===']'){
      part = parseInt(part.slice(1,-1))
    }
    if (obj[part]) {
      //path exists
      if (i < pathParts.length - 1) {
        obj = obj[part];
      } else {
        obj[part] = value;
      }
    }
    else if(upsert){
      //create path
      if (i < pathParts.length - 1) {
        obj = obj[part];
      } else {
        obj[part] = value;
      }
    }
    else{
      //exit
      console.error('path does not exist!')
      break;
    }

  }
}
/* object should be k:v pairs of path:newValue */
export function setPaths(pathsObject, entity){
  Object.entries(pathsObject).forEach(([key, value]) => {
    setPath(key, entity, value);
  });
}
