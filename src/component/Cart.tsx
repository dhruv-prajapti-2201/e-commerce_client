import React, { ChangeEvent, MouseEvent } from "react";
import { BsCurrencyRupee, BsFillCartXFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteCartItem, getCartProducts } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

type props = {
  onCloseModel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ onCloseModel }: props) => {
  const closeModel = (e: MouseEvent<HTMLElement>) => {
    onCloseModel(false);
  };

  const { cart } = useSelector((state: RootState) => {
    return state;
  });

  const navigate=useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const checkoutOrder=()=>{
    navigate('/order/address',{state:{isCheckout:true}})
  }

  const removeCartItem = (product_id: number) => {
    dispatch(deleteCartItem(product_id));
  };

  const updateQuantity = async (
    e: ChangeEvent<HTMLSelectElement>,
    product_id: number
  ) => {
    const qty = Number(e.target.value);

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cart/update`,
        {
          product_id,
          qty,
        }
      );

      if (data.status === "success") {
        dispatch(getCartProducts());
      }
    } catch (err) {
      console.log(err);
      
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);

        if(err.response?.data.status==="remove"){
          let pid=err.response?.data.data;
          dispatch(deleteCartItem(pid));
        }

      }
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-screen bg-black/70`}
      onClick={closeModel}
    >
      <div
        className={`bg-white absolute right-0 w-5/12 h-full overflow-auto`}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="text-black text-left mx-5 my-3 pl-1 text-lg font-medium">
          {`shopping cart (${cart.items!==undefined && cart.items.length})`}
        </div>
        <div className="overflow-auto h-[446px]">
          {cart.items &&
            cart.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center h-16 m-5 mt-0 text-black bg-gray-300 p-3 rounded-md"
                >
                  <div className="h-full rounded-md">
                    <img
                      className="h-full w-full object-cover overflow-hidden"
                      src={item.image_url}
                      alt="product"
                    />
                  </div>

                  <div className="text-sm w-60">
                    {item.name.length > 30
                      ? `${item.name.slice(0, 30)}...`
                      : item.name}
                  </div>
                  <div className="text-sm font-medium">
                    Q : &nbsp;
                    <select
                      defaultValue={item.cart_products.quantity}
                      className="px-0 py-1 rounded-md bg-slate-100 outline-none"
                      onChange={(e) => {
                        updateQuantity(e, item.id);
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                    </select>
                  </div>

                  <div className="text-sm flex items-center">
                    {item.price * item.cart_products.quantity}{" "}
                    <BsCurrencyRupee />
                  </div>
                  <div
                    className="cursor-pointer text-lg text-red-700"
                    onClick={() => {
                      removeCartItem(item.id);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}

          {cart.items.length === 0 && (
            <div className="text-9xl text-gray-700 bg-slate-300 rounded-[50%] inline-block p-16 mt-28">
              <BsFillCartXFill />
            </div>
          )}
        </div>
        {cart.items.length !== 0 ? (
          <div className="mx-4 border-t-2 border-black/30 border-dashed">
            <div className="text-lg text-black flex items-center justify-start p-3 font-medium">
              <div className="mr-2">Total Amount : </div>
              {cart.total}
              <BsCurrencyRupee />
            </div>
            <button onClick={checkoutOrder} className="bg-green-700 px-3 py-2 w-full font-medium mb-3 rounded">
              Checkout
            </button>
            <button
              onClick={closeModel}
              className="bg-gray-300 text-gray-700 font-semibold px-3 py-2 w-full rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="mx-4">
            <button
              onClick={closeModel}
              className="bg-gray-300 text-gray-700 font-semibold px-3 py-2 w-full rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
