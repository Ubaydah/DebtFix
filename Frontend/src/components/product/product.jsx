import React from 'react'
import {SimpleGrid, Flex, Box, Text} from '@chakra-ui/react'
import frame2 from '../../Images/Frame 592.jpg'
import frame3 from '../../Images/Frame 593.jpg'
import frame4 from '../../Images/Frame 594.jpg'
import frame5 from '../../Images/Frame 595.jpg'
import './product.css'
import { extendTheme } from '@chakra-ui/react'

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '300px',
  md: '768px',
  lg: '996px',
  xl: '1200px',
  '2xl': '1536px',
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })
const Product = () => {

  return (
    <>
    <Flex w='90vw' m='4rem auto' className='product-container'>
      <Box w='100%' m='2rem 0'>
       <Text
       fontFamily='Volkhov'
       fontSize={{lg:'36px', md:'36px', sm:'33px'}}
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
         <Box><img src={frame2} alt=''></img></Box>
         <Box><img src={frame3} alt=''></img></Box>
         <Box><img src={frame4} alt=''></img></Box>
         <Box><img src={frame5} alt=''></img></Box>
      </SimpleGrid>
    </Flex>
    </>
  )
}

export default Product
