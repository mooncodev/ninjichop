import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';

export default function UploadDropzone({ onFileAccepted }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFileAccepted(acceptedFiles[0]);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: '.torrent', maxFiles: 1, multiple: false,
  });

  const dropText = isDragActive ? 'Drop the files here ...' : 'Drag \'n\' drop file here, or click to select files';

  const activeBg = useColorModeValue('bog.100', 'bog.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'bog.300' : 'bog.300',
    isDragActive ? 'bog.500' : 'bog.500',
  );

  return (
    <Center
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={AiFillFileAdd} mr={2} />
      <p>{dropText}</p>
    </Center>
  );
}
