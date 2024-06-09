import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { getRs } from "../helper";

type props = {
  img: string;
  name: string;
  price: number;
  productID: number;
  stock: number;
};

const ProductCard = ({ img, name, price, productID, stock }: props) => {
  const { user, cart } = useSelector((state: RootState) => {
    return state;
  });

  const [isCartProduct, setIsCartProduct] = useState(false);

  useEffect(() => {
    if (cart) {
      const isCartItem = cart.items.map((item) => item.id).includes(productID);
      if (isCartItem) {
        setIsCartProduct(true);
      } else {
        setIsCartProduct(false);
      }
    }
  }, [productID, cart]);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onCartUpdate = (id: number, e: React.MouseEvent<HTMLElement>) => {
    if (!user.isLoggedIn) {
      navigate("/signin");
    }
    setIsCartProduct(true);
    if (user.isLoggedIn) {
      dispatch(addToCart({ id, quantity: 1 }));
    }

    e.stopPropagation();
  };

  const openProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="item w-60 bg-white p-4 inline-block mr-5 rounded-md shadow-xl"
      onClick={() => {
        openProduct(productID);
      }}
    >
      <div className="item-image h-60">
        <img className="w-full h-full object-contain" src={img} alt="product" />
      </div>
      <div className="p-4">
        <div className="text-sm font-normal whitespace-normal h-10">
          {name.length > 35 ? `${name.slice(0, 35)}...` : name}
        </div>
        <div className="item-price flex items-center justify-center mt-3 font-medium">
          {getRs(price)}
        </div>
        {stock !== 0 && (
          <div className="item-footer">
            {isCartProduct ? (
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-5 py-2 border-2 border-orange-600 mt-3 rounded-3xl text-orange-600 hover:bg-orange-700 hover:text-white font-bold"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={(e) => {
                  onCartUpdate(productID, e);
                }}
                className="px-5 py-2 border-2 border-blue-700 mt-3 rounded-3xl text-blue-700 hover:bg-blue-700 hover:text-white font-bold"
              >
                Add to Cart
              </button>
            )}
          </div>
        )}

        { stock === 0 && (
          <div>
            <div className="text-sm mt-4 text-red-700 bg-red-300 px-3 py-2 rounded-2xl font-semibold">
              Out of stock
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
