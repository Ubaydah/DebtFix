import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {Box, Flex, Text,Spacer} from'@chakra-ui/react'
import Logo from '../../Images/Logosign.svg'
import './Signup.css'
import { useNavigate, Link } from 'react-router-dom'

import AOS from "aos";
import "aos/dist/aos.css";



const Signup = () => {
  const baseUrl = "https://debt-fix.herokuapp.com/register/"
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [alert, setAlert]= useState({'message1':'',
                                     'message2':''})
  
  const navigate = useNavigate()
  async function SignupUser(credentials) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
    //setIspending(false)
    //navigate('/')
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const details = {email, password, username}
    //setIspending(true)
    if(email && password && username){
      try {
        const response = await SignupUser(details)
        console.log(response)
        if("id" in response){
           console.log(response)
           navigate("/signin", { replace: true })
        }
        else{
        setAlert({message1:'User with the email or Username already exist',message2:'Sign in instead?'})
        
        }
      } catch (error) {
        setAlert({message1:'Unkown Error', message2:''})
        
        console.log(error)
        console.log('errorrrrrrrrrrrrrrrr')
      }
    }else{
      setAlert({message1:'Fill in every field correctly', message2:''})
    }
    
    
  }

  useEffect(
    () => {
      console.log(alert)
      let timer1 = setTimeout(() =>  setAlert({message1:'',message2:''}), 2000);
      return () => {
        clearTimeout(timer1);
      };
      
    },
    [alert]);

    useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);
  return (
    <>
    <Flex  p={{base:'2',md:'7'}} justifyContent='center' bg='#e5e5e5' >
    <Link to='/' className='link-homepage-signin'><AiOutlineArrowLeft/></Link>
      <img  className='sign-in-logo' src={Logo}alt="logo"></img>
    </Flex>
      <Flex  justifyContent='center' bg='#e5e5e5'>
        <Box data-aos="fade-up" data-aos-duration="1000" className='signin-conntainer-box' w={{base:'350px', sm:'400px',md:'554px',}} borderRadius={10} bg='#FFFFFF' overflow='hidden' m='1rem 0 5rem 0' p={{base:'5',md:'10'}}>
          <Box textAlign='center' >
            <Text
               fontFamily='Volkhov'
               fontSize={{base:'22px', sm:'24px', md:'28px',lg:'28px'}}
               fontWeight={{base:'600',md:'700'}}
               lineHeight='36.12px'
               color='#271B3E'
               letterSpacing={1}
               m='0.5rem 0'
             >Create an Account</Text>
             <Text
             fontFamily='Poppins'
             fontSize={{base:'13px', sm:'14px', md:'16px',lg:'16px'}}
             fontWeight='300'
             lineHeight='24px'
             color='#271B3E'
             >
            Get started with your DebFix account
             </Text>
          </Box>
          <Box className='signin-container'>
            <form className='signin-form'>
                <label>Username</label>
                <input type='text' id='text'
                 onChange={e => setUsername(e.target.value)}
                />
             </form>
          </Box>
          <Box className='signin-container'>
            <form className='signin-form'>
                <label>Email</label>
                <input type='email' id='email'
                 onChange={e => setEmail(e.target.value)}/>
             </form>
          </Box>
          <Box className='signin-container'>
            <form className='signin-form'>
                <label>Password</label>
                <input type='password' id='password'
                 onChange={e => setPassword(e.target.value)}/>
             </form>
          </Box>
          <Flex m='2rem 0'>
            <form className='signin-form-forgot-password'>
              <input type='checkbox' className='signin-form-checkbox'/>
              <label>Remember me</label>
            </form>
            <Spacer/>
            <Text
            fontFamily='Poppins'
            fontSize={{base:'10px',sm:'14px', md:'16px'}}
            fontWeight='700'
            lineHeight='24px'
            color='#271B3E'
            >Forgot Password</Text>
          </Flex>
          <Text m='5px 3px' color='red' fontSize='12px' fontFamily='Poppins' textAlign='center'>{alert.message1}<Link className='signin-user' to='/signin'>{alert.message2}</Link></Text>
          <Box textAlign='center'>
              <button onClick={handleSubmit} className='signin-button'>Create an account</button>
          </Box>
          <Text
           fontFamily='Poppins'
           fontSize={{base:'10px',sm:'14px', md:'18px'}}
           fontWeight='medium'
           lineHeight='24px'
           color='1F1F1F'
           textAlign='center'
          > Have an account?
            <Link to='/signin' className='signin-user'> Sign in</Link>
            </Text>
        </Box>
      
    </Flex>
    
    </>
  )
}

export default Signup
