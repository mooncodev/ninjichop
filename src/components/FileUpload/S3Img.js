import React, { useCallback, useEffect, useState } from 'react';
import { Box, Center, CircularProgress, Icon, useColorModeValue } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { AiFillFileAdd } from 'react-icons/ai';
import axios from 'axios';
import { BtnXs, TextXs, VFlex } from '../../views/bits/UtilityTags.js';
import { animatePct } from './FileUploadControl.js';
import { serverOrigin } from '../../data/constants.js';

export default function S3Img ({ suid, filename, onRemove=false, ...rest }){
  const [file, setFile] = useState({});
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [progressDisplay, setProgressDisplay] = useState('none');
  const [errDisplay, setErrDisplay] = useState('none');
  const [progressPct, setProgressPct] = useState(0);

  const fetchImage = async () => {
    setProgressPct(0);
    setProgressDisplay('block');
    setErrDisplay('none');
    let duration = 2;
    animatePct(duration,(v)=>setProgressPct(v));
    const res = await axios.get(`${serverOrigin}/tools/${suid}/${filename}`,
      { responseType: 'json' }
    )
    if(res && res.data && res.data.error == null) {
      setImageDataUrl(res.data)
      setProgressDisplay('none');
      setFile(res);
    } else {
      setProgressDisplay('none');
      setErrDisplay('block')
    }
  }

  useEffect(()=>{
    fetchImage()
  },[])

  return (<Box style={sxThumbsContainer}>
    <TextXs display={errDisplay} color={'red'}>Click to retry download.</TextXs>
    <CircularProgress
      value={progressPct} isIndeterminate={progressPct===0}
      display={progressDisplay} thickness='16px' size='16px'
      color='blue.300'
    />
    <div style={sxThumb}>
      <VFlex style={sxThumbInner}>
        <img
          alt={'thumb'}
          src={imageDataUrl}
          style={sxImg}
          // Revoke data uri after image is loaded
          onLoad={() => { }}
        />
        {onRemove && (<BtnXs onClick={onRemove}>Remove</BtnXs>)}
      </VFlex>
    </div>
  </Box>)
}

const sxImg = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
const sxThumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const sxThumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 140,
  height: 170,
  padding: 4,
  boxSizing: 'border-box'
};

const sxThumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};
