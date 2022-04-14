import React from 'react'
import './Sidebar.css'
import {GiHamburgerMenu } from 'react-icons/gi'
import {BsFillGridFill} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import {IoMdSettings} from 'react-icons/io'
import {AiOutlineUserDelete} from 'react-icons/ai'
import Logo from '../../Images/Logo.svg'
import {Box, Flex, Spacer,List,ListItem,ListIcon,} from '@chakra-ui/react'
import { Link } from 'react-router-dom'


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
        <List spacing={5} p='3rem 1rem'
        fontSize={20}
        fontWeight='500'
        fontFamily='Poppins'
        >
            <ListItem fontSize={20}>
                <ListIcon marginRight={5} as={BsFillGridFill} color='#898989' />
                  <Link to='/profile'>Dashboard</Link> 
            </ListItem>
            <ListItem>
                <ListIcon marginRight={5} as={MdPayment} color='#898989' />
                 <Link to='/profile/payment'>Payment</Link>
            </ListItem>
            <ListItem>
                <ListIcon marginRight={5} as={IoMdSettings} color='#898989' />
                <Link to='/profile/settings'>Settings</Link>
            </ListItem>
            <ListItem>
                <ListIcon marginRight={5} as={AiOutlineUserDelete} color='#898989' />
                Logout
            </ListItem>
        </List>
    </aside>
    </>
  )
}

export default Sidebar
