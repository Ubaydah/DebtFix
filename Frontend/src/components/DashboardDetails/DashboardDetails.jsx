import React, { useEffect, useState } from 'react'
import {Flex, Box, SimpleGrid, Text, Spacer, Center, Icon, CircularProgress, CircularProgressLabel, Modal} from '@chakra-ui/react'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {MdPayments} from 'react-icons/md'
import {GiHamburgerMenu } from 'react-icons/gi'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, HStack} from '@chakra-ui/react'
import {BsWallet} from 'react-icons/bs'
import {Grid, GridItem} from '@chakra-ui/react'
import './DashboardDetails.css'
import ModalAddCreditor from '../ModalCreditors/ModalAddCreditor'
import ModalEditCreditor from '../ModalCreditors/ModalEditCreditor'
//import { GetEndPointData } from '../../services/Accessdetails'
import Graph from '../Chart/DrawChart'
import AnalyticsDashboard from './AnalyticsDashboard'
import DashboardStatistics from './DashboardStatistics'
import ModalPayaCreditor from '../ModalCreditors/ModalPayaCreditor'

import { useNavigate } from 'react-router-dom'



const DashboardDetails = ({username,id, setLoading}) => {
    

  const [screenSize, setScreenSize] = useState(window.innerWidth)
   
 /* const checkSize = ()=>{
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
},[screenSize])*/
 
   const [addCreditorModal, setAddcreditorModal] = useState(false)
   const [showEditModal, setShowEditModal] = useState(false)
   const [payCreditorModal, setPaycreditorModal] = useState(false)

   const [creditorid, setCreditorId] = useState('')
   const [editName, setEditName] = useState('')
   const [editAmount_owned, setEditAmount_owned] = useState('')
   const [editBank_code, setEditBank_code] = useState('')
   const [editAccount_number, setEditAccount_number] = useState('')

   const [creditors, setCreditors] = useState([])
   const url = 'https://debt-fix.herokuapp.com/creditors/'
   const [noCreditors, setNoCreditors] = useState(false)
   const [getCreditors, setGetCreditors] = useState(false)

   const navigate = useNavigate()

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
      setLoading(false)
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
    setAddcreditorModal(true)
  }
  const editDebtorDetails = (id,name,amount_owned,account_number, bank_code)=>{
    setCreditorId(id)
    setEditName(name)
    setEditAccount_number(account_number)
    setEditAmount_owned(amount_owned)
    setEditBank_code(bank_code)
    setShowEditModal(true)
  }

  const payCreditor =()=>{
    navigate("/profile/creditors",{state:creditors})
    //setPaycreditorModal(true)
  }

  const openSidebar = ()=>{
    document.getElementById("sidenav").style.width = "16rem";
    document.getElementById("links-cont").style.display = "block";
    //document.getElementById("dashboard-details").style.width = "0";
  
  }

  return (
    <>
    <Box className='dashboard-details'  id='dashboard-details' h='100%' bg='#F5F5F5' marginLeft='16rem' p='0rem 1rem 0rem 1rem' >
    <Box onClick={openSidebar} className='sidebar-open-menu' fontSize={20}  color='#705897' fontWeight='bold'><GiHamburgerMenu/></Box>
     {/*<Flex justifyContent='flex-end'  mb='0' >
        <Box m='0.5rem 0.5rem' bg='white' w={33} h={33} borderRadius={5} pos='relative' ><BsSearch className='icon'/></Box>
        <Box m='0.5rem 0.5rem' p='0rem auto' bg='white'  w={33} h={33} borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
      </Flex>}*/}
      <Text
        fontFamily='Volkhov'
        fontSize={{lg:'26px', md:'26px', sm:'24px', base:'20px'}}
        fontWeight='700'
        lineHeight='30px'
        color='#271B3E'
        textTransform='capitalize'
        pt={8}
       >Welcome back, {username}</Text>
      <Text
       color='#705897'
       fontFamily='Poppins'
       fontSize={{lg:'14px',sm:'14px',md:'14px', base:'12px'}}
       fontWeight='300'
       lineHeight='25px'
      >Let us help you manage your debts</Text>
      <Flex className='dashboard-container' flexDirection={{base:'column', lg:'row'}}>
        <Box className='dashboard-inner-container' w={{xl:'70%',lg:'60%'}} p='15px 0px 0px 0px'>
          <DashboardStatistics debts_total={creditors.length}/>
           <Text
           fontFamily='Poppins'
           fontSize='18px'
           fontWeight='bold'
           color='#271B3E'
          p='0.5rem 0'
          >Quick Actions</Text>
          <Flex w={{base:'90%', md:'70%',lg:'70%'}} color='#2A0B9C' justifyContent='space-between'>
            <button onClick={addCreditor} className='glow-on-hover '><AiOutlineUsergroupAdd/> Add Creditor</button>
            <button onClick={payCreditor} className='glow-on-hover '><AiOutlineUsergroupAdd/>Pay creditor</button>
          </Flex>
          <Text
           fontFamily='Poppins'
           fontSize={{lg:'20px' ,md:'20px', base:'18px'}}
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
               <Box className='white-background-button-container'>
                   <button onClick={addCreditor} className='button-debt'><span>Add creditor</span> <span><AiOutlineUsergroupAdd/></span></button>
                </Box>
              </Center>
           </GridItem>
         </Grid>}
         {addCreditorModal && <ModalAddCreditor setAddcreditorModal={setAddcreditorModal}/>}
         {payCreditorModal && <ModalPayaCreditor creditors={creditors} setPaycreditorModal={setPaycreditorModal}/>}
         {showEditModal && <ModalEditCreditor 
           setEditcreditorModal={setShowEditModal}
           editName={editName} 
           editAmount_owned={editAmount_owned}
           editAccount_number={editAccount_number}
           editBank_code={editBank_code}
           creditorid={creditorid}
         />}
         {getCreditors &&               
           <TableContainer  bg='white'>
           <Table>
              <TableCaption></TableCaption>
              <Thead  boxShadow='lg' borderTopRightRadius={10} borderTopLeftRadius={15} >
                  <Tr >
                  <Th className='table-heading'>Creditor</Th>
                  <Th className='table-heading'>AmountOwned</Th>
                  <Th className='table-heading'>AccountNo</Th>
                  <Th className='table-heading'>Date Added</Th>
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
                        <Td>{new Date (date_due).toLocaleDateString()}</Td>
                        <Td color={status==='paid'? 'green' :'red'}>{status}</Td>
                        <Td><HStack>
                            <Icon onClick={()=>editDebtorDetails(id,name,amount_owned,account_number, bank_code)} className='edit' color='green' as={AiOutlineEdit}></Icon>
                            <Icon className='delete' color='red' as={AiOutlineDelete}></Icon>
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
