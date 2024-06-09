import React, { useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getCartProducts } from "../redux/cartSlice";

export type addressType = {
  address1: string;
  address2: string;
  city: string;
  country: string;
  pincode: number;
};

const Summery = () => {
  const [address, setAddress] = useState<addressType>();
  const [user] = useState(
    JSON.parse(localStorage.getItem("userData") as string)
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch:AppDispatch=useDispatch();

  const { cart } = useSelector((state: RootState) => {
    return state;
  });

  const { user:appUser } = useSelector((state: RootState) => {
    return state;
  });

  const placeOrder=()=>{
    navigate('/order/payment',{
      state:{
        isCheckout:true,
        isAddressProvided: true,
        data:location.state.data
      }
    })
  }

  useEffect(()=>{
    
    if(appUser.isLoggedIn){
      dispatch(getCartProducts())
    }
  },[dispatch, appUser.isLoggedIn]);



  useEffect(() => {
    if (!location.state?.isCheckout || !location.state?.isAddressProvided) {
      navigate("/");
    }
    if(location.state?.data){
      setAddress(location.state.data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="display-box rounded-md p-7 m-5 my-8">
      <div className="uppercase font-medium text-lg border-b-2 pb-3">
        Order Summary
      </div>
      <div className="mt-8 pl-5 flex justify-start gap-10">
        <div>
          <div className="text-left"> Delivery Address :</div>
          <table className="user-table">
            <tbody>
              <tr>
                <td>Address line 1</td>
                <td>: {address?.address1}</td>
              </tr>
              {address?.address2 !== "" && (
                <tr>
                  <td>Address line 2</td>
                  <td>{`: ${address?.address2}`}</td>
                </tr>
              )}
              <tr>
                <td>Country</td>
                <td>: {address?.country}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>: {address?.city}</td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>: {address?.pincode}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="text-left">Customer Details :</div>
          <table className="user-table mb-5">
            <tbody>
              <tr>
                <td>Name</td>
                <td>: {user?.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{`: ${user?.email}`}</td>
              </tr>
              <tr>
                <td>Phone number</td>
                <td>: {user?.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* products */}
      <div className="mt-8 pl-5">
        <div className="font-medium mb-4">Order items</div>

        {cart.items &&
          cart.items.map((item,index) => {
            return (
              <div key={index} className="flex bg-gray-300 rounded-md h-36 p-4 mb-3">
                <div className="w-48">
                  <img
                    className="h-full w-full object-contain"
                    src={item.image_url}
                    alt="product"
                  />
                </div>
                <div>
                  <div className="font-medium">
                    {item.name}
                  </div>
                  <div className="text-left">
                    <div>Qty : {item.cart_products.quantity}</div>
                    <div className="flex items-center">
                      Price : {item.price*item.cart_products.quantity} <BsCurrencyRupee />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      
      <div className="flex items-center m-5 text-2xl font-medium pl-3">
        Total Amount : {cart?.total && cart.total}
        <BsCurrencyRupee />
      </div>

      <div>
        <button onClick={placeOrder} className="uppercase bg-orange-500 px-20 py-2 rounded-xl text-white cursor-pointer font-medium border-b-2 border-orange-700">Place an Order</button>
      </div>


    </div>
  );
};

export default Summery;
