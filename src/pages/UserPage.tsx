import React, { useEffect } from 'react'
import Navbar from '../component/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import {AppDispatch, RootState} from '../redux/store';
import Products from '../component/Products';
import { getCartProducts } from '../redux/cartSlice';

const UserPage = () => {

  const { user } = useSelector((state: RootState) => {
    return state;
  });
  const dispatch:AppDispatch =useDispatch();

  useEffect(()=>{
    dispatch(getProducts())
    if(user.isLoggedIn){
      dispatch(getCartProducts())
    }
  },[dispatch, user.isLoggedIn]);

  return (
    <div>
        <Navbar isDisabled={false} />
        <Products/>
    </div>
  )
}

export default UserPage