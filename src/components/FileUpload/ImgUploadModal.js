import React from 'react';
import {
  Center, useColorModeValue, Icon,
  ModalOverlay, Modal, ModalContent, ModalCloseButton,
  ModalBody, ModalFooter, ModalHeader,
  Button, useDisclosure
} from '@chakra-ui/react';
import UploadDropzone from './UploadDropzone.js';
import { RiImageAddLine } from 'react-icons/ri';
import { IBtn } from 'views/bits/UtilityTags.js';

export default function ImgUploadModal({ trigger,onFileAccepted }) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleFileAccepted=(e)=>{
    onClose()
    onFileAccepted(e)
  }
  return (<>
    <IBtn I={RiImageAddLine} onClick={onOpen} />
    <Modal onClose={onClose} isOpen={isOpen} variant="bog">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <UploadDropzone onFileAccepted={handleFileAccepted}/>

        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
</>);
}
