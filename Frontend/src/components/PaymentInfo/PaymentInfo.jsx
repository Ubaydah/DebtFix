import React, {useState, useEffect} from 'react'
import {Box, Flex, Text, Spacer} from '@chakra-ui/react'
import {BsSearch, BsBell} from 'react-icons/bs'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'
import Loading from '../Loading/Loading'
const PaymentInfo = () => {

  const [transactionHistory, setTransactionHistory] = useState([])
   const url = 'https://debt-fix.herokuapp.com/payment/transactions/'
    
   const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <Loading/>
  }

  
  if (transactionHistory) {
    
  return (
    <>
    <Box h='100%'  bg='#F5F5F5' marginLeft='17rem' p='0rem 2rem 4rem 2rem'>
        <Flex justifyContent='flex-end'  mb='0' >
          <Box m={4} bg='white' w={33} h={33} borderRadius={5} pos='relative' ><BsSearch className='icon'/></Box>
          <Box m={4} p='0rem auto' bg='white'  w={33} h={33} borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
        </Flex>
        <Text
        fontFamily='Volkhov'
        fontSize='26px'
        fontWeight='700'
        lineHeight='25px'
        color='#271B3E'
        pb='3px'
        >Payments</Text>
        <Text
         color='#705897'
         fontFamily='Poppins'
         fontSize='16px'
         fontWeight='300'
         lineHeight='25px'
        >Keep track of every of your transactions</Text>
        <Flex w='50%'  borderRadius={10}  m='2rem 0'>
            <Box bg='#705897' textAlign='center' w='50%' p={3} borderBottomLeftRadius={10} borderTopLeftRadius={10}><Text
              color='white'
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='600'
              lineHeight='25px'>All</Text></Box>
            <Box bg='white' textAlign='center' w='50%'  p={3} borderBottomRightRadius={10} borderTopRightRadius={10}><Text
               color='#808080'
               fontFamily='Poppins'
               fontSize='14px'
               fontWeight='600'
               lineHeight='25px'>Savings</Text></Box>
            <Box bg='white' textAlign='center' w='50%' borderLeft='1px solid black'  p={3} borderBottomRightRadius={10} borderTopRightRadius={10}><Text
               color='#808080'
               fontFamily='Poppins'
               fontSize='14px'
               fontWeight='600'
               lineHeight='25px'>credit</Text></Box>
        </Flex>
        {transactionHistory.length>0 && <TableContainer w='100%' bg='#FFFFFF' borderTopRightRadius={10} borderTopLeftRadius={15}>
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
             transactionHistory.length ===0 && <Box bg='#F5F5F5' marginLeft='17rem' p='0rem 2rem 13rem 2rem'>
                  <Text color='#271B3E' fontSize='45px' fontFamily='Volkhov' fontStyle='italic'>No transactions Yet!</Text>
                </Box>
        }
    </Box>
    </>
  )
}


}
export default PaymentInfo
