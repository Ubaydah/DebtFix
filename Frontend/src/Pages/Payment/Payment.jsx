import React from 'react'
import { Sidebar, PaymentInfo } from '../../components'
import './Payment.css'

const Payment = () => {
  return (
    <>
    <div className='page'>
      <Sidebar/>
      <PaymentInfo/>
    </div>
    </>
  )
}

export default Payment
