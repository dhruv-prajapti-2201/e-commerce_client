import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import Model from "../component/Model";
import { addressType } from "../component/Summery";
import AddressCard from "../component/AddressCard";
import ItemsCard from "../component/ItemsCard";
import { getLocaleDate, getRs } from "../helper";

type orderType = {
  id: number;
  order_date: string;
  shipping_address: string;
  status: string;
  total_amount: number;
};

type addressModelType = {
  isOpen: boolean;
  address: addressType;
};

type itemsModelType = {
  isOpen: boolean;
  orderID: number;
};

const IntialAddress = {
  address1: "",
  address2: "",
  city: "",
  country: "",
  pincode: 0,
};

const MyOrder = () => {
  const [orderData, setOrderData] = useState<orderType[]>([]);
  const [orderAddress, setOrderAddress] = useState<addressModelType>({
    isOpen: false,
    address: IntialAddress,
  });

  const [orderItemsModel, setOrderItemsModel] = useState<itemsModelType>();

  useEffect(() => {
    async function init() {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order/get`
      );

      if (data.status === "success") {
        setOrderData(data.data);
      }
    }

    try {
      init();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const closeAddressModel = () => {
    setOrderAddress({
      isOpen: false,
      address: IntialAddress,
    });
  };

  const closeItemsModel = () => {
    setOrderItemsModel({
      isOpen: false,
      orderID: -1,
    });
  };

  const showAddress = (address: string) => {
    const addressObj = JSON.parse(address);

    setOrderAddress({
      isOpen: true,
      address: addressObj,
    });
  };

  const showItems = (orderID: number) => {
    setOrderItemsModel({
      isOpen: true,
      orderID,
    });
  };

  if(orderData.length===0){
    return <h1>Loading...</h1>
  }

  return (
    <Fragment>
      {orderAddress.isOpen && (
        <Model>
          <AddressCard
            closeAddressModel={closeAddressModel}
            address={orderAddress.address}
          />
        </Model>
      )}

      {orderItemsModel?.isOpen && (
        <Model>
          <ItemsCard
            closeItemsModel={closeItemsModel}
            orderID={orderItemsModel.orderID}
          />
        </Model>
      )}

      <Navbar isDisabled={false} />
      <div className="mt-6 text-xl text-left pl-12 font-medium">My Orders</div>

      {orderData.length !== 0 && (
        <section className="container mx-auto p-6 font-mono">
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Order Date</th>
                    <th className="px-4 py-3">Total Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Shipping Address</th>
                    <th className="px-4 py-3">Ordered Items</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-left">
                  {orderData &&
                    orderData.map((order, index) => {
                      return (
                        <tr className="text-gray-700" key={index}>
                          <td className="px-4 py-3 border">
                            {order.id}
                          </td>
                          <td className="px-4 py-3 border">
                            {getLocaleDate(order.order_date)}
                          </td>
                          <td className="px-4 py-3 text-ms font-semibold border">
                            {getRs(order.total_amount)}
                          </td>
                          <td className="px-4 py-3 text-xs border">
                            <span
                              className={`order-status-label ${order.status}`}
                            >
                              {" "}
                              {order.status}{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm border">
                            <button
                              onClick={() => {
                                showAddress(order.shipping_address);
                              }}
                              className="bg-green-600 text-white px-3 py-2 rounded-md font-medium"
                            >
                              show address
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm border">
                            <button
                              onClick={() => {
                                showItems(order.id);
                              }}
                              className="bg-green-600 text-white px-3 py-2 rounded-md font-medium"
                            >
                              show items
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {orderData.length === 0 && (
        <div className="flex items-center justify-center m-20">
          <img
            src="https://www.shutterstock.com/image-vector/no-orders-concept-character-can-260nw-1617887866.jpg"
            alt="no orders"
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrder;
