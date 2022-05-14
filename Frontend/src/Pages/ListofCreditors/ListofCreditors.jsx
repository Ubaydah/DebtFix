import React, {useState, useEffect} from 'react'
import {Box, Flex, Text, Spacer, Grid, GridItem, Icon, Center} from '@chakra-ui/react'
import {BsSearch, BsBell} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {GiHamburgerMenu } from 'react-icons/gi'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, HStack} from '@chakra-ui/react'
import {BsWallet} from 'react-icons/bs'
import { Sidebar , Loading } from '../../components'
import ModalPayaCreditor from '../../components/ModalCreditors/ModalPayaCreditor'
import ModalAddCreditor from '../../components/ModalCreditors/ModalAddCreditor'
import './ListofCreditors.css'
import ModalEditCreditor from '../../components/ModalCreditors/ModalEditCreditor'
import {useLocation} from 'react-router-dom';
import Signin from '../Signin/Signin'



const ListofCreditors = () => {
    
  const [screenSize, setScreenSize] = useState(window.innerWidth)
   
  /*const checkSize = ()=>{
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
  */

    const [addCreditorModal, setAddcreditorModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [payCreditorModal, setPaycreditorModal] = useState(false)

    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('accessToken');



   const [creditors, setCreditors] = useState([])
   const location = useLocation();
   //const creditors = location.state
   const url = 'https://debt-fix.herokuapp.com/creditors/'
   const [noCreditors, setNoCreditors] = useState(false)
   const [getCreditors, setGetCreditors] = useState(false)


   const [creditorid, setCreditorId] = useState('')
   const [editName, setEditName] = useState('')
   const [editAmount_owned, setEditAmount_owned] = useState('')
   const [editBank_code, setEditBank_code] = useState('')
   const [editAccount_number, setEditAccount_number] = useState('')

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
    setPaycreditorModal(true)
  }

  const openSidebar = ()=>{
    document.getElementById("sidenav").style.width = "16rem";
    document.getElementById("links-cont").style.display = "block";
    
  }
  if (loading) {

    return( <>
      <Sidebar/>
      <Loading/>
    </>)
  }

return(
  <>
  <Sidebar/>
  <Box className='main-content-listofcreditors'>
  <Box onClick={openSidebar} className='sidebar-open-menu' fontSize={20}  color='#705897' fontWeight='bold'><GiHamburgerMenu/></Box>
     {/*<Flex justifyContent='flex-end'  mb='0'>
          <Box m={{md:'4px', lg:'4px' ,base:'4px 2px'}} bg='white' w={{md:'33px', base:'25px'}} h={{md:'33px', base:'25px'}}  borderRadius={5} pos='relative' ><BsSearch className='icon'/></Box>
          <Box m={{md:'4px', lg:'4px' ,base:'4px 2px'}} p='0rem auto' bg='white'  w={{md:'33px', base:'25px'}}  h={{md:'33px', base:'25px'}}  borderRadius={5}pos='relative'><BsBell className='icon'/></Box>
       </Flex>*/}
      <Box>
        <Text
        fontFamily='Volkhov'
        fontSize={{lg:'28px', md:'26px', base:'23px'}}
        fontWeight='700'
        lineHeight='25px'
        color='#2A0B9C'
        pt={10}
        pb='5px'
        fontStyle='italic'
        >List of Creditors</Text>
        <Text
         color='#705897'
         fontFamily='Poppins'
         fontSize={{lg:'16px', md:'16px', base:'14px'}}
         fontWeight='300'
         lineHeight='25px'
        >View creditors</Text>
        <Box w='100%' p='15px 0px 0px 0px'>
           <Text
           fontFamily='Poppins'
           fontSize={{lg:'18px', md:'18px', base:'16px'}}
           fontWeight='bold'
           color='#2A0B9C'
        
          p='0.5rem 0'
          >Quick Actions</Text>
          <Flex w={{base:'100%', sm:'90%',md:'80%', lg:'50%',xl:'50%'}} color='#2A0B9C' justifyContent='space-between'>
            <button onClick={addCreditor} className='glow-on-hover'><AiOutlineUsergroupAdd/> Add Creditor
            </button>
            <button onClick={payCreditor} className='glow-on-hover'><AiOutlineUsergroupAdd/>Pay creditor</button>
          </Flex>
          
          <Text
            w ='100%'
           fontFamily='Poppins'
           fontSize={{lg:'20px', md:'20px', base:'17px'}}
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
           <TableContainer bg='white' >
           <Table variant='simple'>
              <Thead boxShadow='lg' borderTopRightRadius={10} borderTopLeftRadius={15}>
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
                    //console.log(date_due,'date due')
                    //const c = { time: date_due };
                    //console.log(new Date(c.time).toLocaleDateString(), "converted")
                    return (
                      <Tr color='#271B3E' opacity='90%' border='1px solid rgba(58, 28, 107, 0.15)'
                      fontFamily='Poppins' fontSize='14px' lineHeight='21px'>
                        <Td className='table-data'>{name}</Td>
                        <Td className='table-data'>{amount_owned}</Td>
                        <Td className='table-data'>{account_number}</Td>
                        <Td className='table-data'>{new Date (date_due).toLocaleDateString()}</Td>
                        <Td className='table-data' color={status==='paid'? 'green' :'red'}>{status}</Td>
                        <Td className='table-data'><HStack>
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
      </Box> 
    </Box>
        {/*{payCreditorModal && <ModalPayaCreditor creditors={creditors} setPaycreditorModal={setPaycreditorModal}/>}*/}
    </>
  )
}

export default ListofCreditors
