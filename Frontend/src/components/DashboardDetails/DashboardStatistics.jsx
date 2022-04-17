import React, { useState, useEffect, createContext } from 'react'
import {Flex, Box, SimpleGrid, Text, Spacer, Center, Icon, CircularProgress, CircularProgressLabel, Modal} from '@chakra-ui/react'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'

const DashboardStatistics = ({debts_total}) => {

  
  const [statistics, setStatistics] = useState()
  const [total, setTotal] = useState()
  const url = 'https://debt-fix.herokuapp.com/payment/statistics/'
  async function DebtStatistics(url){
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
      
      setStatistics(data)
      
    }
    return data
   }

  useEffect(()=>{
     DebtStatistics(url)
    
    
  },[statistics])
  if (statistics) {
    
  const {creditors_all, creditors_paid,creditors_unpaid} = statistics
  return (
    <>
    
     <SimpleGrid minChildWidth='20px' spacing='50px' w='100%'>
        <Box bg='#FDFDFD' borderRadius={10} w='150px' h='120px'>
              <Box m='10px' color='#170154'> <AiOutlineUsergroupAdd/></Box>
              <Text
              fontFamily='Poppins'
              fontSize='14px'
              fontWeight='400'
              lineHeight='18px'
              color='#999999'
              p='5px 10px'
              >Total Creditors</Text>
              <Text
              fontFamily='Volkov'
              fontSize='40px'
              lineHeight='46px'
              color='#170154'
              fontWeight='Bold'
              p=' 0 10px'
              >{creditors_all}</Text>
       </Box>
        <Box bg='#FDFDFD' borderRadius={10} w='150px'>
              <Box m='10px' color='#170154'><BsPersonCheck/></Box>
              <Text
               fontFamily='Poppins'
               fontSize='14px'
               fontWeight='400'
               lineHeight='18px'
               color='#999999'
               p='5px 10px'
              >Total debts cleared</Text>
              <Text
              fontFamily='Volkov'
              fontSize='40px'
              lineHeight='46px'
              color='#170154'
              fontWeight='Bold'
              p=' 0 10px'
              >{creditors_paid}</Text>
        </Box>
        <Box bg='#FDFDFD' borderRadius={10} w='150px'>
              <Box m='10px' color='#170154'><BsPersonX /></Box>
              <Text
               fontFamily='Poppins'
               fontSize='14px'
               fontWeight='400'
               lineHeight='18px'
               color='#999999'
               p='5px 10px'
              >Total debts left</Text>
              <Text
              fontFamily='Volkov'
              fontSize='40px'
              lineHeight='46px'
              color='#170154'
              fontWeight='Bold'
              p=' 0 10px'
              >{creditors_unpaid}</Text>
        </Box>   
    </SimpleGrid>
    
  </>
  )
}

}
export default DashboardStatistics
