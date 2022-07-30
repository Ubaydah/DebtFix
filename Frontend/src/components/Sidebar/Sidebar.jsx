import React, {useEffect, useState, useRef} from 'react'
import './Sidebar.css'
import {BsFillGridFill} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import {IoMdSettings} from 'react-icons/io'
import {AiOutlineUserDelete,AiOutlineClose} from 'react-icons/ai'
import Logo from '../../Images/Logo.svg'
import {Box, Flex, List,ListItem,ListIcon,} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
   

    const node = useRef();

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("useremail");
       
    }
    

    const closeSidebar = ()=>{
        document.getElementById("sidenav").style.width = "0";
        
        document.getElementById("links-cont").style.display = "none";

    }

    const handleClick = e => {
        if(window.innerWidth <=815 ){
            if (node.current.contains(e.target)) {
                // inside click
                return;
            }
            
            document.getElementById("sidenav").style.width = "0"; 
              // outside click 
        }
        
      };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
         // return function to be called when unmounted
           return () => {
          document.removeEventListener("mousedown", handleClick);
        };
        
      }, []);
            

  return (
    <>
    <aside ref={node}  className='profile-sidebar' id='sidenav'>
        <Flex className='sidebar-menu' > {/*p='1.5rem 1rem'*/} 
            <Box  className='sidebar-logo'><img src={Logo}></img></Box>
            <Box onClick={closeSidebar} className='sidebar-close-menu' fontSize={{base:'25px',md:'30px'}} pt='8px' color='#705897' fontWeight='bold'><AiOutlineClose/></Box>
        </Flex>
        <List p={{lg:'1rem 0.2rem', md:'1rem 0.2rem', sm:'3rem 0.3rem', base:'3rem 0.3rem'}}
           display='block'
           fontSize={18}
           fontWeight='500'
           fontFamily='Poppins'
           w='16rem'
           >
            <ListItem id='links-cont' className='links-container'>
                <NavLink className='links' to='/profile/dashboard' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })}>
                   <ListIcon marginRight={5} as={BsFillGridFill} color='#898989' />Dashboard
                </NavLink>
            </ListItem>
            <ListItem id='links-cont' className='links-container'>
                 <NavLink className='links' to='/profile/creditors' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })} >
                    <ListIcon marginRight={5} as={MdPayment}  color='#898989' />Creditors
                </NavLink>
            </ListItem>
           
            <ListItem id='links-cont' className='links-container'>
                <NavLink className='links' to='/profile/payment' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })} >
                    <ListIcon marginRight={5}  as={MdPayment}  color='#898989' />Payment
                </NavLink>
            </ListItem>
            <ListItem id='links-cont' className='links-container'>
                <NavLink className='links' to='/profile/settings' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })}>
                    <ListIcon marginRight={5} as={IoMdSettings} color='#898989' />Settings
                </NavLink>
            </ListItem>
            <ListItem id='links-cont' className='links-container' onClick={logout}>
                <NavLink onClick={logout} to='/' className='links' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })} >
                    <ListIcon marginRight={5} as={AiOutlineUserDelete} color='#898989' />Logout
                </NavLink>
            </ListItem>
        </List>
    </aside>
    </>
  )
}

export default Sidebar
