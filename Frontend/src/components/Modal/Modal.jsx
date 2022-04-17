import React, {useState} from 'react'
import {Box, Flex, SimpleGrid, Text, Icon} from '@chakra-ui/react'
import './Modal.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import welcomeImg from '../../Images/Welcome.png'
import { GetEndpoint} from '../../services/Accessdetails'
const ModalUser = () => {

    const username = JSON.parse(localStorage.getItem('username'))


    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone_number, setPhonenumber] = useState('')
    const [gender, setGender] = useState('')
    const url = 'https://debt-fix.herokuapp.com/profile/create/'

    const [modal, setModal] = useState(true)
    const [nextmodal, setNextModal]  = useState(false)
    const editProfile =()=>{
        setModal(false)
        setNextModal(true)
    }
    const  clearModal = async(e)=>{
        const details = { firstname: firstname, lastname: lastname, gender:gender, phone_number:phone_number}
        console.log(details)
        const createProfile = await GetEndpoint(details, url)
        console.log(createProfile)
        setNextModal(false)
    }

   
    if(modal){
return (
    <>
    <div className='modal-container'>
    <button id="myBtn">Open Modal</button>
    <div id="myModal" class="modal">
        <div className={modal? "modal-content ModalOpen" : "modal-content ModalClosed"}>
            <Box w='12rem'h='12rem'  m='0 auto' objectFit='cover' ><img className='welcome-img' src={welcomeImg}></img></Box>
             <Text 
             textAlign='center'
             fontFamily='Volkhov'
             fontWeight='700'
             fontSize='20px'
             color='#000000'
             textTransform='capitalize'
             >Welcome onboard {username}!</Text>
                 
            <Text 
             textAlign='center'
             fontFamily='Poppins'
             fontWeight='300'
             fontSize='16px'
             color='#000000'
             pb='5px'
             >Lets get to know you better</Text>
             <Box m='10px 60px' onClick={editProfile}><button className='profile-btn'>Add Creditor <AiOutlineArrowRight/> </button></Box>
        </div>
    </div>
    </div>
    </>
    )}
    if (nextmodal){
        return(
            <>
            <div className='modal-container'>
                <button id="myBtn">Open Modal</button>
                <div id="myModal" class="modal">
                    <div className="modal-profile-update">
                        <Text
                         textAlign='center' 
                         fontSize='20px'
                         fontFamily='Volkhov'
                         fontWeight='400'
                        >Profile</Text>
                        <SimpleGrid minChildWidth='120px' spacing='30px' w='100%'>
                            <Box bg='#FDFDFD' borderRadius={10}  >
                                <Text className='profile-label'>First Name</Text>
                                <input className='profile-input'
                                 type='text' id='firstname' name='firstname' required
                                 onChange={e => setFirstname(e.target.value)}
                                ></input>
                            </Box>
                            <Box bg='#FDFDFD' borderRadius={10} >
                                <Text className='profile-label'>Last Name</Text>
                                <input className='profile-input'
                                type='text' id='lastname' name='lastname' required
                                onChange={e => setLastname(e.target.value)}
                                ></input>
                            </Box>
                            <Box bg='#FDFDFD' borderRadius={10} >
                                <Text className='profile-label'>Phone number</Text>
                                <input className='profile-input'
                                type='number' id='phone_number' name='phone_number' required
                                onChange={e => setPhonenumber(e.target.value)}
                                ></input>
                            </Box>
                            <Box bg='#FDFDFD' borderRadius={10}>
                                <Text className='profile-label'>Gender</Text>
                                <input className='profile-input'
                                type='text' id='gender' name='gender' required
                                onChange={e => setGender(e.target.value)}
                                ></input>
                            </Box>
                        </SimpleGrid>
                        <Flex onClick={clearModal} alignItems='center' justifyContent='center'  bg='#2A0B9C' h='40px' w='205px' color='#2A0B9C' m='30px auto' borderRadius={10} cursor='pointer'>
                            <Text
                            fontFamily='Poppins'
                            fontSize='16px'
                            color='#ffffff'
                            p='0 5px'
                            lineHeight='24px'
                            >Save and Continue</Text>
                            <Icon as={AiOutlineArrowRight} color='white' fontSize='20px' mr='20px'/>
                        
                        </Flex>
                          
                    </div>
                </div>
            </div>
            </>)}
  }

export default ModalUser
