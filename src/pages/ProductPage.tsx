import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {  productData } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addToCart, getCartProducts } from "../redux/cartSlice";
import { toast } from "react-toastify";

const ProductPage = () => {
  let { id } = useParams();
  const { user, cart } = useSelector((state: RootState) => {
    return state;
  });
  const [product, setProduct] = useState<productData>();
  const [isCartProduct, setIsCartProduct] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart) {
      const isCartItem = cart.items.map((item) => item.id).includes(Number(id));
      if (isCartItem) {
        setIsCartProduct(true);
      } else {
        setIsCartProduct(false);
      }
    }
  }, [id, cart,dispatch]);

  useEffect(()=>{
    if(user.isLoggedIn && cart.items.length===0){
      dispatch(getCartProducts())
    }
  },[cart.items, dispatch, user.isLoggedIn]);


  useEffect(() => {
    function init() {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
        .then(({ data }) => {
          if (data.status === "success") {
            setProduct(data.data);
          }
          console.log(data);
        })
        .catch((err) => {
          toast.error(err.response?.data.message);
          navigate("/");
        });
    }
    init();
  }, [id, navigate]);

  const onCartUpdate = (id: number, e: React.MouseEvent<HTMLElement>) => {
    if (!user.isLoggedIn) {
      navigate("/signin");
    }
    
    if (user.isLoggedIn) {
      dispatch(addToCart({ id, quantity: quantity }));
    }
  };

  return (
    <Fragment>
      <Navbar isDisabled={false} />
      {product && (
        <div>
          <div className="text-left m-5 mx-32 text-lg">
            Category : {product.categories[0]?.name}
          </div>

          <div className="grid grid-cols-2 justify-center gap-5 mx-32 mb-10">
            <div className="bg-gray-200 flex-3 p-4 rounded-md display-box">
              <img
                className="w-full h-fill object-contain rounded-md"
                src={product.image_url}
                alt="product"
              />
            </div>
            <div className="text-left flex-1">
              <div className="text-2xl font-medium">{product.name}</div>
              <div className="mt-5">
                <div className="uppercase text-lg font-medium text-gray-800">
                  description :
                </div>
                <div className="text-base text-justify">{product.desc}</div>
              </div>
              <div className="mt-5">
                {product.sellers[0].seller_product.quantity_in_stock > 10 && (
                  <span className="text-sm text-green-700 bg-green-300 px-3 py-2 rounded-2xl font-semibold">
                    Available
                  </span>
                )}
                {product.sellers[0].seller_product.quantity_in_stock === 0 && (
                  <span className="text-sm text-red-700 bg-red-300 px-3 py-2 rounded-2xl font-semibold">
                    Out of stock
                  </span>
                )}
                {product.sellers[0].seller_product.quantity_in_stock <= 10 &&
                  product.sellers[0].seller_product.quantity_in_stock !== 0 && (
                    <span className="text-sm text-red-700 px-3 py-2 rounded-2xl font-semibold">
                      hurry up, only{" "}
                      {product.sellers[0].seller_product.quantity_in_stock}{" "}
                      stock is available
                    </span>
                  )}
              </div>

              <div className="mt-7">
                {isCartProduct ? (
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-5 py-2 border-2 border-orange-600 mt-1 rounded-3xl text-orange-600 hover:bg-orange-700 hover:text-white font-bold"
                  >
                    Go to Cart
                  </button>
                ) : (
                  <Fragment>
                    { product.sellers[0].seller_product.quantity_in_stock!==0 && <Fragment>
                      <span>
                        Q :
                        <select
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="px-1 py-1 ml-2 rounded-md bg-gray-400 outline-none"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                        </select>
                      </span>
                      <button
                        onClick={(e) => {
                          onCartUpdate(product.id, e);
                        }}
                        className="ml-5 uppercase bg-orange-500 px-10 py-2 rounded-xl text-white cursor-pointer font-medium border-b-2 border-orange-700"
                      >
                        Add to Cart
                      </button>
                    </Fragment>}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductPage;
