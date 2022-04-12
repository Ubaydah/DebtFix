import React from 'react'
import {SimpleGrid, Flex, Box, Text} from '@chakra-ui/react'
import frame2 from '../../Images/Frame 592.jpg'
import frame3 from '../../Images/Frame 593.jpg'
import frame4 from '../../Images/Frame 594.jpg'
import frame5 from '../../Images/Frame 595.jpg'
import './product.css'
const Product = () => {
  return (
    <>
    <Flex w='90vw' m='4rem auto' className='product-container'>
      <Box w='100%' m='2rem 0'>
       <Text
       fontFamily='Volkhov'
       fontSize='36px'
       fontWeight='400'
       lineHeight='46px'
       color='#271B3E'
       className='product-text'
       >Get rid of any financial worries</Text>
       <Text
       fontFamily='Volkhov'
       fontSize='22px'
       fontWeight='300'
       lineHeight='33px'
       letterSpacing='0em'
       color='#271B3E'
       className='product-text'
       >Save up, earn interest and pay up pending bills.</Text>
      </Box>
      <SimpleGrid minChildWidth='160px' spacing='50px' w='100%'>
         <Box><img src={frame2}></img></Box>
         <Box><img src={frame3}></img></Box>
         <Box><img src={frame4}></img></Box>
         <Box><img src={frame5}></img></Box>
      </SimpleGrid>
    </Flex>
    </>
  )
}

export default Product
