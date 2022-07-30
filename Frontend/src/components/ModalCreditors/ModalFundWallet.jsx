import React, {useState} from 'react'
import {Box, Flex, SimpleGrid, Text, Icon, Select, Button} from '@chakra-ui/react'
//import './ModalAddCreditor.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GetEndpoint } from '../../services/Accessdetails'

const ModalFundWallet = ({setFundWalletModal}) => {
    const email = JSON.parse(localStorage.getItem('useremail'));
    const [amount, setAmount] = useState('')
    const [narration, setNarration] = useState('')
    const [alert, setAlert] = useState(false)

    const [redirect_url, setRedirect_url] = useState()
    const url = 'https://debt-fix.herokuapp.com/payment/deposit/'
    const clearModal = async(e)=>{
        if(amount, narration){
           
            setAlert(false)
            const details = {amount:amount, narration:narration, email:email}
            //console.log(details, "Fund wallet page")
            const DepositFunds = await GetEndpoint(details, url)
            const {authorization_url} = DepositFunds
            console.log(authorization_url)
            setRedirect_url(authorization_url)
            //window.location.replace = `/${authorization_url}`;
            
        }else{
            setRedirect_url('')
            console.log('NOt all details filled')
            setAlert(true)
        }
    }
    console.log('redirect_url', redirect_url)

    const closeModal =()=>{
        setAlert(false)
        setAmount('')
        setNarration('')
        setFundWalletModal(false)
        
    }
  return (
    <>
     <div className='modal-container'>
        <div id="myModal" class="modal">
            <div className="modal-profile-update">
                <Text
                    textAlign='center' 
                    fontSize={{md:'20px', sm:'18px', base:'15px', lg:'20px', xl:'20px'}}
                    fontFamily='Volkhov'
                    fontWeight='400'
                >Fund Wallet</Text>
                <Box bg='#FDFDFD' borderRadius={10}  >
                        <Text className='profile-label'>How much do you want to deposit?</Text>
                        <input className='profile-input'
                        type='number' id='amount' name='amount' required
                        onChange={e => { return setAlert(false), setAmount(e.target.value)}}
                ></input>
                </Box>
                <Box bg='#FDFDFD' borderRadius={10} >
                        <Text className='profile-label'>Narration</Text>
                        <input className='profile-input'
                         type='text' id='narration' name='narration' required
                         onChange={e => { return setAlert(false), setNarration(e.target.value)}}
                ></input>
                </Box>
            <Flex justifyContent='space-between' alignItems='center' w='100%' pt='2rem' >
                <Box className='white-background-button-container' >
                   <button onClick={clearModal} className='white-background-button'><span>Deposit to wallet</span> <span><AiOutlineArrowRight/></span></button>
                </Box>
                <Button size='md' color='#2A0B9C'  onClick={closeModal}>close</Button>
            </Flex>
            {alert && <Text textAlign='center' color='red' fontFamily='Poppins'>Fill in all the details</Text>}
            <a href={redirect_url} target="_blank" className='external-url'>{redirect_url? "click to deposit funds" : ''}</a>
            </div>
         </div>
    </div>
</>
  )
}

export default ModalFundWallet
