import React, {useEffect, useState} from 'react'
import {Text, Flex, Spacer, Box, Button} from '@chakra-ui/react'
import logo from '../../Images/Logo.svg'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { extendTheme } from '@chakra-ui/react'
import {AiOutlineMenuFold} from 'react-icons/ai'


// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '300px',
  md: '768px',
  lg: '996px',
  xl: '1200px',
  
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })
const Navbar = () => {
   const [showsidebar, setShowsidebar] = useState(false)
   const showbar = ()=>{
      setShowsidebar(!showsidebar)
    }

   function getHeight(){
     console.log(window.innerHeight)
    }
   useEffect(()=>{
      console.log(window.pageYOffset,'scroll')
    })


  return (
     <>
       <Flex m='0 auto 1rem auto' w='90vw' >
          <Box p='0.5rem 0rem'><img src={logo} alt="logo"></img></Box>
          <Spacer></Spacer>
          <Flex className='navbar-links' m='5px'>
            <Text fontFamily='Poppins' fontWeight={400} fontSize='16px' p='1rem 3rem'>Home</Text>
            <Text fontFamily='Poppins' fontWeight={400} fontSize='16px' p='1rem 3rem'>Product</Text>
            <Text fontFamily='Poppins' fontWeight={400} fontSize='16px' p='1rem 3rem'>About</Text>
          </Flex>
         <Spacer/>
         <Flex>
            <Box className='navbar-links-sign' borderRadius={13} border='1px' borderColor='#3A1C6B' w={20} h={10} m='15px 0px'>
              <Link to='/signin'><button className='btn-signin'>Sign in</button></Link>
            </Box>
            <Box className='navbar-links-sign' h={10} bg= '#3A1C6B' borderRadius={13} m='15px 10px' >
              <Link to='/signup'><button className='button'>Create free Account</button></Link>
             </Box>
            <Box onClick={showbar} className='displayHamburgerMenu' m='17px 0 0 0' fontSize={30} color='#3A1C6B'><AiOutlineMenuFold/></Box>
         </Flex>
       </Flex>
       {showsidebar && <Box className='nav-links-container'>
             <ul className='nav-links'>
                 <li>Home</li>
                 <li>Product</li>
                 <li>About</li>
                 <Flex alignItems='center' mt='10px'>
                    <Box className='btn-signnin-container'mr='10px' >
                      <Link to='/signin' className='sign-navbar'>Sign in</Link>
                    </Box>
                    <Box className='btn-signnin-container' >
                      <Link to='/signup' className='create-navbar'>create free account</Link>
                    </Box>
                 </Flex>
               </ul>
       </Box>}
     </>
  )
}

export default Navbar
