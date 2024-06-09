import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import { productData } from "../redux/productSlice";
import ProductCard from "../component/ProductCard";

const ProductByCategory = () => {
  const { name } = useParams();
  const [product, setProduct] = useState<productData[]>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/category/${name}`)
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
  }, [name, navigate]);

  return (
    <div className="bg-slate-200">
      <Navbar isDisabled={false} />

      <div className="text-lg font-medium m-6 text-center">Category : {name}</div>

      <div className="m-6 flex flex-wrap justify-center mb-10 gap-y-4">
        {product &&
          product.map((item, index) => {
            return (
              <ProductCard
                img={item.image_url}
                name={item.name}
                price={item.price}
                productID={item.id}
                stock={item.sellers[0].seller_product.quantity_in_stock}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductByCategory;
