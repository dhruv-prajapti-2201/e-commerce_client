import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios, { InternalAxiosRequestConfig } from "axios";

axios.interceptors.request.use((config:InternalAxiosRequestConfig)=>{

  let user=JSON.parse(localStorage.getItem('userData') as string);
  
  if(user?.token){
    config.headers.Authorization=`Bearer ${user?.token} ${user?.id}`;
  }

  return config;
})


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
