import React,{useEffect, useState} from 'react'
import {Box, Flex, Text,Spacer} from'@chakra-ui/react'
import Logo from '../../Images/Logosign.svg'
import './Signin.css'
import { Link } from 'react-router-dom'
import LoginUser from '../../services/Accessdetails'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'


const Signin = () => {
  const baseUrl = "https://debt-fix.herokuapp.com/login/"
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isPending, setIspending] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [alert, setAlert] = useState({text:'',
                                        link:''})

    async function loginUser(credentials) {
      return fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data =>{ 
          return data.json()
        })
        
     }
      //setIspending(false)
      //navigate('/')
    
    const handleSubmit = async (e) =>{
      setAlert({link: "", text:''})
      e.preventDefault();
      const details = {email, password}
      try {
        const response = await loginUser(details)
        if ('token' in response) {
          //console.log("successful")
            console.log('SUCCESS')
            localStorage.setItem('accessToken', response.token);
            localStorage.setItem('useremail', JSON.stringify(response.email));
            localStorage.setItem('ID', JSON.stringify(response.id));
            localStorage.setItem('username', JSON.stringify(response.username));
            setPassword('')
            setEmail('')
            navigate("/profile/dashboard", { replace: true })
        } else{
          console.log("erorrrrrrrr")
          setAlert({link: "Signup Instead?", text:`Invalid login details`})
         
        }
        console.log(response)
      } catch (error) {
        console.log('erorrrrrrrrr')
        setAlert({link: 'Signup instead?', text: 'invalid login details'})
      }
      
    }
     

   
  
    
  return (
    <>
    
      <Flex p={10} justifyContent='center' bg='#e5e5e5' ><img src={Logo}alt="logo"></img></Flex>
      <Flex justifyContent='center' bg='#e5e5e5'>
        <Box w='554px' borderRadius={10} bg='#FFFFFF' overflow='hidden' m='1rem 0 5rem 0' p={10}>
          <Box textAlign='center' >
            <Text
               fontFamily='Volkhov'
               fontSize='28px'
               fontWeight='700'
               lineHeight='36.12px'
               color='#271B3E'
               letterSpacing={1}
               m='0.5rem 0'
             >Sign into your Account</Text>
             <Text
             fontFamily='Poppins'
             fontSize='16px'
             fontWeight='300'
             lineHeight='24px'
             color='#271B3E'
             >
             Securely access your DebtFix account
             </Text>
          </Box>
          <Box className='signin-container'>
            <form className='signin-form'>
                <label>Email</label>
                <input type='email' 
                  id='email'
                onChange={e => { return setAlert({text:'', link:''}),setEmail(e.target.value)}}
                />
             </form>
          </Box>
          <Box className='signin-container'>
            <form className='signin-form'>
                <label>Password</label>
                <input type='password' 
                  id='password'
                onChange={e => {return setAlert({text:'', link:''}),setPassword(e.target.value)}}
                />
             </form>
          </Box>
          <Flex m='1rem 0'>
            <form className='signin-form-forgot-password'>
              <input type='checkbox' className='signin-form-checkbox'/>
              <label>Remember me</label>
            </form>
            <Spacer/>
            <Text
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='700'
            lineHeight='24px'
            color='#271B3E'
            >Forgot Password</Text>
          </Flex>
          <Flex flexWrap='wrap' alignItems='center' marginBottom={10}>
            <Text fontSize='15px' fontFamily='Poppins' color='red' marginRight={2}> {alert.text}</Text>
            <Text fontSize='15px'><Link className='signin-user' to='/signup'>{alert.link}</Link></Text>
          </Flex>
          <Box textAlign='center'>
              <button onClick={handleSubmit} className='signin-button'>Sign in</button>
          </Box>
          <Text
           fontFamily='Poppins'
           fontSize='18px'
           fontWeight='medium'
           lineHeight='24px'
           color='1F1F1F'
           textAlign='center'
          > New user?
            <Link to='/signup' className='signin-user'> Sign-up</Link>
            </Text>
        </Box>
      </Flex>
    
    </>
  )
}

export default Signin
