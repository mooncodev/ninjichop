// const readFileAsArrayBuffer = (file)=>{
//   return new Promise((resolve)=>{
//     const reader = new FileReader();
//     reader.onload = (f)=>{
//       const rv = {
//         "fieldname": "file",
//         "originalname": file.name,
//         // "encoding": "7bit",
//         "mimetype": file.type,
//         "buffer": {
//           "type": "Buffer",
//           "data": f.target.result
//         },
//         "size": file.size
//       };
//       resolve(rv);
//     };
//     reader.readAsArrayBuffer(file);
//     // reader.readAsDataURL(file);
//   })
// }
import { filetypeGroups } from './filetypeGroups.js';

export const rdzAcceptTypes = (aTypes = ['image', 'office', 'archive', 'dev']) => {
  const rv = {};
  if (aTypes.indexOf('image') > -1) {
    Object.assign(rv, filetypeGroups.image);
  }
  if (aTypes.indexOf('office') > -1) {
    Object.assign(rv, filetypeGroups.office);
  }
  if (aTypes.indexOf('archive') > -1) {
    Object.assign(rv, filetypeGroups.archive);
  }
  if (aTypes.indexOf('dev') > -1) {
    Object.assign(rv, filetypeGroups.dev);
  }
  return rv;
};
