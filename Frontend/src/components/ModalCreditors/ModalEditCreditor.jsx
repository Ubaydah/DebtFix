import React, {useState} from 'react'
import {Box, Flex, SimpleGrid, Text, Icon, Select, Button} from '@chakra-ui/react'
//import './ModalAddCreditor.css'
import { AiOutlineArrowRight , AiOutlineClose} from 'react-icons/ai'
import Frameprofile from '../../Images/Frame 632.svg'
import './Bank_data'
import { BankData } from './Bank_data'
import { UpdateDetails } from '../../services/Accessdetails'
  
  const ModalEditCreditor = ({setEditcreditorModal,creditorid,editName, editAmount_owned,editAccount_number, editBank_code}) => {
      
    const [name, setName] = useState(editName)
    const [amount_owned, setAmount_owned] = useState(editAmount_owned)
    const [bank_code, setBank_code] = useState(editBank_code)
    const [account_number, setAccount_number] = useState(editAccount_number)
    const id = creditorid
    console.log(id)
    //console.log("editing",name,account_number)
    const [alert, setAlert] = useState(false)
    console.log(id)
    const url = `https://debt-fix.herokuapp.com/creditor/${id}/update/`

    const clearModal = async(e)=>{
        
        if(name && amount_owned && bank_code && account_number){
            console.log('details filled')
            setAlert(false)
            console.log(bank_code,'bank_codee')
            const details = {name:name, amount_owned: amount_owned, bank_code:bank_code, account_number:account_number}
            console.log(details)
            const AddaCreditor = await UpdateDetails(url, details)
            console.log(AddaCreditor)
            setEditcreditorModal(false)
            
        }else{
            console.log('NOt all details filled')
            setAlert(true)
        }
        // 

    }
    const closeModal = ()=>{
      console.log('edit details')
        setAlert('')
        setAccount_number('')
        setName('')
        setBank_code('')
        setAmount_owned('')
        setEditcreditorModal(false)
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
                >Edit Details</Text>
                <SimpleGrid minChildWidth='100px' spacing='30px' w='100%'>
                    <Box bg='#FDFDFD' borderRadius={10}  >
                        <Text className='profile-label'>Name</Text>
                        <input className='profile-input'
                        type='text' id='name' name='name' required
                        value={name}
                        onChange={e => { return setAlert(false), setName(e.target.value)}}
                         ></input>
                    </Box>
                    <Box bg='#FDFDFD' borderRadius={10} >
                        <Text className='profile-label'>Amount Owned</Text>
                        <input className='profile-input'
                         type='number' id='amount-owned' name='amount-owned' required
                         value={amount_owned}
                         onChange={e => { return setAlert(false), setAmount_owned(e.target.value)}}
                        ></input>
                    </Box>
                    <Box bg='#FDFDFD' borderRadius={10} >
                        <Text className='profile-label'>Bank code</Text>
                        <Select placeholder='Select option' size='sm' borderRadius={10}
                        value={bank_code}
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
                        value={account_number}
                        onChange={e =>{ return setAlert(false), setAccount_number(e.target.value)}}
                        ></input>
                    </Box>
                </SimpleGrid>
                <Flex justifyContent='space-between' w='100%' m='40px auto'>
                    <button className='add-creditor-btn-close' onClick={closeModal}>close <AiOutlineClose fontSize={15}/></button>
                    <Box className='white-background-button-container' m='0rem 0rem' >
                        <button onClick={clearModal} className='white-background-button'><span>Edit Details</span> <span><AiOutlineArrowRight/></span></button>
                    </Box>
                </Flex>
                {alert && <Text textAlign='center' color='red' fontFamily='Poppins'>Fill in all the details</Text>}
                          
            </div>
        </div>
    </div>
    </>
 
    )
  }
  
  export default ModalEditCreditor
  