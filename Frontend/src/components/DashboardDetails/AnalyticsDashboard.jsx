import React, { useEffect, useState } from 'react'
import {Flex, Box, SimpleGrid, Text, Spacer, Center, Icon, CircularProgress, CircularProgressLabel, Modal} from '@chakra-ui/react'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {BsWallet} from 'react-icons/bs'
import { GetEndPointData } from '../../services/Accessdetails'

const AnalyticsDashboard = () => {
  const [bal, setBal] = useState()
 
  const url = `https://debt-fix.herokuapp.com/wallet/info/`

  async function getWalletBal(url){
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
      
    setBal(res?.balance)
    
    return res
   }
  useEffect(()=>{
     getWalletBal(url)
    //console.log(walletBalance,"balane")
    //console.log(bal,"balance in useeffect")
    console.log(bal)
  },[bal])

  return (
    <>
     <Box w={397}  h='40rem' ml='10px'>
          <Box className='analytics-background' p='1rem 0' borderRadius={15}>
             <Flex alignItems='center' color='white' p='25px'>
               <Icon as={BsWallet}/>
               <Text pl='10px' fontFamily='Poppins' fontSize='16px' lineHeight='24px'>My Wallet</Text>
             </Flex>
             <Text color='white' fontFamily='Volkhov' fontSize='36px' lineHeight='47px'fontWeight='400' p='0 25px'>{bal? bal : '#0.00'}</Text>
             <Flex alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' justifyContent='center'  bg='#ffffff' h='50px' w='205px' color='#2A0B9C' borderRadius='10px' m='10px 25px'>
                  <Box ><AiOutlinePlus/></Box>
                   <Text
                    fontFamily='Poppins'
                    fontSize='16px'
                    color='#2A0B9C'
                    p='0 5px'
                    lineHeight='24px'
                  >Fund Wallet</Text>
                </Flex>
                <Icon as={BsJustifyLeft} color='white' fontSize='20px' mr='20px'/>
              </Flex>
          </Box>
          <Box bg='#ffffff' h='400px' mt='10px' borderRadius={10}>
            <Text 
             fontFamily='Volkhov'
             fontSize='20px'
             color='#271B3E'
             p='20px 25px 10px 25px'
             lineHeight='24px'
             fontWeight='bold'
             >Analytics</Text>
            <Center>
              <CircularProgress value={0} color='rgba(0, 0, 0, 0.15)' size='15rem'>
                <CircularProgressLabel color='#271B3E' fontSize={20} fontWeight='bold'>0% <br/> <Text fontWeight='300'>Overall</Text></CircularProgressLabel>
              </CircularProgress>
           </Center>
            <Flex justifyContent='center' alignItems='center'>
              <Flex m={5}>
               <Text className='piechart-checkbox1' m='3px 6px'></Text>
               <Text>Debts paid</Text>
              </Flex>
              <Flex m={5}>
               <Text className='piechart-checkbox2' m='3px 6px'></Text>
               <Text>Savings</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
    </>
  )
}

export default AnalyticsDashboard
