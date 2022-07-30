import React,{useEffect} from 'react'
import {Flex,Box,Text, Spacer} from '@chakra-ui/react'
import RectanglePhoto from '../../Images/Rectangle.jpg'
import './GetStarted.css'

import AOS from "aos";
import "aos/dist/aos.css";

const Getstarted = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []); 

  return (
    <>
    <Box bg='#FBFBFB'w='90vw' m='2rem auto' overflow='hidden'>
        <Text
         fontFamily='Volkhov'
         fontSize={{base:'27px',lg:'36px', md:'34px', sm:'28px'}}
         fontWeight='bold'
         lineHeight='44px'
         color='#271B3E'
         textAlign='center'
         p='5rem 0 0 0'
         data-aos="zoom-in-up"
        >With 3 easy steps, get started on DebtFix</Text>
        <Flex flexDirection={{xl:'row', lg:'row', md:'column', sm:'column', base:'column'}}>
            <Box data-aos="fade-up" data-aos-duration="2000" bg='#fbfbfb' w={{base:'100%',lg:'50%'}}><img src={RectanglePhoto} alt=""></img></Box>
            <Box display='flex' flexDirection={{base:'column',lg:'column',sm:'column', md:'row'}} marginTop='60px' >
                <Flex >
                    <Box paddingTop={2} >
                        <Box w={30} h={30} border='2px' color='#2A0B9C' borderRadius='50%' textAlign='center' >1</Box>
                        <Box w={0.5} h='8rem' bg='#2A0B9C' m='6px 12px' ></Box>
                            
                    </Box>
                    
                    <Box data-aos="fade-up" data-aos-duration="2000" textAlign='left' paddingLeft={{lg:9,base:3}}>
                        <Text
                           fontFamily='Volkhov'
                           fontSize={{lg:'24px', sm:'20px'}}
                           fontWeight='bold'
                           lineHeight='36.12px'
                           color='#271B3E'
                     
                          >Create an Account</Text>
                          <Text
                          fontFamily='Poppins'
                          fontSize={{lg:'20px', sm:'17px'}}
                          fontWeight='300'
                          lineHeight={{lg:'33px', sm:'27px'}}
                          color='#271B3E'
                     
                         >Open an account with your username, email and password.</Text>
                    </Box>
                    
                </Flex>
                
                <Flex >
                    <Box  paddingTop={1}>
                        <Box w={30} h={30} border='2px' color='#2A0B9C' borderRadius='50%' textAlign='center'>2</Box>
                        <Box w={0.5} h='8rem' bg='#2A0B9C' m='5px 12px' ></Box>
                    </Box>
                    
                     <Box data-aos="fade-down" data-aos-duration="2000" textAlign='left' paddingLeft={{lg:9,base:3}}>
                        <Text
                           fontFamily='Volkhov'
                           fontSize={{lg:'24px', sm:'20px'}}
                           fontWeight='bold'
                           lineHeight='36.12px'
                           color='#271B3E'
                     
                          >Add your Account</Text>
                          <Text
                          fontFamily='Poppins'
                          fontSize={{lg:'20px', sm:'17px'}}
                          fontWeight='300'
                          lineHeight={{lg:'33px', sm:'27px'}}
                          color='#271B3E'
                     
                         >Link your account to DebtFix and fund your wallet.</Text>
                    </Box>
                </Flex>
                
                <Flex >
                    <Box paddingTop={1}> 
                        <Box  w={30} h={30} border='2px' color='#2A0B9C' borderRadius='50%' textAlign='center'>3</Box>
                        <Box display={{base:'none',lg:'none',sm:'none', md:'block'}} w={0.5} h='8rem' bg='#2A0B9C' m='5px 12px' ></Box>
                    </Box>  
                     <Box data-aos="fade-up" data-aos-duration="2000" textAlign='left' paddingLeft={{lg:9,base:3}}>
                        <Text
                           fontFamily='Volkhov'
                           fontSize={{lg:'24px', sm:'20px'}}
                           fontWeight='bold'
                           lineHeight='36.12px'
                           color='#271B3E'
                     
                          >Save up and pay</Text>
                          <Text
                          fontFamily='Poppins'
                          fontSize={{lg:'20px', sm:'17px'}}
                          fontWeight='300'
                          lineHeight={{lg:'33px', sm:'27px'}}
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
