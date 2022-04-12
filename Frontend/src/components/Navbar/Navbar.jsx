import React, {useState} from 'react'
import {Text, Flex, Spacer, Box, Button} from '@chakra-ui/react'
import logo from '../../Images/Logo.svg'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { extendTheme } from '@chakra-ui/react'
import {AiOutlineMenuFold} from 'react-icons/ai'


// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '280px',
  md: '768px',
  lg: '996px',
  xl: '1200px',
  '2xl': '1536px',
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })
const Navbar = () => {
  const [showsidebar, setShowsidebar] = useState(false)
  const showbar = ()=>{
     setShowsidebar(!showsidebar)
  }
  return (
     <>
       <Flex m='0 auto' w='90vw'>
         <Box p='0.5rem 0rem'><img src={logo} alt="logo"></img></Box>
         <Spacer></Spacer>
         <Flex className='navbar-links' m='5px'>
           <Text fontFamily='Poppins' fontWeight={400} fontSize='16px' p='1rem 3rem'>Home</Text>
           <Text fontFamily='Poppins' fontWeight={400} fontSize='16px' p='1rem 3rem'>Product</Text>
           <Text fontFamily='Poppins' fontWeight={400} fontSize='16px' p='1rem 3rem'>About</Text>
         </Flex>
         <Spacer/>
         <Flex>
           <Box borderRadius={13} border='1px' borderColor='#3A1C6B' w={20} h={10} m='15px 0px'>
             <Link to='/signin'><button className='btn-signin'>Sign in</button></Link>
           </Box>
           <Box h={10} bg= '#3A1C6B' borderRadius={13} m='15px 10px' >
            <Link to='/signup'><button className='button'>Create free Account</button></Link>
           </Box>
           <Box onClick={showbar} display={{ lg: 'none' }} m={5} fontSize={30} color='#3A1C6B' ><AiOutlineMenuFold/></Box>
           <Box className='nav-links-container'>
           {showsidebar && 
            <ul className='nav-links'>
               <li>Home</li>
               <li>Product</li>
               <li>About</li>
            </ul>}
           </Box>
         </Flex>
       </Flex>
     </>
  )
}

export default Navbar
