import React, {useState, useEffect} from 'react'
import {Box, Flex, Text, Spacer, Avatar, Input} from '@chakra-ui/react'
import './Settings.css'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import { UpdateDetails } from '../../services/Accessdetails'
const SettingsInfo = () => {

    const [userinfo, setUserinfo] = useState()
    const useremail = JSON.parse(localStorage.getItem('useremail')) 
    const username = JSON.parse(localStorage.getItem('username'))
 
    const [email, setEmail] = useState()
    const [user, setUser] = useState()
    const [gender, setgender] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [phonenumber, setPhonenumber] = useState()

  const url = `https://debt-fix.herokuapp.com/profile/get/`

  async function getUserInfo(url){
    const token = localStorage.getItem('accessToken');
     const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }
    
    const response = await fetch(url,option)
    const res = await response.json()
      
    setUserinfo(res)
    
    return res
   }
  useEffect(()=>{
    getUserInfo(url)
  },[userinfo])
  if (userinfo) {
      console.log(userinfo)
      const {firstname, lastname, gender, phone_number} = userinfo
  return (
    <>
    <Box  bg='#F5F5F5' marginLeft='17rem' p='0rem 2rem 3rem 2rem'>
       <Flex justifyContent='flex-end'  mb='0' >
          <Box m={4} bg='white' w={33} h={33} borderRadius={5} pos='relati ve' ><BsSearch className='icon'/></Box>
          <Box m={4} p='0rem auto' bg='white'  w={33} h={33} borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
        </Flex>
        <Text
        fontFamily='Volkhov'
        fontSize='24px'
        fontWeight='700'
        lineHeight='25px'
        color='#271B3E'
        >Settings</Text>
        <Text
         color='#705897'
         fontFamily='Poppins'
         fontSize='14px'
         fontWeight='300'
         lineHeight='25px'
        >Update your personal information and make changes to your account</Text>
        <Flex w='50%'  borderRadius={10}  m='1rem 0'>
            <Box bg='#705897' textAlign='center' w='50%' p={3} borderBottomLeftRadius={10} borderTopLeftRadius={10}><Text
              color='white'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='600'
              lineHeight='25px'>Profile</Text></Box>
            <Box bg='white' textAlign='center' w='50%'  p={3} borderBottomRightRadius={10} borderTopRightRadius={10}><Text
               color='#808080'
               fontFamily='Poppins'
               fontSize='14px'
               fontWeight='600'
               lineHeight='25px'>Settings</Text></Box>
        </Flex>
        <Flex w='40%' p='2rem 0'>
            <Box>
                <Text
                    color='#271B3E'
                    fontFamily='Volkhov'
                    fontSize='18px'
                    fontWeight='700'
                    lineHeight='25px'
                    opacity='70%'
                >Upload a profile picture</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize='14px'
                   fontWeight='300'
                   lineHeight='25px'>
                  Select a new avatar to be used .
                </Text>
            </Box>
            <Spacer/>
            <Avatar size='lg' bg='#8872AC' opacity='60%' icon={<BsCamera fontSize='1.5rem' />} />
        </Flex>
        <Flex justifyContent='space-between' w='70%'>
            <Box maxW={200}>
                <Text
                 color='#271B3E'
                 fontFamily='Volkhov'
                 fontSize='18px'
                 opacity='70%'
                 fontWeight='700'
                 lineHeight='25px'>Full Name</Text>
                <Text
                  color='#705897'
                  fontFamily='Poppins'
                  fontSize='14px'
                  fontWeight='300'
                  lineHeight='25px'>
                 Your first and last name as on all recognized documents</Text>
            </Box>
            <Box>
                <Text
                 fontFamily='Poppins'
                 fontSize='12px'
                 fontWeight='semibold'
                 lineHeight='25px'
                 color='#B3A7C6'>First Name</Text>
                <input className='settings-input'
                value = {firstname}
                />
            </Box>
            <Box>
                <Text
                  fontFamily='Poppins'
                  fontSize='12px'
                  fontWeight='semibold'
                  lineHeight='25px'
                  color='#B3A7C6'>Last Name</Text>
                <input className='settings-input'
                value={lastname}/>
            </Box>
        </Flex>
        <Flex m='2rem 0' w='46%' justifyContent='space-between'>
            <Box>
                <Text
                 fontFamily='Volkhov'
                 fontSize='16px'
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                
                 color='#271B3E'>User name</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize='14px'
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >Update your user profile here</Text>
            </Box>
            <Box>
                <Text
                  fontFamily='Poppins'
                  fontSize='12px'
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>username</Text>
                <input className='settings-input'
                 value={username}/>
            </Box>
        </Flex>
        <Flex m='2rem 0' w='46%' justifyContent='space-between'>
            <Box>
                <Text
                 fontFamily='Volkhov'
                 fontSize='16px'
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                
                 color='#271B3E'>Gender</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize='14px'
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >How do you like to be called?</Text>
            </Box>
            <Box>
                <Text
                  fontFamily='Poppins'
                  fontSize='12px'
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>Sex</Text>
                <input className='settings-input'
                value={gender}/>
            </Box>
        </Flex>
        <Flex m='2rem 0' w='46%' justifyContent='space-between'>
            <Box>
                <Text
                 fontFamily='Volkhov'
                 fontSize='16px'
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                
                 color='#271B3E'>Email</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize='14px'
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >Enter a valid email address</Text>
            </Box>
            <Box>
                <Text
                  fontFamily='Poppins'
                  fontSize='12px'
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>Email address</Text>
                <input className='settings-input'
                value={useremail}/>
            </Box>
        </Flex>
        <Flex m='2rem 0' w='46%' justifyContent='space-between'>
            <Box>
                <Text
                 fontFamily='Volkhov'
                 fontSize='16px'
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                
                 color='#271B3E'>Phone number</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize='14px'
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >How can we reach you?</Text>
            </Box>
            <Box>
                <Text
                  fontFamily='Poppins'
                  fontSize='12px'
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>Phone number</Text>
                <input className='settings-input'
                value={phone_number}/>
            </Box>
        </Flex>
        <Flex justifyContent='center'><button className='settings-button'>Save changes</button></Flex>
    </Box>
    </>
  )
}
}

export default SettingsInfo