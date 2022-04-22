import React from 'react'
import { Sidebar } from '../../components'
import { Box, Flex, Text } from '@chakra-ui/react'
import { AiOutlineUserDelete } from 'react-icons/ai'
const Logout = () => {

    const logout = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("useremail");
        window.location.href = "/";
    }
  return (
    <>
    <Sidebar></Sidebar>
    <Box bg='#F5F5F5' h='100vh' marginLeft='17rem' p='4rem 5rem 3rem 5rem' display='block'>
    <Flex justifyContent='center' alignItems='center' w={200} h='3rem' bg='#2A0B9C' color='#ffffff' borderRadius='10px' 
   
    onClick={logout} cursor='pointer'>
        <Box ><AiOutlineUserDelete/></Box>
            <Text
              fontFamily='Poppins'
              fontSize='18px'
              color='#ffffff'
              p='0 5px'
              lineHeight='24px'
         > Logout</Text>
    </Flex>
    </Box>

    </>
  )
}

export default Logout
