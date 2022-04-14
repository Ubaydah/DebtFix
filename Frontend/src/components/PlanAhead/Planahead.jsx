import React from 'react'
import {Box, Flex,Text, Center} from '@chakra-ui/react'
import './Planahead.css'
const Planahead = () => {
  return (
    <>
    <Center bg='#705897'w='90vw' m='4rem auto' borderRadius={25}>
      <Box maxW='800px' textAlign='center' p={10}>
          <Text
           fontFamily='Volkhov'
           fontSize='36px'
           fontWeight='bold'
           lineHeight='46.44px'
           color='#FFFFFF'
           textAlign='center'
           p='1rem 0 0 0'
          >
          We help you plan ahead and offset bills without worry.
          </Text>
          <Text
            fontFamily='Volkhov'
            fontSize='22px'
            fontWeight='hairline'
            lineHeight='33px'
            color='#FFFFFF'
            textAlign='center'
            p='1.7rem 0 0 0'
          >
            DebtFix has come to alleviate any financial worry in the best way possible. 
            Whether debts, bills or monetary promises, 
            DebtFix will fix it all with just one click.
          </Text>
          <button  className='button-create-now'>Create free Account</button>
         
      </Box>
    </Center>
    </>
  )
}

export default Planahead
