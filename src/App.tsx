import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./component/404Page";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AuthGuard from "./component/AuthGaurd";
import UserPage from "./pages/UserPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Order from "./pages/Order";
import Address from "./component/Address";
import Summery from "./component/Summery";
import Payment from "./component/Payment";
import AuthGuard from "./component/AuthGaurd";
import MyOrder from "./pages/MyOrder";
import ProductPage from "./pages/ProductPage";
import ProductByCategory from "./pages/ProductByCategory";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer position="bottom-center" theme="dark" />
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/category/:name" element={<ProductByCategory />}></Route>

          <Route path="/user/order" element={<AuthGuard Component={MyOrder} />}></Route>
          <Route path="/" element={<UserPage/>}></Route>
          
          <Route path="/order" element={ <AuthGuard Component={Order} />}>
            <Route path="address" element={<Address/>} />
            <Route path="summery" element={<Summery/>}/>
            <Route path="payment" element={<Payment/>}/>
          </Route>



          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
