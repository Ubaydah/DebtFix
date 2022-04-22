import React, {useState, useEffect} from 'react'
import {Box, Flex, Text, Spacer} from '@chakra-ui/react'
import {BsSearch, BsBell} from 'react-icons/bs'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'
import Loading from '../Loading/Loading'
import {GiHamburgerMenu } from 'react-icons/gi'
import './PaymentInfo.css'
const PaymentInfo = () => {
    
  const [screenSize, setScreenSize] = useState(window.innerWidth)
   
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
   })

  const [transactionHistory, setTransactionHistory] = useState([])
   const url = 'https://debt-fix.herokuapp.com/payment/transactions/'
    
   const [loading, setLoading] = useState(true)


   const [backColor,setBackColor] = useState('All')

   async function getPaymentTransactions(url){
    const token = localStorage.getItem('accessToken');
     const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }
    
    const response = await fetch(url,option)
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    
    if (data) {
      setTransactionHistory(data)
      setLoading(false)
      
    }
    return data
   }

  useEffect(()=>{
    getPaymentTransactions(url)
    
  },[transactionHistory])

  const setUpdateColor = (color)=>{
    setBackColor(color)
  }
  const openSidebar = ()=>{
    document.getElementById("sidenav").style.width = "16rem";
    document.getElementById("links-cont").style.display = "block";
    //document.getElementById("dashboard-details").style.width = "0";
  
  }

  if (loading) {
    return <Loading/>
  }

  
  if (transactionHistory) {
    
  return (
    <>
    <Box className='payment-transaction-container' h='100vh' overflow='scroll'  bg='#F5F5F5' marginLeft='16rem' p='0rem 1rem 4rem 1rem'>
       <Box onClick={openSidebar} className='sidebar-open-menu' fontSize={20}  color='#705897' fontWeight='bold'><GiHamburgerMenu/></Box>
        {/*<Flex justifyContent='flex-end'  mb='0' >
          <Box m={2} bg='white' w={33} h={33} borderRadius={5} pos='relative' ><BsSearch className='icon'/></Box>
          <Box m={2} p='0rem auto' bg='white'  w={33} h={33} borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
        </Flex>*/}
        <Text
        fontFamily='Volkhov'
        fontSize={{lg:'26px', md:'24px', base:'22px'}}
        fontWeight='700'
        lineHeight='25px'
        color='#271B3E'
        pt={10}
        pb='3px'
        >Payments</Text>
        <Text
         color='#705897'
         fontFamily='Poppins'
         fontSize={{lg:'16px', md:'16px', base:'14px'}}
         fontWeight='300'
         lineHeight='25px'
        >Keep track of every of your transactions</Text>
        <Flex w={{base:'100%',md:'70%'}} borderRadius={10}  m='1.5rem 0'>
            <Box className='info-heading-topic-payment' bg={backColor==='All'?'#705897' :'white'} onClick={()=>setUpdateColor('All')} textAlign='center' w='50%' transition='all 0.5s linear' p={3} borderRight='1px solid black' borderBottomLeftRadius={10} borderTopLeftRadius={10}><Text
              color={backColor==='All'? 'white' :'#705897'}
              fontFamily='Poppins'
              fontSize={{base:'12px',md:'14px'}}
              fontWeight='600'
              lineHeight='25px'>All</Text></Box>
            <Box className='info-heading-topic-payment' bg={backColor==='savings'?'#705897' :'white'} onClick={()=>setUpdateColor('savings')} textAlign='center' transition='all 0.5s linear' w='50%'  p={3}  ><Text
               color={backColor==='savings'? 'white' :'#705897'}
               fontFamily='Poppins'
               fontSize={{base:'12px',md:'14px'}}
               fontWeight='600'
               lineHeight='25px'>Savings</Text></Box>
            <Box className='info-heading-topic-payment' bg={backColor==='credit'?'#705897' :'white'} onClick={()=>setUpdateColor('credit')} textAlign='center' transition='all 0.5s linear' w='50%' borderLeft='1px solid black'  p={3} borderBottomRightRadius={10} borderTopRightRadius={10}><Text
               color={backColor==='credit'? 'white' :'#705897'}
               fontFamily='Poppins'
               fontSize={{base:'12px',md:'14px'}}
               fontWeight='600'
               lineHeight='25px'>credit</Text></Box>
        </Flex>
        {transactionHistory.length>0 && <TableContainer  bg='#FFFFFF'>
         <Table variant='simple'>
            <Thead boxShadow='lg' borderTopRightRadius={10} borderTopLeftRadius={15} >
                <Tr>
                <Th className='table-heading'>Transaction Type</Th>
                <Th  className='table-heading'>Amount</Th>
                <Th className='table-heading'>Narration</Th>
                <Th className='table-heading'>Date Paid</Th>
                <Th className='table-heading'>Status</Th>
                <Th className='table-heading'>Payment Reference</Th>
                </Tr>
            </Thead>
            <Tbody >
              {
                transactionHistory.map((transaction)=>{
                  const {
                    amount, narration, paystack_reference,
                    transaction_type, transaction_status, updated_at

                  } = transaction
                  return (
                    <Tr color='#271B3E' opacity='90%' border='1px solid rgba(58, 28, 107, 0.15)'
                      fontFamily='Poppins' fontSize='14px' lineHeight='21px'>
                        <Td>{transaction_type}</Td>
                        <Td>{amount}</Td>
                        <Td>{narration}</Td>
                        <Td>{updated_at}</Td>
                        <Td>{transaction_status}</Td>
                        <Td>{paystack_reference}</Td>
                      </Tr>

                  )
                })
              } 
            </Tbody>
         </Table>
        </TableContainer>}
        {
             transactionHistory.length ===0 &&
                  <Text bg='#F5F5F5' color='#271B3E' textAlign='center' fontSize='45px' fontFamily='Volkhov' fontStyle='italic'>No transactions Yet!</Text>
               
        }
    </Box>
    </>
  )
}


}
export default PaymentInfo
