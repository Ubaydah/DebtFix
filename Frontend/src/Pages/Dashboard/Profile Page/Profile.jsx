import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ModalUser, Sidebar, Loading } from '../../../components'
import { DashboardDetails } from '../../../components'
import './Profile.css'
import Signin from '../../Signin/Signin'
//import  ModalUser  from '../../../components'

const Profile = () => {
  const Id = JSON.parse(localStorage.getItem('ID'));
  const username = JSON.parse(localStorage.getItem('username'));
  const token = localStorage.getItem('accessToken');
  const [ProfileData, setProfileData] = useState(true)

  const [loading, setLoading] = useState(true)

  const url = 'https://debt-fix.herokuapp.com/profile/get/'
  const [isnewuser, setIsnewuser] = useState(false)
  const creditorsUrl = 'https://debt-fix.herokuapp.com/creditors/'

  async function getUserProfile(url){
    
     const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`}}

      try {
        const response = await fetch(url,option)
        const creditorsResponse = await fetch(creditorsUrl,option)

        const data = await response.json();
        const creditorsData = await creditorsResponse.json()
        setLoading(false)
        setIsnewuser(false)
      } catch (error) {
        console.log('erorrrrrrrrrrr')
        setIsnewuser(true)
        setLoading(false)
      }
    
     
    return
     
    
   }
   useEffect(()=>{
     getUserProfile(url)
     
    
   },[])
  //console.log(username, Id)

  

  if (!token) {
    return <Signin/>
  }

  if(loading){
    
    return <Loading/>
  }

  if (isnewuser) {
    console.log(isnewuser, 'new user')
    return (
      <>
      <main>
        <Sidebar/>
        <DashboardDetails username={username} id={Id} setLoading={setLoading}/>
        <ModalUser/>
      </main>
      </>
    )
  }else{
    console.log(isnewuser,'not new user')
    return (
      <>
      <main>
        <Sidebar/>
        <DashboardDetails username={username} id={Id} setLoading={setLoading}/>
      </main>
      </>
    )
  }
}

export default Profile
