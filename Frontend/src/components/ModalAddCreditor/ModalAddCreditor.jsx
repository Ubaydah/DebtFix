import React, {useState} from 'react'
import {Box, Flex, SimpleGrid, Text, Icon, Select, Button} from '@chakra-ui/react'
//import './ModalAddCreditor.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Frameprofile from '../../Images/Frame 632.svg'
import './Bank_data'
import { BankData } from './Bank_data'
import { GetEndpoint } from '../../services/Accessdetails'
  
  const ModalAddCreditor = ({setAddcreditorModal}) => {
      
    const [name, setName] = useState('')
    const [amount_owned, setAmount_owned] = useState('')
    const [bank_code, setBank_code] = useState('')
    const [account_number, setAccount_number] = useState('')
    const [alert, setAlert] = useState(false)
    const url = 'https://debt-fix.herokuapp.com/creditor/create/'

    const clearModal = async(e)=>{
        console.log(name, amount_owned, bank_code, account_number)
        console.log("bankcode", bank_code)
        if(name && amount_owned && bank_code && account_number){
            console.log('details filled')
            setAlert(false)
            const details = {name:name, amount_owned: amount_owned, bank_code:bank_code, account_number:account_number}
            console.log(details)
            const AddaCreditor = await GetEndpoint(details, url)
            console.log(AddaCreditor)
            setAddcreditorModal(false)
            
        }else{
            console.log('NOt all details filled')
            setAlert(true)
        }
        // 

    }
    const closeModal = ()=>{
        setAlert('')
        setAccount_number('')
        setName('')
        setBank_code('')
        setAmount_owned('')
        setAddcreditorModal(false)
    }
    
    return (
         
    <>
    <div className='modal-container'>
        
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
                        <Text className='profile-label'>Name</Text>
                        <input className='profile-input'
                        type='text' id='name' name='name' required
                        onChange={e => { return setAlert(false), setName(e.target.value)}}
                         ></input>
                    </Box>
                    <Box bg='#FDFDFD' borderRadius={10} >
                        <Text className='profile-label'>Amount Owned</Text>
                        <input className='profile-input'
                         type='number' id='amount-owned' name='amount-owned' required
                         onChange={e => { return setAlert(false), setAmount_owned(e.target.value)}}
                        ></input>
                    </Box>
                    <Box bg='#FDFDFD' borderRadius={10} >
                        <Text className='profile-label'>Bank code</Text>
                        <Select placeholder='Select option' size='sm' borderRadius={10}
                        onChange={e => { return setAlert(false),setBank_code(e.target.value)}}>
                            {BankData.map((bank)=>
                            <option  value={bank.code}>{bank.name}</option>
                            )}
                            
                        </Select>
                    </Box>
                     <Box bg='#FDFDFD' borderRadius={10}>
                         <Text className='profile-label'>Account Number</Text>
                        <input className='profile-input'
                        type='number' id='account_number' name='account_number' required
                        onChange={e =>{ return setAlert(false), setAccount_number(e.target.value)}}
                        ></input>
                    </Box>
                </SimpleGrid>
                <Flex onClick={clearModal} alignItems='center' justifyContent='center'  bg='#2A0B9C' h='40px' w='205px' color='#2A0B9C' m='20px auto' borderRadius={10} cursor='pointer'>
                     <Text
                    fontFamily='Poppins'
                    fontSize='16px'
                    color='#ffffff'
                    p='0 5px'
                    lineHeight='24px'
                    >Add Creditor</Text>
                    <Icon as={AiOutlineArrowRight} color='white' fontSize='20px' mr='20px'/>
                        
                </Flex>
                <Button size='xs' color='red' onClick={closeModal}>close</Button>
                {alert && <Text textAlign='center' color='red' fontFamily='Poppins'>Fill in all the details</Text>}
                          
            </div>
        </div>
    </div>
    </>
 
    )
  }
  
  export default ModalAddCreditor
  