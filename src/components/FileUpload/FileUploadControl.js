import React, { useState, useEffect } from 'react';
import { Center, CircularProgress, Icon, ListItem, UnorderedList } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { AiFillFileAdd } from 'react-icons/ai';
import { TextXs } from '../../views/bits/UtilityTags.js';
import axios from 'axios';
import { animate } from 'framer-motion';
import S3Img from './S3Img.js';
import { rdzAcceptTypes } from './RdzAcceptTypes.js';
import { serverOrigin } from '../../data/constants.js';

export const animatePct = (duration=2, cb)=>{
  animate(0, 100, { duration: duration, onUpdate: v=>cb(v) })
}
export default function FileUploadControl({
  trigger, setFiles, imgPreviews=false, suid,
  accept=['image','office','archive','dev'],
  ...rest
}) {

  const activeBg = 'bog.100';
  const borderColor = isDragActive ? 'bog.300' : 'bog.300';

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progressDisplay, setProgressDisplay] = useState('none');
  const [errDisplay, setErrDisplay] = useState('none');
  const [progressPct, setProgressPct] = useState(0);

  const onDrop = async (acceptedFiles) => {
    setProgressPct(0);
    setProgressDisplay('block');
    setErrDisplay('none');

    let formData = new FormData();
    let duration = 0;
    for(let file of acceptedFiles){
      duration =+ file.size / 100000;
      formData.append('file',file);
    }
    formData.append('suid', suid)
    animatePct(duration,(v)=>setProgressPct(v));

    const res = await axios.post(`${serverOrigin}/upload`, formData )
    .catch(console.error);
    console.log(res);

    if(res && res.data.status === 'success' && res.data.results != null) {
      setUploadedFiles([...uploadedFiles, ...res.data.results]);
      setProgressDisplay('none');
    } else {
      setProgressDisplay('none');
      setErrDisplay('block');
    }

  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, } = useDropzone({
    onDrop, maxFiles: 5, multiple: true,
    accept: rdzAcceptTypes(accept)
  });

  const uploadedFilesPartial = uploadedFiles.map((file,i) => (
    <ListItem key={i}>
      {file.originalname} - {file.size} bytes
      {file.mimetype.indexOf('image')>-1 && imgPreviews && <S3Img suid={suid} filename={file.originalname}/>}
    </ListItem>
  ));

  useEffect(()=>{
    setFiles(uploadedFiles);
  },[uploadedFiles])

  return (<>
    <Center
      p={1}
      cursor="pointer"
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="2px dashed"
      borderColor={borderColor}
      {...rest}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={AiFillFileAdd} mr={2} />
      <p>Drag 'n' drop or click here to select files</p>
    </Center>
    <aside>
      {!!uploadedFiles.length && (<TextXs>Accepted files:</TextXs>)}
      <UnorderedList style={{}}>{uploadedFilesPartial}</UnorderedList>
      <TextXs display={errDisplay} color={'red'}>Something went wrong with the upload(s). Please try again.</TextXs>
      <CircularProgress
        value={progressPct} isIndeterminate={progressPct===0}
        display={progressDisplay} thickness='16px' size='16px'
        color='blue.300'
      />
    </aside>

  </>);
}


