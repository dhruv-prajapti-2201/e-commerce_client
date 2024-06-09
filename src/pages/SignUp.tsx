import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpShema } from "./validationShema";
import { toast } from "react-toastify";


import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpShema),
  });

  const navigate=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('userData')){
      navigate('/')
    }
  },[navigate]);

  const handleUserSubmit = async (data: FieldValues) => {
    const user = {
      name: data.name,
      phone: data.phone,
      password: data.password,
      email: data.email,
    };

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register-user`,
        user
      );

      if (res.data.status === "success") {
        toast.success(res.data.message);
        navigate('/signin')
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col scroll items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-4 pb-4">
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
        <div className="w-full bg-white rounded-lg drop-shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleUserSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Phone
                  <span className="text-sm ml-4 text-red-600 text-left">
                    {errors?.phone?.message as string}
                  </span>
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  id="phone"
                  autoComplete="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="8647647364"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                  <span className="text-sm ml-4 text-red-600 text-left">
                    {errors?.cpassword?.message as string}
                  </span>
                </label>
                <input
                  type="password"
                  {...register("cpassword")}
                  id="confirm-password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
