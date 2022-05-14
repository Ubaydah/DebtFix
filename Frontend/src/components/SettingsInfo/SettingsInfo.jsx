import React, {useState, useEffect} from 'react'
import {Box, Flex, Text, Spacer, Avatar, Input} from '@chakra-ui/react'
import {GiHamburgerMenu } from 'react-icons/gi'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import { UpdateDetails } from '../../services/Accessdetails'
import Loading from '../Loading/Loading'
import './SettingsInfo.css'
import SettingsPassword from './SettingsPassword'

const SettingsInfo = () => {

  /*const [screenSize, setScreenSize] = useState(window.innerWidth)
   
  const checkSize = ()=>{
    //console.log(window.innerWidth)
    return setScreenSize(window.innerWidth)
   }
   useEffect(()=>{
    window.addEventListener('resize', checkSize)
       return ()=>{
           window.removeEventListener('resize', checkSize)
       }
   }) 
   useEffect(()=>{
    if (screenSize >=815) { 
      document.getElementById("sidenav").style.width = "16rem";
      document.getElementById("links-cont").style.display = "block";
    }

  })*/

    const [id, setId] = useState();
    const updateUrl = `https://debt-fix.herokuapp.com/profile/${id}/update/`

    const [userinfo, setUserinfo] = useState()
    const useremail = JSON.parse(localStorage.getItem('useremail')) 
    const username = JSON.parse(localStorage.getItem('username'))
    const [status, setStatus] = useState()

    const [loading, setLoading] = useState(true)

    const [backColor,setBackColor] = useState('profile')
    const [displayProfile, setDisplayProfile] = useState(true)
 
    const [email, setEmail] = useState('')
    const [user, setUser] = useState()
    const [gender, setGender] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [phonenumber, setPhonenumber] = useState()

  const url = `https://debt-fix.herokuapp.com/profile/get/`

  async function getUserInfo(url){
    const token = localStorage.getItem('accessToken');
     const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }
    
    const response = await fetch(url,option)
    const res = await response.json()
    setLoading(false)
    setUserinfo(res)
    setEmail(useremail)
    setLastname(res.lastname)
    setFirstname(res.firstname)
    setPhonenumber(res.phone_number)
    setGender(res.gender)
    
    setId(res.id)
    return res
   }
  useEffect(()=>{
    getUserInfo(url)
  },[])

  const updateChanges = async(e)=>{
    const details = { firstname:firstname, lastname:lastname, gender:gender, "phone_number":phonenumber, email:email}
    console.log(details)
    const updateInfo = await UpdateDetails(updateUrl, details)
    console.log(updateInfo)
    getUserInfo(url)
    
      setStatus("Updated Successfully")
  }
  const setUpdateColor = (color)=>{
    setBackColor(color)
    if (color === 'profile'){
      setDisplayProfile(true)
    }else{
      setDisplayProfile(false)
    }
  }

  const openSidebar = ()=>{
    document.getElementById("sidenav").style.width = "16rem";
    document.getElementById("links-cont").style.display = "block";
  }

  if (loading) {
    return <Loading/>
  }
  if (userinfo) {
      
  return (
    <>
    <Box className='settings-container' bg='#F5F5F5' marginLeft='16rem' p='0rem 0.5rem 4rem 0.5rem'>
    <Box onClick={openSidebar} className='sidebar-open-menu' fontSize={20}  color='#705897' fontWeight='bold'><GiHamburgerMenu/></Box>
       {/*<Flex justifyContent='flex-end'  mb='0' >
          <Box m={4} bg='white' w={33} h={33} borderRadius={5} pos='relative' ><BsSearch className='icon'/></Box>
          <Box m={4} p='0rem auto' bg='white'  w={33} h={33} borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
       </Flex>*/}
        <Text
        fontFamily='Volkhov'
        fontSize={{base:'18px',sm:'20px',md:'24px'}}
        fontWeight='700'
        lineHeight='25px'
        color='#271B3E'
        pt={10}
        >Settings</Text>
        <Text
         color='#705897'
         fontFamily='Poppins'
         fontSize={{base:'12px',sm:'13px',md:'14px'}}
         fontWeight='300'
         lineHeight='25px'
        >Update your personal information and make changes to your account</Text>
        <Flex className='info-heading-topic-settings-container' w='70%'  borderRadius={10}  m='1rem 0' cursor='pointer'>
            <Box className='info-heading-topic-settings' bg={backColor==='profile'?'#705897' :'white'} onClick={()=>setUpdateColor('profile')} textAlign='center' w='50%' p={3} transition='all 0.5s linear' borderBottomLeftRadius={10} borderTopLeftRadius={10}><Text
              color={backColor==='profile'? 'white' :'#705897'}
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='600'
              lineHeight='25px'>Profile</Text></Box>
            <Box className='info-heading-topic-settings' bg={backColor==='settings'?'#705897' :'white'} onClick={()=>setUpdateColor('settings')} textAlign='center' w='50%'  p={3} transition='all 0.5s linear' borderBottomRightRadius={10} borderTopRightRadius={10}><Text
               color={backColor==='settings'? 'white' :'#705897'}
               fontFamily='Poppins'
               fontSize='14px'
               fontWeight='600'
               lineHeight='25px'>Settings</Text></Box>
        </Flex>
        {displayProfile && <Box>
          <Flex className='settings-update-img' w='40%' p='2rem 0'>
            <Box>
                <Text
                    color='#271B3E'
                    fontFamily='Volkhov'
                    fontSize='18px'
                    fontWeight='700'
                    lineHeight='25px'
                    opacity='70%'
                >Upload a profile picture</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize='14px'
                   fontWeight='300'
                   lineHeight='25px'>
                  Select a new avatar to be used .
                </Text>
            </Box>
            <Spacer/>
            <Avatar size='lg' bg='#8872AC' opacity='60%' icon={<BsCamera fontSize='1.5rem' />} />
        </Flex>
      <Box w='80%' className='settings-item-container'>
        <Flex className='settings-item' justifyContent='space-between' w='100%'>
            <Box className='settings-item-label' maxW='30%'>
                <Text
                 color='#271B3E'
                 fontFamily='Volkhov'
                 fontSize={{md:'18px', base:'14px'}}
                 opacity='70%'
                 fontWeight='700'
                 lineHeight='25px'>Full Name</Text>
                <Text
                  color='#705897'
                  fontFamily='Poppins'
                  fontSize={{md:'14px', base:'12px'}}
                  fontWeight='300'
                  lineHeight='25px'>
                 Your first and last name as on all recognized documents</Text>
            </Box>
            <Box className='settings-item-input' w='35%'>
                <Text
                 fontFamily='Poppins'
                 fontSize={{md:'12px', base:'10px'}}
                 fontWeight='semibold'
                 lineHeight='25px'
                 color='#B3A7C6'>First Name</Text>
                <input className='settings-input'
                value = {firstname}
                onChange={e => {  return setFirstname(e.target.value)}}
                />
            </Box>
            <Box className='settings-item-input second-input' w='35%'>
                <Text
                  fontFamily='Poppins'
                  fontSize={{md:'12px', base:'10px'}}
                  fontWeight='semibold'
                  lineHeight='25px' 
                  color='#B3A7C6'>Last Name</Text>
                <input className='settings-input'
                value={lastname}
                onChange={e => {  return setLastname(e.target.value)}}/>
            </Box>
        </Flex>
         
        <Flex className='settings-item-2' m='2rem 0' w='100%' justifyContent='space-between'>
            <Box className='settings-item-2-label' w='30%'>
                <Text
                 fontFamily='Volkhov'
                 fontSize={{md:'16px', base:'14px'}}
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                 color='#271B3E'>User name</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize={{md:'14px', base:'12px'}}
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >Update your user profile here</Text>
            </Box>
            <Box className='settings-item-2-input' w='35%'>
                <Text
                  fontFamily='Poppins'
                  fontSize={{md:'12px', base:'1px'}}
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>username</Text>
                <input className='settings-input' disabled
                 value={username}/>
            </Box>
            <Box w={{base:'0' ,small:'0',md:'35%',lg:'35%'}}>
            </Box>
        </Flex>
        <Flex className='settings-item-2' m='2rem 0' w='100%' justifyContent='space-between'>
            <Box className='settings-item-2-label' w='30%'>
                <Text
                 fontFamily='Volkhov'
                 fontSize={{md:'16px', base:'14px'}}
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                
                 color='#271B3E'>Gender</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize={{md:'14px', base:'12px'}}
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >How do you like to be called?</Text>
            </Box>
            <Box className='settings-item-2-input' w='35%'>
                <Text
                  fontFamily='Poppins'
                  fontSize={{md:'12px', base:'10px'}}
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>Sex</Text>
                <input className='settings-input item2-input'
                value={gender}
                onChange={e => {  return setGender(e.target.value)}}/>
            </Box>
            <Box w={{base:'0' ,small:'0',md:'35%',lg:'35%'}}>
            </Box>
        </Flex>
        <Flex className='settings-item-2' m='2rem 0' w='100%' justifyContent='space-between'>
            <Box className='settings-item-2-label' w='30%'>
                <Text
                 fontFamily='Volkhov'
                 fontSize={{md:'16px', base:'14px'}}
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                
                 color='#271B3E'>Email</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize={{md:'14px', base:'12px'}}
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >Enter a valid email address</Text>
            </Box>
            <Box  className='settings-item-2-input' w='35%'>
                <Text
                  fontFamily='Poppins'
                  fontSize={{md:'12px', base:'10px'}}
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>Email address</Text>
                <input className='settings-input'
                value={email}
                onChange={e => {  return setEmail(e.target.value)}}/>
            </Box>
            <Box w={{base:'0' ,small:'0',md:'35%',lg:'35%'}}>
            </Box>
        </Flex>
        <Flex className='settings-item-2' m='2rem 0' w='100%' justifyContent='space-between'>
            <Box className='settings-item-2-label' w='30%'>
                <Text
                 fontFamily='Volkhov'
                 fontSize={{md:'16px', base:'14px'}}
                 fontWeight='700'
                 lineHeight='25px'
                 opacity='70%'
                 color='#271B3E'>Phone number</Text>
                <Text
                   color='#705897'
                   fontFamily='Poppins'
                   fontSize={{md:'14px', base:'12px'}}
                   fontWeight='300'
                   opacity='70%'
                   lineHeight='25px'
                   pt='5px'
                 >How can we reach you?</Text>
            </Box>
            <Box className='settings-item-2-input' w='35%'>
                <Text
                  fontFamily='Poppins'
                  fontSize={{md:'12px', base:'10px'}}
                  fontWeight='600'
                  lineHeight='25px'
                  color='#8872AC'>Phone number</Text>
                <input className='settings-input'
                value={phonenumber}
                onChange={e => {  return setPhonenumber(e.target.value)}}/>
            </Box>
            <Box w={{base:'0' ,small:'0',md:'35%',lg:'35%'}}>
            </Box>
        </Flex>
        <Text fontSize={{md:'15px', base:'12px'}} fontFamily='Poppins' fontStyle='italic' color='green' textAlign='center'>{status}</Text>
        <Flex justifyContent='center'>
           
           <Box className='white-background-button-container'>
              <button onClick={updateChanges} className='white-background-button'><span>Save Changes</span></button>
            </Box>
        </Flex>
        </Box>
      </Box>}

      {!displayProfile && <SettingsPassword/>}
    </Box>
    </>)
  }
}

export default SettingsInfo
