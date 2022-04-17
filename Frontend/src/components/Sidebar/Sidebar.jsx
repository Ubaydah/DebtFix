import React, {useState} from 'react'
import './Sidebar.css'
import {GiHamburgerMenu } from 'react-icons/gi'
import {BsFillGridFill} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import {IoMdSettings} from 'react-icons/io'
import {AiOutlineUserDelete} from 'react-icons/ai'
import Logo from '../../Images/Logo.svg'
import {Box, Flex, Spacer,List,ListItem,ListIcon,} from '@chakra-ui/react'
import { Link, NavLink } from 'react-router-dom'


const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    

  return (
    <>
    <aside className='profile-sidebar' w='13rem'>
        <Flex alignItems='center' p='1.5rem 1rem'>
            <Box fontSize={30} color='#705897'><GiHamburgerMenu/></Box>
            <Spacer/>
            <Box marginRight='2rem' width={99} h={25}><img src={Logo}></img></Box>
        </Flex>
        <List p='3rem 0.2rem'
        fontSize={18}
        fontWeight='500'
        fontFamily='Poppins'
        >
            <ListItem className='links-container'>
                <NavLink className='links' to='/profile/dashboard' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })}>
                   <ListIcon marginRight={5} as={BsFillGridFill} color='#898989' /> Dashboard
                </NavLink>
            </ListItem>
            <ListItem className='links-container'>
                 <NavLink className='links' to='/profile/creditors' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })} >
                    <ListIcon marginRight={5} as={MdPayment}  color='#898989' />Creditors
                </NavLink>
            </ListItem>
           
            <ListItem className='links-container'>
                <NavLink className='links' to='/profile/payment' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })} >
                    <ListIcon marginRight={5}  as={MdPayment}  color='#898989' />Payment
                </NavLink>
            </ListItem>
            <ListItem className='links-container'>
                <NavLink className='links' to='/profile/settings' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })}>
                    <ListIcon marginRight={5} as={IoMdSettings} color='#898989' />Settings
                </NavLink>
            </ListItem>
            <ListItem className='links-container'>
                <NavLink className='links' to='/profile/logout' style={({ isActive }) => ({ background: isActive ? "rgba(112, 88, 151, 0.15)" : "none" })} >
                    <ListIcon marginRight={5} as={AiOutlineUserDelete} color='#898989' />Logout
                </NavLink>
            </ListItem>
        </List>
    </aside>
    </>
  )
}

export default Sidebar
