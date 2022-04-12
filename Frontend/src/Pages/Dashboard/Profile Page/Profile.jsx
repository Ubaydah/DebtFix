import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ModalUser, Sidebar } from '../../../components'
import { DashboardDetails } from '../../../components'
import './Profile.css'
import Signin from '../../Signin/Signin'
//import  ModalUser  from '../../../components'

const Profile = () => {
  const Id = JSON.parse(localStorage.getItem('ID'));
  const username = JSON.parse(localStorage.getItem('username'));
  const token = localStorage.getItem('accessToken');
  

  const url = 'https://debt-fix.herokuapp.com/profile/get/'
  const [isnewuser, setIsnewuser] = useState()
  async function getUserProfile(url){
     const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }
    
    const response = await fetch(url,option)
    if (!response.ok) {
      setIsnewuser(true)
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }else{
      setIsnewuser(false)
      console.log(response.ok, 'Response to see User Profile')
    }
    const data = await response.json();

    
   }
   useEffect(()=>{
     getUserProfile()
   },[])
  //console.log(username, Id)
  if (!token) {
    return <Signin/>
  }
  if (isnewuser) {
    return (
      <>
      <main>
        <Sidebar/>
        <DashboardDetails username={username} id={Id}/>
        <ModalUser/>
      </main>
      </>
    )
  }else{
    return (
      <>
      <main>
        <Sidebar/>
        <DashboardDetails username={username} id={Id}/>
      </main>
      </>
    )
  }
}

export default Profile
