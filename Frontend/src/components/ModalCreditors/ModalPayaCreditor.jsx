import React, {useState, useEffect} from 'react'
import {Box, Flex, Spacer, Text, Icon, Select, Button, Radio, RadioGroup, Stack} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GetEndpoint } from '../../services/Accessdetails'
import { Link } from 'react-router-dom'

const ModalPayaCreditor = ({setPaycreditorModal,creditors}) => {
    const [name, setName]= useState()
    const [narration, setNarration] = useState()
    const [optionalAmt,setOptionalAmt] = useState()
    const [totalAmt, setTotalAmt] = useState()
    const [radioValue, setRadioValue] = useState()
    const [paymentText, setPaymentText] = useState({message:'',
                                           status:''})

    const [alert, setAlert] = useState('')
    const url = 'https://debt-fix.herokuapp.com/payment/pay-debt/'

    const filteredCreditors = creditors.filter((creditor)=>{
        return creditor.name === name
    })
    const filt = creditors.filter((creditor)=>{
        return creditor.status === "unpaid"
    })
   
    
    
    const clearModal = async (e)=>{

       
        if ((name && narration) && ( optionalAmt || radioValue)) {
            console.log("filled correctly")
            const filteredCreditors = creditors.filter((creditor)=>{
                return creditor.name === name
            })
           
            const filteredCreditorsAmtOwned = filteredCreditors[0].amount_owned
           
            if(radioValue ==="2" && !optionalAmt){
                setAlert("Select Yes! or you input an amount")
            }else{
               
                setAlert('')
                const amount = radioValue==='1'?filteredCreditorsAmtOwned : optionalAmt
                
                const details = {name:name, amount:amount, narration:narration}
                console.log(details, "detailssss")
                try {
                    const PayaCreditor = await GetEndpoint(details,url)
                    console.log(PayaCreditor)
                    console.log(PayaCreditor.message,'payyyyyyyyyy')
                   if(PayaCreditor.message == 'success' ){
                        setPaymentText({message:"Successful! Return to dashboard", status:'success'})
                    }else{
                        setPaymentText({message:"UnSuccessful! Return to dashboard", status:'failure'})
                    }
                    setTimeout(()=>
                       setPaycreditorModal(false), 4000)
                    
                } catch (error) {
                    setPaymentText({message:'Transaction Error! is wallet funded?', status:'failure'})
                     console.log('erorrrrrrrrr in payment')
                }
                
            }
            
        }else{
            setAlert('fill in details correctly')
        }
        
    }

    const closeModal = ()=>{
        setPaycreditorModal(false)
    }

    useEffect(
        () => {
          console.log(alert)
          let timer1 = setTimeout(() => setPaymentText({message:'',status:''}), 3000);
          let timer2 = setTimeout(() => setAlert(''), 3000);
          return () => {
            clearTimeout(timer1);
            clearTimeout(timer2)
          };
          
        },
        [alert, paymentText]);
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
                >Pay a Creditor</Text>
                <Flex className='modal-pay-creditor-container'>
                    <Box>
                      <Box bg='#FDFDFD' borderRadius={10}  >
                         <Text fontSize='12px' className='profile-label'>Select creditor</Text>
                          <Select className='pay-creditor-select-field' fontSize='12px' placeholder='Select option' size='sm' borderRadius={10}
                             value={name}
                             onChange={e => { return setAlert(false), setName(e.target.value)}}>
                                {filt.map((creditor)=>
                                   <option value={creditor.name}>{creditor.name}</option>
                                   
                                )}
                           </Select>
                        </Box>
                        <Box bg='#FDFDFD' borderRadius={10} mt='10px' >
                           <Text className='profile-label'>If No, type amount</Text>
                            <input className='profile-input pay-creditor-input'
                            type='number' id='option-amount' name='option-amount' required
                            onChange={e => { return setAlert(false),setOptionalAmt(e.target.value)}}
                            ></input>
                        </Box>
                        <Box bg='#FDFDFD' borderRadius={10} mt='10px'>
                           <Text className='profile-label'>Narration</Text>
                            <input className='profile-input pay-creditor-input'
                            type='text' id='narration' name='narration' required
                            onChange={e => { return setAlert(false),setNarration(e.target.value)}}
                            ></input>
                        </Box>
                    </Box>
                    <Spacer/>
                    <Box mt='5px'>
                        <Text
                          color='#7B7B7B'
                           fontSize='13px'
                           fontFamily='Inter'
                           fontWeight={500}
                           lineHeight='15px'
                           
                        >Pay total debt</Text>
                        <RadioGroup onChange={setRadioValue} value={radioValue} size='sm' mt='5px'>
                            <Stack direction='row'>
                                <Radio value='1'>yes</Radio>
                                <Radio value='2'>no</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Flex>
                
            <Flex className='btn-container' justifyContent='space-between' alignItems='center' w='100%' m='2rem 0 0 0'>
                <Box className='white-background-button-container' >
                   <button onClick={clearModal} className='white-background-button'><span>Pay creditor</span> <span><AiOutlineArrowRight/></span></button>
                </Box>
                <Button className='close-btn-modal' fontSize='14px' size='md' color='#2A0B9C'  onClick={closeModal}>close</Button>
            </Flex>
            <Text textAlign='center' color='red' fontFamily='Poppins'>{alert}</Text>
            <Link to='/profile' className={paymentText.status}>{paymentText.message}</Link>
            </div>
         </div>
    </div>
    </>
  )
}

export default ModalPayaCreditor
