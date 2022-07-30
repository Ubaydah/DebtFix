import React, {useState} from 'react'
import {Box, Flex, SimpleGrid, Text, Icon, Select, Button} from '@chakra-ui/react'
//import './ModalAddCreditor.css'
import { AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai'
import './Bank_data'
import { BankData } from './Bank_data'
import { GetEndpoint } from '../../services/Accessdetails'
import '../Modal/Modal.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ModalAddCreditor = ({setAddcreditorModal}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const [name, setName] = useState('')
    const [amount_owned, setAmount_owned] = useState('')
    const [bank_code, setBank_code] = useState('')
    const [account_number, setAccount_number] = useState('')
    const [alert, setAlert] = useState(false)
    const url = 'https://debt-fix.herokuapp.com/creditor/create/'
    

    const clearModal = async(e)=>{

        if(name && amount_owned && bank_code && account_number){
            setAlert(false)
            const details = {name:name, amount_owned: amount_owned, bank_code:bank_code, account_number:account_number}
            try {
                const AddaCreditor = await GetEndpoint(details, url)
                //console.log(AddaCreditor)
                setAddcreditorModal(false)
            } catch (error) {
                console.log("erorrrrrrrrrrrrr adding debtor")
            }
           
            
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
    console.log(currentDate)
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
                >Add a Creditor</Text>
                <SimpleGrid minChildWidth='120px' spacing='20px' w='100%'>
                    <Box className='modal-add-creditor-info' bg='#FDFDFD' borderRadius={10}  >
                        <Text className='profile-label'>Name</Text>
                        <input className='profile-input'
                        type='text' id='name' name='name' required
                        onChange={e => { return setAlert(false), setName(e.target.value)}}
                         ></input>
                    </Box>
                    <Box className='modal-add-creditor-info' bg='#FDFDFD' borderRadius={10} >
                        <Text className='profile-label'>Amount Owned</Text>
                        <input className='profile-input'
                         type='number' id='amount-owned' name='amount-owned' required
                         onChange={e => { return setAlert(false), setAmount_owned(e.target.value)}}
                        ></input>
                    </Box>
                    <Box className='modal-add-creditor-info' bg='#FDFDFD' borderRadius={10} >
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
                    <Box >
                       <Text className='profile-label'>Timeline for debt</Text>
                       <DatePicker 
                        className='date-picker'
                         placeholder ="Please select the date to pay this debt"
                          dateFormat="yyyy/MMM/dd"
                          selected={currentDate}
                          onChange={date => setCurrentDate(date)} />
                    </Box>
                </SimpleGrid>
                <Flex className='add-creditor-btn-container btn-container' justifyContent='space-between' w='100%' m='20px auto'>
                    <button className='add-creditor-btn-close' onClick={closeModal}>close <AiOutlineClose fontSize={15}/></button>
                    <Box className='white-background-button-container' m='0rem 0rem' >
                            <button onClick={clearModal} className='white-background-button'><span>Add Creditor</span> <span><AiOutlineArrowRight/></span></button>
                    </Box>
                    
                </Flex>
                {alert && <Text textAlign='center' color='red' fontFamily='Poppins'>Fill in all the details</Text>}
                          
            </div>
        </div>
    </div>
    </>
 
    )
  }
  
  export default ModalAddCreditor
  