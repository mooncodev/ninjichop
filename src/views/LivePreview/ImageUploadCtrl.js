import {useRef, useState} from "react";
import {
  ButtonGroup,
  Editable,
  EditablePreview,
  Flex,
  Heading,
  Box,
  SimpleGrid,
  IconButton,
  Input,
  Tooltip,
  useEditableControls,
  EditableInput,
  EditableTextarea,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement, Icon, FormErrorMessage, Button, Image, Text,

} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {useAuth} from "services/useAuth";
import {BtnXs, VFlex} from "../bits/UtilityTags";
import {FiFile} from "react-icons/fi";
import {abs0} from "../bits/cssHelpers";
import {getPath} from "../../helpers/pathStringUtils";

export default function ImageUploadCtrl({propName, path, label, textarea=false, circular=false, sx={}, onSave=()=>{}}) {
  const uimage = useAuth(s=>getPath(path,s.user))
  const inputRef = useRef();
  const [file, setFile] = useState()
  const [imagePreview, setImagePreview] = useState(uimage)
  const [base64, setBase64] = useState('')
  const [name, setName] = useState()
  const [size, setSize] = useState()
  const [shade, setShade] = useState('#FFFFFF')
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e) => {
    console.log('file', e.target.files[0])
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = _handleReaderLoaded
      reader.readAsBinaryString(file)
    }
  }

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    setBase64(window.atob(binaryString))
  }

  const onFileSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    let payload = { image: base64 }
    console.log('payload', payload)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const photoUpload = (e) => {
    e.preventDefault()
    setShade('#FFFFFF');
    const reader = new FileReader()
    const file = e.target.files[0]
    console.log('reader', reader)
    console.log('result', reader.result)
    console.log('file', file)
    if (reader != null && file != null) {
      reader.onloadend = (e) => {
        setFile(file)
        setSize(file.size)
        setName(file.name)
        setImagePreview(reader.result)
        useAuth.getState()._updatePaths({[path]:reader.result}).then();
        onSave(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const remove = ()=>{setShade('#FFFFFF');
    useAuth.getState()._updatePaths({[path]:''}).then();
    setFile('');setImagePreview('');setBase64('');setName('');setSize('');
    onSave('')
  }
  const onDragEnter = (e)=>{
    console.log('drag enter')
    setShade('#CCCCFF')
  }
  const onDragLeave = (e)=>{
    console.log('drag leave')
    setShade('#FFFFFF')
  }
  return (<Box >
    <FormControl>
      <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
      {uimage !== '' && (
        <>
          {/*<VFlex><Text>Name: {name}</Text><Text>Size: {size}</Text></VFlex>*/}
          <Image src={imagePreview} boxSize={24} borderRadius={circular?50:0}/>
          <BtnXs onClick={remove} sx={{width:24}}>Remove</BtnXs>
        </>
      )}
      <InputGroup border='1px solid black' w='200px' h='40px' borderRadius={4} bgColor={shade}>
        <InputLeftElement pointerEvents="none" sx={{...abs0(),w:'unset',h:'unset'}}>
          <Icon as={FiFile}/>
          <Box fontSize={8}>Click to upload a photo or drag one here</Box>
        </InputLeftElement>
        <Input type='file' accept='.jpeg, .png, .jpg' name='imgimg'
               ref={inputRef}
               style={{opacity: '0'}}
               onChange={photoUpload}
               src={imagePreview}
               onDragEnter={onDragEnter}
               onDragLeave={onDragLeave}
        />

      </InputGroup>
      {/*<Button type='submit' isLoading={isLoading}>Save</Button>*/}
      {/*<FormErrorMessage></FormErrorMessage>*/}
    </FormControl>
  </Box>);
}
