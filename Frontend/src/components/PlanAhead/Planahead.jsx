import React, {useEffect} from 'react'
import {Box, Flex,Text, Center} from '@chakra-ui/react'
import './Planahead.css'
import { Link } from 'react-router-dom'

import AOS from "aos";
import "aos/dist/aos.css";


const Planahead = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);  

  return (
    <>
    <Center data-aos="flip-up" data-aos-anchor-placement="top-bottom"  bg='#705897'w='90vw' m='4rem auto' borderRadius={25} overflow='hidden'>
      <Box maxW='800px' textAlign='center' p={{base:'5',sm:'5',md:'10'}}>
          <Text
           fontFamily='Volkhov'
           fontSize= {{lg:'36px',md:'32px',sm:'28px', base:'28px'}}
           fontWeight='bold'
           lineHeight={{lg:'46.44px',md:'30px'}}
           color='#FFFFFF'
           textAlign='center'
           p='1rem 0 0 0'
           data-aos="fade-down-left"
           data-aos-duration="2000"
          >
          We help you plan ahead and offset bills without worry.
          </Text>
          <Text
            fontFamily='Volkhov'
            fontSize={{lg:'22px',md:'19px',sm:'17px', base:'17px'}}
            fontWeight='hairline'
            lineHeight={{lg:'33px',md:'30px'}}
            color='#FFFFFF'
            textAlign='center'
            p='1.7rem 0 0 0'
            data-aos="fade-down-right"
            data-aos-duration="2000"
          >
            DebtFix has come to alleviate any financial worry in the best way possible. 
            Whether debts, bills or monetary promises, 
            DebtFix will fix it all with just one click.
          </Text>
          <Link data-aos="zoom-in" data-aos-duration="2000" to='/signup'><button  className='button-create-now'>Create free Account</button></Link>
         
      </Box>
    </Center>
    </>
  )
}

export default Planahead
