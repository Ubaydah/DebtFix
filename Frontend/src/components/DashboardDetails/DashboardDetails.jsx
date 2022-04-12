import React, { useEffect, useState } from 'react'
import {Flex, Box, SimpleGrid, Text, Spacer, Center, Icon, CircularProgress, CircularProgressLabel, Modal} from '@chakra-ui/react'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {MdPayments} from 'react-icons/md'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, HStack} from '@chakra-ui/react'
import {BsWallet} from 'react-icons/bs'
import {Grid, GridItem} from '@chakra-ui/react'
import './DashboardDetails.css'
import ModalAddCreditor from '../ModalAddCreditor/ModalAddCreditor'
import ModalEditCreditor from '../ModalAddCreditor/ModalEditCreditor'
//import { GetEndPointData } from '../../services/Accessdetails'
import Graph from '../Graph'
import AnalyticsDashboard from './AnalyticsDashboard'
import DashboardStatistics from './DashboardStatistics'
import moment from 'moment'

const DashboardDetails = ({username,id}) => {
   const [addCreditorModal, setAddcreditorModal] = useState(false)
   const [showEditModal, setShowEditModal] = useState(false)

   const [creditorid, setCreditorId] = useState('')
   const [editName, setEditName] = useState('')
   const [editAmount_owned, setEditAmount_owned] = useState('')
   const [editBank_code, setEditBank_code] = useState('')
   const [editAccount_number, setEditAccount_number] = useState('')

   const [creditors, setCreditors] = useState([])
   const url = 'https://debt-fix.herokuapp.com/creditors/'
   const [noCreditors, setNoCreditors] = useState(false)
   const [getCreditors, setGetCreditors] = useState(false)

   async function getCreditorsData(url){
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
      setCreditors(data)
      
    }
    return data
   }

  useEffect(()=>{
    getCreditorsData(url)
    if (creditors.length>0) {
      setNoCreditors(false)
      setGetCreditors(true)
    }else{
      setNoCreditors(true)
      setGetCreditors(false)
    }
    
  },[creditors])

  const addCreditor = ()=>{
    console.log("I'm hereeee")
    console.log(addCreditorModal)
    setAddcreditorModal(true)
  }
  const editDebtorDetails = (id,name,amount_owned,account_number, bank_code)=>{
    setCreditorId(id)
    setEditName(name)
    setEditAccount_number(account_number)
    setEditAmount_owned(amount_owned)
    setEditBank_code(bank_code)
    setShowEditModal(true)
    //console.log(editName)
    
  }

  return (
    <>
    <Box h='100%' bg='#F5F5F5' marginLeft='17rem' p='0rem 2rem 2rem 2rem' >
      <Flex justifyContent='flex-end'  mb='0' >
        <Box m={4} bg='white' w={33} h={33} borderRadius={5} pos='relative' ><BsSearch className='icon'/></Box>
        <Box m={4} p='0rem auto' bg='white'  w={33} h={33} borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
      </Flex>
      <Text
       fontFamily='Volkhov'
       fontSize='24px'
       fontWeight='700'
       lineHeight='25px'
       color='#271B3E'
       >Welcome back, {username}</Text>
      <Text
       color='#705897'
       fontFamily='Poppins'
       fontSize='14px'
       fontWeight='300'
       lineHeight='25px'
      >Let us help you manage your debts</Text>
      <Flex>
        <Box w='70%' p='15px 0px 0px 0px'>
          <DashboardStatistics debts_total={creditors.length}/>
           <Text
           fontFamily='Poppins'
           fontSize='18px'
           fontWeight='bold'
           color='#271B3E'
          p='1rem 0'
          >Quick Actions</Text>
          <Flex w='70%' color='#2A0B9C'>
            <Flex alignItems='center' padding='10px 27px 10px 27px' bg='#FDFDFD' border='2px solid #2A0B9C' borderRadius='10px'
              onClick={addCreditor} cursor='pointer'>
              <AiOutlineUsergroupAdd/>
              <Text
               fontFamily='Poppins'
               fontSize='18px'
               color='#2A0B9C'
               p='0 5px'
               lineHeight='24px'
              > Add Creditor</Text>
            </Flex>
            <Spacer/>
            <Flex alignItems='center' padding='13px 27px 13px 27px' bg='#FDFDFD' border='2px solid #2A0B9C' borderRadius='10px' >
              <AiOutlineUsergroupAdd/>
              <Text
               fontFamily='Poppins'
               fontSize='16px'
               color='#2A0B9C'
               lineHeight='24px'
               p='0 5px'
              > Pay Creditor</Text>
            </Flex>
          </Flex>
          <Text
           fontFamily='Poppins'
           fontSize='20px'
           fontWeight='bold'
           color='#2A0B9C'
          p='1rem 0'
          >List of Creditors</Text>
         {noCreditors && <Grid borderTopLeftRadius='10px' borderTopRightRadius='10px' bg='#FFFFFF' templateColumns='repeat(5, 1fr)' templateRows='repeat(6, 1fr)' textAlign='center'>
           <GridItem borderTopLeftRadius='10px' color='#271B3E' opacity='60%' border='1px solid rgba(58, 28, 107, 0.15)' w='100%' h='10'>Creditor</GridItem>
           <GridItem color='#271B3E' opacity='60%' border='1px solid rgba(58, 28, 107, 0.15)' >Amount owned</GridItem>
           <GridItem color='#271B3E' opacity='60%' border='1px solid rgba(58, 28, 107, 0.15)' >Narration</GridItem>
           <GridItem color='#271B3E' opacity='60%' border='1px solid rgba(58, 28, 107, 0.15)' >Date due</GridItem>
           <GridItem borderTopRightRadius='10px' color='#271B3E' opacity='60%' border='1px solid rgba(58, 28, 107, 0.15)' >Status</GridItem>
           <GridItem rowSpan={4} colSpan={6} >
             <Center  flexDirection='column'>
               <Box color='#170154' fontSize={40} m='3rem 0 0.5rem 0'><AiOutlineTeam/></Box>
               <Text m='0 0 0.5rem 0'>No creditor has been added yet!</Text>
               <Flex alignItems='center' padding='13px 40px 13px 40px' bg='#2A0B9C' color='#ffffff' borderRadius='10px' onClick={addCreditor} cursor='pointer'>
                 <Box ><AiOutlineUsergroupAdd/></Box>
                 <Text
                  fontFamily='Poppins'
                  fontSize='18px'
                  color='#ffffff'
                  p='0 5px'
                  lineHeight='24px'
                  > Add Creditor</Text>
                </Flex>
              </Center>
           </GridItem>
         </Grid>}
         {addCreditorModal && <ModalAddCreditor setAddcreditorModal={setAddcreditorModal}/>}
         {showEditModal && <ModalEditCreditor 
           setEditcreditorModal={setShowEditModal}
           editName={editName} 
           editAmount_owned={editAmount_owned}
           editAccount_number={editAccount_number}
           editBank_code={editBank_code}
           creditorid={creditorid}
         />}
         {getCreditors &&               
           <TableContainer  w='100%' bg='white' borderTopRightRadius={10} borderTopLeftRadius={15}>
           <Table >
              <TableCaption></TableCaption>
              <Thead>
                  <Tr >
                  <Th className='table-heading'>Creditor</Th>
                  <Th className='table-heading'>AmountOwned</Th>
                  <Th className='table-heading'>AccountNo</Th>
                  <Th className='table-heading'>Date Due</Th>
                  <Th className='table-heading'>Status</Th>
                  <Th className='table-heading'>Activity</Th>
                  </Tr>
              </Thead>
              <Tbody>
                {
                  creditors?.map((creditor)=>{
                    const {id,name,amount_owned, account_number,status, bank_code, date_due} = creditor
                    //console.log(id)
                    return (
                      <Tr color='#271B3E' opacity='90%' border='1px solid rgba(58, 28, 107, 0.15)'
                      fontFamily='Poppins' fontSize='14px' lineHeight='21px'>
                        <Td>{name}</Td>
                        <Td>{amount_owned}</Td>
                        <Td>{account_number}</Td>
                        <Td>{date_due}</Td>
                        <Td>{status}</Td>
                        <Td><HStack>
                            <Icon onClick={()=>editDebtorDetails(id,name,amount_owned,account_number, bank_code)} className='edit' color='green' as={AiOutlineEdit}></Icon>
                            <Icon className='delete' color='red' as={AiOutlineDelete}></Icon>
                            <Icon className='make-payments' color='violet' as={MdPayments}></Icon>
                           </HStack></Td>
                      </Tr>
                    )
                  })
                }
                
              </Tbody>
           </Table>
          </TableContainer>
           
         }
         
        </Box>


        {/*Analytics Dashboard*/}
        <AnalyticsDashboard/>
      </Flex>
      
    </Box>
    </>
  )
}


export default DashboardDetails
