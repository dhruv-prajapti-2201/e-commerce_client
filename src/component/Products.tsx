import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { product } = useSelector((state: RootState) => {
    return state;
  });

  const navigate = useNavigate();

  const getCategoryProducts = useCallback(
    (category: string) => {
      navigate(`/category/${category}`);
    },
    [navigate]
  );

  return (
    <div className="p-5 px-14 pr-0 overflow-x-auto min-h-screen bg-slate-200">
      {product &&
        Object.keys(product.data).map((category, _index) => {
          return (
            <div className="category-items" key={_index}>
              <div className="text-2xl font-bold text-left p-5 pl-4 flex items-center justify-between">
                <div>{category}</div>
                <button
                  onClick={() => {
                    getCategoryProducts(category);
                  }}
                  className="text-base font-medium text-blue-500 bg-blue-300 px-3 py-1 rounded-2xl"
                >
                  See all
                </button>
              </div>
              <div className="items-list overflow-auto whitespace-pre product-container">
                {product.data[category].map((data, index) => {
                  return (
                    <ProductCard
                      img={data.image_url}
                      name={data.name}
                      price={data.price}
                      productID={data.id}
                      stock={data.sellers[0].seller_product.quantity_in_stock}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
