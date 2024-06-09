import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "./validationShema";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";
import { getCartProducts } from "../redux/cartSlice";
import { AppDispatch } from "../redux/store";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const navigate=useNavigate();
  const dispatch:AppDispatch=useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('userData')){
      navigate('/')
    }
  },[navigate]);

  const handleUserSubmit = async (data: FieldValues) => {
    
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        data
      );

      if (res.data.status === "success") {
        toast.success(res.data.message);
        localStorage.setItem('userData',JSON.stringify(res.data.data))
        dispatch(getCartProducts())
        dispatch(updateUser({name:res.data.data.name,isLoggedIn:true}))
        navigate('/')
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if(err?.response?.data?.status==="error"){
          toast.error(err?.response?.data?.message);
        }else{
          toast.error(err?.response?.data);
        }
      }
    }
    
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center flex justify-center">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            ShopMart
          </a>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleUserSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-medium leading-6 text-gray-900"
            >
              Email address
              <span className="text-sm ml-4 text-red-600 text-left">
                {errors?.email?.message as string}
              </span>
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email")}
                name="email"
                type="email"
                autoComplete="current-email"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
                <span className="text-sm ml-4 text-red-600 text-left">
                    {errors?.password?.message as string}
                  </span>
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password")}
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?&nbsp;&nbsp;
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
