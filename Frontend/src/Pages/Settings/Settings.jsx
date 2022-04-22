import React from 'react'
import { Sidebar, SettingsInfo } from '../../components'
import Signin from '../Signin/Signin'

const Settings = () => {

  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Signin/>
  }




  return (
    <>
    <main>
      <Sidebar/>
      <SettingsInfo/>
    </main>
    </>
  )
}

export default Settings
