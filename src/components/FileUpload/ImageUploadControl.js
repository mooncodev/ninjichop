import React, { useCallback, useEffect, useState } from 'react';
import { Center, Icon, useColorModeValue } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { AiFillFileAdd } from 'react-icons/ai';

export default function ImageUploadControl({ trigger, onFileAccepted, ...rest }) {

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    onFileAccepted(acceptedFiles[0]);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:  { 'image/jpeg': [], 'image/png': [] },
    maxFiles: 1, multiple: false,
  });

  const activeBg = useColorModeValue('bog.100', 'bog.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'bog.300' : 'bog.300',
    isDragActive ? 'bog.500' : 'bog.500',
  );

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

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
    <aside style={thumbsContainer}>
      {thumbs}
    </aside>

  </>);
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 140,
  height: 140,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};
