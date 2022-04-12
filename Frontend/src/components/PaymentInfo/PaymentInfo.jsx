import React from 'react'
import {Box, Flex, Text, Spacer} from '@chakra-ui/react'
import {BsSearch, BsBell, BsCamera, BsPersonCheck,BsPersonX, BsJustifyLeft} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineTeam, AiOutlinePlus} from 'react-icons/ai'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'

const PaymentInfo = () => {
  return (
    <>
    <Box  h='100vh' bg='#F5F5F5' marginLeft='17rem' p='0rem 2rem 2rem 2rem'>
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
        >Payments</Text>
        <Text
         color='#705897'
         fontFamily='Poppins'
         fontSize='14px'
         fontWeight='300'
         lineHeight='25px'
        >Keep track of every of your transactions</Text>
        <Flex fontFamily='Poppins' fontWeight='bold' fontSize='14px' color='#000000' justifyContent='space-between' w='50%' m='1rem 7rem'>
            <Text>All</Text>
            <Text>Savings</Text>
            <Text>Credit</Text>
        </Flex>
        <TableContainer m='5rem auto'>
         <Table variant='simple'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                <Th>Creditor</Th>
                <Th>Amount owned</Th>
                <Th>Narration</Th>
                <Th>Date Paid</Th>
                <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
            </Tbody>
         </Table>
        </TableContainer>
    </Box>
    </>
  )
}

export default PaymentInfo
