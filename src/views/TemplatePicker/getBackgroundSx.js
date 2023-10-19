export function getBackgroundSx(backgroundSpec){
  const {bgType,bgFlatColor,bgGrdColor1,bgGrdColor2,bgGrdDir,bgImage} = backgroundSpec;
  if(bgType==='flat'){
    return {bgColor: bgFlatColor}
  }
  if(bgType==='gradient'){
    return {bgGradient: `linear(${bgGrdDir}, ${bgGrdColor1}, ${bgGrdColor2})`}
  }
  if(bgType==='photo'){
    return {
      bgImage:`${bgImage}`,
      bgPosition:'center', bgSize:'cover',
      bgRepeat:'no-repeat'
    }
  }
}
