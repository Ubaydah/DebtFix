import axios from 'axios'
import React, { useState } from 'react'

const baseUrl = "https://debt-fix.herokuapp.com/login/"


export async function GetEndpoint(profile, url) {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(profile)
    })
      .then(data => data.json())
}




export async function UpdateDetails(url, data){
  const token = localStorage.getItem('accessToken');
    console.log(token)
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(data)

    }).then(data => data.json())
}

export async function GetEndPointData(url, data){
  const token = localStorage.getItem('accessToken');
    console.log(token)
    const response = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    try {
      const res = await response.json()
      return res
      
      
    } catch (error) {
      console.error(error)
    }
    
    
    
}
