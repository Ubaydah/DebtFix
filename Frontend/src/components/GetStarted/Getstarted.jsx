import React from 'react'
import {Flex,Box,Text, Spacer} from '@chakra-ui/react'
import RectanglePhoto from '../../Images/Rectangle.jpg'
const Getstarted = () => {
  return (
    <>
    <Box bg='#FBFBFB'w='90vw' m='2rem auto'>
        <Text
         fontFamily='Volkhov'
         fontSize='36px'
         fontWeight='bold'
         lineHeight='44px'
         color='#271B3E'
         textAlign='center'
         p='5rem 0 0 0'

        >With 3 easy steps, get started on DebtFix</Text>
        <Flex>
            <Box w='50%'><img src={RectanglePhoto} alt=""></img></Box>
            <Box display='flex' flexDirection='column' marginTop='60px' >
                <Flex >
                    <Box paddingTop={2}>
                        <Box w={30} h={30} border='2px' color='#2A0B9C' borderRadius='50%' textAlign='center' >1</Box>
                        <Box w={0.5} h='8rem' bg='#2A0B9C' m='5px 12px' ></Box>
                            
                    </Box>
                    
                    <Box textAlign='left' paddingLeft={9}>
                        <Text
                           fontFamily='Volkhov'
                           fontSize='24px'
                           fontWeight='bold'
                           lineHeight='36.12px'
                           color='#271B3E'
                     
                          >Create an Account</Text>
                          <Text
                          fontFamily='Poppins'
                          fontSize='20px'
                          fontWeight='300'
                          lineHeight='33px'
                          color='#271B3E'
                     
                         >Open an account with your username, email and password.</Text>
                    </Box>
                    
                </Flex>
                
                <Flex >
                    <Box paddingTop={2}>
                        <Box w={30} h={30} border='2px' color='#2A0B9C' borderRadius='50%' textAlign='center'>2</Box>
                        <Box w={0.5} h='8rem' bg='#2A0B9C' m='5px 12px' ></Box>
                    </Box>
                    
                     <Box textAlign='left' paddingLeft={9}>
                        <Text
                           fontFamily='Volkhov'
                           fontSize='24px'
                           fontWeight='bold'
                           lineHeight='36.12px'
                           color='#271B3E'
                     
                          >Add your Account</Text>
                          <Text
                          fontFamily='Poppins'
                          fontSize='20px'
                          fontWeight='300'
                          lineHeight='33px'
                          color='#271B3E'
                     
                         >Link your account to DebtFix and fund your wallet.</Text>
                    </Box>
                </Flex>
                
                <Flex >
                    <Box paddingTop={1}>
                        <Box  w={30} h={30} border='2px' color='#2A0B9C' borderRadius='50%' textAlign='center'>3</Box>
                    </Box>  
                     <Box textAlign='left' paddingLeft={9}>
                        <Text
                           fontFamily='Volkhov'
                           fontSize='24px'
                           fontWeight='bold'
                           lineHeight='36.12px'
                           color='#271B3E'
                     
                          >Save up and pay</Text>
                          <Text
                          fontFamily='Poppins'
                          fontSize='20px'
                          fontWeight='300'
                          lineHeight='33px'
                          color='#271B3E'
                     
                         >Build up your wallet, set payment dates and successfully offset your debts.</Text>
                    </Box>
                </Flex>
                                                                                                                                                                                                                                                                                                                                                                  
            </Box>
           
        </Flex>
    </Box>
    </>
  )
}

export default Getstarted
