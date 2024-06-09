import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { addressType } from "./Summery";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state?.isCheckout || !location.state?.isAddressProvided) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeOrder = async (address:addressType) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/order/create`,
        {address:address}
      );

      if(data.status==="success"){
        toast.success(data.message);
        navigate('/');
      }

    } catch (err) {
      console.log(err);
    }
  };

  const confirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (location.state?.data) {
        placeOrder(location.state?.data)
      } else {
        toast.error("Something went wrong!");
        navigate("/");
      }
    }, 3000);
  };

  return (
    <Fragment>
      <div className="display-box rounded-md p-7 m-5 my-8">
        <div className="uppercase font-medium text-lg border-b-2 pb-3">
          Fake Payment
        </div>

        {loading && (
          <div className="h-72 flex items-center justify-center">
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        )}

        <div className="my-8 ">
          <button
            onClick={confirmPayment}
            className={`uppercase bg-orange-500 outline-none px-5 py-2 rounded-xl text-white cursor-pointer w-72 font-medium border-b-2 border-orange-700 ${
              loading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
