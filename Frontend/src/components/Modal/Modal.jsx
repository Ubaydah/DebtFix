import React, {useState} from 'react'
import {Box, Center, SimpleGrid, Text, Select, Flex} from '@chakra-ui/react'
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


    const [alertProfile, setAlertProfile] = useState()

    const [modal, setModal] = useState(true)
    const [nextmodal, setNextModal]  = useState(false)
    const editProfile =()=>{
        setModal(false)
        setNextModal(true)
    }
    const  clearModal = async(e)=>{
        setAlertProfile('')

        if(firstname, lastname,gender, phone_number){
            console.log(firstname, lastname, gender, phone_number)
            
            try {
                const details = { firstname: firstname, lastname: lastname, gender:gender, phone_number:phone_number}
                console.log(details)
                const createProfile = await GetEndpoint(details, url)
                console.log(createProfile)
                setAlertProfile('')
                 setNextModal(false)
            } catch (error) {
                console.log(error)
                setAlertProfile("Profile isn't saved, Try again!")
                setFirstname('')
                setLastname('')
                setGender('')
                setPhonenumber('')
                console.log(firstname, lastname, 'after erorrrrr')
            }
        }else{
            setAlertProfile('Please fill in every details')
        }
        
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
             fontSize={{base:'15px',sm:'16',md:'18px',lg:'20px'}}
             color='#000000'
             textTransform='capitalize'
             >Welcome onboard {username}!</Text>
                 
            <Text 
             textAlign='center'
             fontFamily='Poppins'
             fontWeight='300'
             fontSize={{base:'11px',sm:'12px',md:'15px',lg:'16px'}}
             color='#000000'
             pb='5px'
             >Lets get to know you better</Text>
            <Box  w='100%' m='10px auto' onClick={editProfile}><button className='profile-btn'>Edit Profile <AiOutlineArrowRight/> </button></Box>
           
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
                         fontSize={{base:'17px',md:'20px'}}
                         fontFamily='Volkhov'
                         fontWeight='400'
                        >Profile</Text>
                        <SimpleGrid minChildWidth='100px' spacing='20px' w='100%'>
                            <Box bg='#FDFDFD' borderRadius={10}  >
                                <Text fontSize={{base:'12px',md:'16px'}}className='profile-label'>First Name</Text>
                                <input className='profile-input'
                                 type='text' id='firstname' name='firstname' required
                                 onChange={e => {return setAlertProfile(''),setFirstname(e.target.value)}}
                                ></input>
                            </Box>
                            <Box bg='#FDFDFD' borderRadius={10} >
                                <Text fontSize={{base:'14px',md:'16px'}} className='profile-label'>Last Name</Text>
                                <input className='profile-input'
                                type='text' id='lastname' name='lastname' required
                                onChange={e => {return setAlertProfile(''), setLastname(e.target.value)}}
                                ></input>
                            </Box>
                            <Box bg='#FDFDFD' borderRadius={10} >
                                <Text fontSize={{base:'14px',md:'16px'}} className='profile-label'>Phone number</Text>
                                <input className='profile-input'
                                type='number' id='phone_number' name='phone_number' required
                                onChange={e => {return setAlertProfile(''), setPhonenumber(e.target.value)}}
                                ></input>
                            </Box>
                            <Box bg='#FDFDFD' borderRadius={10}>
                                <Text fontSize={{base:'14px',md:'16px'}} className='profile-label'>Gender</Text>
                                <Select placeholder='Select option' size='sm' borderRadius={10}
                                    value={gender}
                                    onChange={e => { return setAlertProfile(''), setGender(e.target.value)}}>
                                   <option value='female'>Female</option>
                                   <option value='male'>Male</option>
                                </Select>
                            </Box>
                        </SimpleGrid>
                        <Text textAlign='center' fontFamily='Poppins' color='red'
                         fontSize={13} fontStyle='italic' mt='10px'
                            >{alertProfile}</Text>
                        <Box w='100%' m='2rem auto' >
                            <Center><button onClick={clearModal} className='white-background-button save-btn'><span>Save and Continue</span> <span><AiOutlineArrowRight/></span></button></Center>
                       </Box>
                    </div>
                </div>
            </div>
            </>)}
  }

export default ModalUser
