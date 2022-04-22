import React, { useState } from 'react'
import { Flex,Box, Text, Spacer } from '@chakra-ui/react'
const SettingsPassword = () => {

    const [oldPassword, setOldPassword] = useState('opytuut')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

  return (
   <>
   <Flex className='settings-password-container' w='70%' p='1.5rem 0'>
        <Box w='50%'>
            <Text
                color='#271B3E'
                fontFamily='Volkhov'
                fontSize={{base:'15px',md:'16px', lg:'18px'}}
                fontWeight='700'
                lineHeight='25px'

            >Reset Password</Text>
            <Text
                color='#705897'
                fontFamily='Poppins'
                fontSize={{base:'12px',md:'14px', lg:'14px'}}
                fontWeight='300'
                lineHeight='25px'>
                Change password to a new one
            </Text>
        </Box>
        <Spacer/>
        <Box w='50%'>
            <Box w='100%' m='0rem 0 0 0'>
                <Text
                 fontFamily='Poppins'
                 fontSize={{base:'12px',md:'14px', lg:'14px'}}
                 fontWeight='600'
                 lineHeight='25px'
                 color='#B3A7C6'>Old Password</Text>
                <input className='settings-input-password'
                type='password'
                value = {oldPassword}
                onChange={e => {  return setOldPassword(e.target.value)}}
                />
            </Box>
            <Box w='100%'  m='2rem 0'>
                <Text
                 fontFamily='Poppins'
                 fontSize={{base:'12px',md:'14px', lg:'14px'}}
                 fontWeight='600'
                 lineHeight='25px'
                 color='#B3A7C6'>New Password</Text>
                <input className='settings-input-password'
                type='password'
                value = {newPassword}
                onChange={e => {  return setNewPassword(e.target.value)}}
                />
            </Box>
            <Box w='100%' m='2rem 0 0 0'>
                <Text
                 fontFamily='Poppins'
                 fontSize={{base:'12px',md:'14px', lg:'14px'}}
                 fontWeight='600'
                 lineHeight='25px'
                 color='#B3A7C6'>Confirm password</Text>
                <input className='settings-input-password'
                type='password'
                value = {confirmPassword}
                onChange={e => {  return setConfirmPassword(e.target.value)}}
                />
            </Box>
            <Box className='white-background-button-container' m='2rem 0rem' >
                <button className='white-background-button-password edit-btn'><span>Edit Password</span></button>
            </Box>
        </Box>
   </Flex>
   </>
  )
}

export default SettingsPassword
