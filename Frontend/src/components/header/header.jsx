import React,{useEffect} from 'react'
import {Box, Flex, Text, Spacer} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import './header.css'
import Photo from '../../Images/PexelsPhoto.jpg'
import AOS from "aos";
import "aos/dist/aos.css";



const Header = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
   <>
     <Flex className='header-box' bg='#FCFBFF' w='90vw' m='0rem auto' flexDirection={{base:'column', lg:'row'}}>
       <Box data-aos="fade-up" data-aos-duration="2000" className='header-text-box'>
         <Text fontFamily='Volkhov'
             fontSize= {{lg:'74px',md:'60px',sm:'60px', base:'55px'}}
             fontWeight='400'
             line-height={{lg:'95px',md:'60px',sm:'45px'}}
             letter-spacing='0em'
             text-align='left'
             color='#271B3E'
             maxW='500px'
             className='header-text'
          >
           Overwhelmed  by your debt?
         </Text>
         <Text
           fontFamily='Poppins'
           fontSize={{lg:'22px',md:'18px',sm:'18px', base:'16px'}}
           fontWeight='300'
           line-height='40px'
           letter-spacing='0em'
           color='#271B3E'
           maxW={500}
           className='header-text'
         >With DebtFix, you can plan payments, save easily and live a stress-free life.</Text>
          <Box h='54px' bg= '#3A1C6B' borderRadius={13} m='30px auto' w='250px' textAlign='center'
           className='header-button'>
              <Link to='/signup'><button className='button-create'>Create free Account</button></Link>
          </Box>
       </Box>
       <Spacer/>
       <Box data-aos="fade-down" w='350px' h='541px' borderRadius='12.95px' borderColor='#705897' border='2px'
       className='header-image'>
          <img data-aos="zoom-in" data-aos-duration="2000" className='img' src={Photo}></img>
       </Box>
       
     </Flex>
     
   </>
  )
}

export default Header
