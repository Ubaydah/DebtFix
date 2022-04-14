import React from 'react'
import {Flex, Box, SimpleGrid, Text, Spacer, Center, Icon, CircularProgress, CircularProgressLabel, Modal} from '@chakra-ui/react'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {MdPayments} from 'react-icons/md'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, HStack} from '@chakra-ui/react'
import {BsWallet} from 'react-icons/bs'
import {Grid, GridItem} from '@chakra-ui/react'
const DashboardStatistics = ({debts_total}) => {
   
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
              >{debts_total}</Text>
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
              >0</Text>
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
              >0</Text>
            </Box>   
          </SimpleGrid>
    </>
  )
}

export default DashboardStatistics
