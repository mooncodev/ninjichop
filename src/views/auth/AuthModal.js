import {chakra,
  Box,
  Portal,
  Center,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Button,
  Image,
  Spacer,
  Text,
  Avatar,
  useDisclosure, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Checkbox,  FormHelperText,

} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import GoogleButton from "react-google-button";

import { NavLink, useNavigate,Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from 'services/useAppStore.js';
import { useAuth, authState } from 'services/useAuth.js';
import { HFlexSC, VFlex } from '../bits/UtilityTags.js';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object().shape({
  email: yup.string().email('Email invalid').required('Required'),
  password: yup.string().required('Required'),
});

export default function AuthModal({  }) {
  const isOpen = useAppStore(s=>s.authModalIsOpen)
  const tabIndex = useAppStore(s=>s.authModalTabIndex)
  const [showForgotPassView, setShowForgotPassView]= useState(false)
  const [forgotPassEmail, setForgotPassEmail]= useState('')
  const [forgotPassMessage, setForgotPassMessage]= useState('')

  const onClose = ()=>{
    resetForm()
    useAppStore.getState().set_authModalIsOpen(false)
  }
  const setTabIndex = (i)=>{
    resetWithEmailCarry()
    useAppStore.setState({authModalTabIndex: i})
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm
  } = useFormik({

    onSubmit: async (values, form) => {
      if(tabIndex===0){
        //sign in
        const user = await authState()._login(values.email, values.password)
        // const user = await authState().logInWithEmailAndPassword(values.email, values.password)
        form.resetForm()
        onClose();
      }
      else if(tabIndex===1){
        //sign up
        const user = await authState()._register(values.email, values.password)
        // const user = await authState().registerWithEmailAndPassword(values.email, values.password)
        form.resetForm()
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    }
  })

  const sendPasswordResetEmail = async ()=>{
    const res = await authState()._forgotPW(forgotPassEmail);
    setForgotPassMessage(res.toString())
  }
  const onChangeForgotPassEmail = (e)=>{
    setForgotPassEmail(e.currentTarget.value)
  }
  useEffect(()=>{
    if(showForgotPassView){
      //copy email to new input
      setForgotPassEmail(values.email)
    }else{setForgotPassEmail('')}
  },[showForgotPassView])

  function resetWithEmailCarry() {
    resetForm({
      values: {
        email: values.email,
        password: ''
      }
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {showForgotPassView ? (<>
            <ModalHeader>Password Reset</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={forgotPassEmail} onChange={onChangeForgotPassEmail}/>
              </FormControl>
              <br/>
              <HFlexSC>
                <Button colorScheme='gray' mr={3} onClick={()=>setShowForgotPassView(false)}>
                  Back
                </Button>
                <Button
                  onClick={sendPasswordResetEmail}
                  w='100%'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Send Reset Email
                </Button>
              </HFlexSC>
              <Box mt={3}>{forgotPassMessage}</Box>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </>): (<>
            {/* <ModalHeader/> */}
            {/* <ModalCloseButton /> */}
            <ModalBody>

              <Tabs isFitted index={tabIndex} onChange={setTabIndex}>
                <TabList mb='1em'>
                  <Tab>Sign in</Tab>
                  <Tab>Register</Tab>
                </TabList>
              </Tabs>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText> }
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText> }
              </FormControl>
              {/* Login */}
              {tabIndex===0 && (<>
                {/* <GoogleButton className="g-btn" type="dark"/> */}
                <Link color={'blue.400'} onClick={()=>{setShowForgotPassView(true)}}>
                  Forgot password?
                </Link><br/>
                <Checkbox>Remember me</Checkbox>
              </>)}
              {/* Signup */}
              {tabIndex===1 && (<>
                <Text mt={4} align={'start'}>
                  Already a user?
                  <Link color={'blue.400'}
                        onClick={()=> {
                          resetWithEmailCarry()
                          useAppStore.setState({ authModalTabIndex: 0 });
                        }}>
                    Login
                  </Link>
                </Text>
              </>)}

            </ModalBody>

            <ModalFooter justifyContent={'start'}>
              <Button colorScheme='gray' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={handleSubmit}
                w='100%'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {tabIndex===0 && 'Sign in'}
                {tabIndex===1 && 'Register'}
              </Button>
            </ModalFooter>
          </>)}
        </ModalContent>
      </Modal>
    </>
  )
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {width,height};
}
