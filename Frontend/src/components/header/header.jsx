import React from 'react'
import {Box, Flex, Text, Spacer} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import './header.css'
import Photo from '../../Images/PexelsPhoto.jpg'

const Header = () => {
  return (
   <>
     <Flex className='header-box' bg='#FCFBFF' w='90vw' m='0rem auto' flexDirection={{base:'column', lg:'row'}}>
       <Box className='header-text-box'>
         <Text fontFamily='Volkhov'
             fontSize= {{lg:'74px',md:'60px',sm:'45px'}}
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
           fontSize={{lg:'22px',md:'18px',sm:'18px'}}
           fontWeight='300'
           line-height='33px'
           letter-spacing='0em'
           color='#271B3E'
           maxW={500}
           className='header-text'
         >With DebtFix, you can plan payments, save easily and live a stress-free life.</Text>
          <Box h='54px' bg= '#3A1C6B' borderRadius={13} m='30px 0px' w='250px' textAlign='center'
           className='header-button'>
              <Link to='/signup'><button className='button-create'>Create free Account</button></Link>
          </Box>
       </Box>
       <Spacer/>
       <Box w='350px' h='541px' borderRadius='12.95px' borderColor='#705897' border='2px'
       className='header-image'>
          <img className='img' src={Photo}></img>
       </Box>
       
     </Flex>
     
   </>
  )
}

export default Header
