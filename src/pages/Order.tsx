import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'

const Order = () => {

  const location=useLocation();
  const navigate=useNavigate()

  useEffect(()=>{
    if(!location.state?.isCheckout){
      navigate('/')
    }
  },[location.state?.isCheckout, navigate])
 
  return (
    <div>
      <Navbar isDisabled={true}/>
      <Outlet/>
    </div>
  )
}

export default Order