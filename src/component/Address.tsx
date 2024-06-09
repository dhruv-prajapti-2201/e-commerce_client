import React, { useEffect } from "react";
import TextBox from "./controls/TextBox";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressSchema } from "../pages/validationShema";
import { useLocation, useNavigate } from "react-router-dom";

const Address = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const navigate = useNavigate();
  const location=useLocation();
  

  useEffect(()=>{
    if(!location.state?.isCheckout){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const submitHandler = (data: FieldValues) => {
    navigate("/order/summery", { state: { data, isAddressProvided: true,isCheckout:true } });
  };

  return (
    <div className="display-box rounded-md p-7 m-5 mt-8">
      <div className="uppercase font-medium text-lg text-left">
        Delivery Address :
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mt-5">
          <TextBox
            register={register}
            errors={errors}
            name="address1"
            placeholder="Address line 1"
          />
          <TextBox
            register={register}
            errors={errors}
            name="address2"
            placeholder="Address line 2"
          />
          <div className="flex gap-4">
            <TextBox
              register={register}
              errors={errors}
              name="country"
              placeholder="Country"
            />
            <TextBox
              register={register}
              errors={errors}
              name="city"
              placeholder="City"
            />
            <TextBox
              register={register}
              errors={errors}
              name="state"
              placeholder="State"
            />
            <TextBox
              register={register}
              errors={errors}
              name="pincode"
              placeholder="Pincode"
            />
          </div>
          <div>
            <input
              type="submit"
              className="uppercase bg-orange-500 outline-none px-5 py-2 rounded-xl text-white cursor-pointer font-medium border-b-2 border-orange-700"
              value={"proceed order"}
              name="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;
