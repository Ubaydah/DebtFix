import React from 'react'
import {Flex, Spacer, Text, Box, HStack, Avatar } from '@chakra-ui/react'
import logo from '../../Images/Logo.svg'
import { BsTwitter, BsInstagram} from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'


const Footer = () => {
  return (
    <>
      <Flex m='0 auto' w='90vw'marginBottom={20} bg='#FBFBFB'>
          <Box>
              <Box p='0.5rem 0rem'><img src={logo} alt="logo"></img></Box>
              <Text
                fontFamily='Poppins'
                fontSize='14px'
                fontWeight='300'
                lineHeight='19.69px'
                color='#786799'
                textAlign='center'
              >© 2022 DebtFix</Text>
              <Text
                fontFamily='Poppins'
                fontSize='14px'
                fontWeight='300'
                lineHeight='20px'
                color='#786799'
                textAlign='center'
              >All right reserved</Text>
          </Box>
          <Spacer/>
          <HStack spacing='34px'>
              <Box fontSize='1.5rem' color='#705897'> <BsTwitter/> </Box>
              <Avatar size='sm' color='white' bg='#705897' icon={<FaLinkedinIn fontSize='1.5rem' />} />
              <Box fontSize='1.5rem' color='#705897'><BsInstagram/></Box>
          </HStack>
      </Flex>
     
    </>
  )
}

export default Footer
