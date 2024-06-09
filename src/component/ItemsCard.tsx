import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type props = {
  orderID: number;
  closeItemsModel: () => void;
};

type orderProductType = {
  id:number
  image_url: string;
  name: string;
  price: number;
  order_product: {
    quantity: number;
  };
};

const ItemsCard = ({ orderID, closeItemsModel }: props) => {
  const [items, setItems] = useState<orderProductType[]>();
  const navigate=useNavigate();

  useEffect(() => {
    try {
      const init = async () => {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/order/items/${orderID}`
        );

        setItems(data);
      };

      init();
    } catch (err) {
      console.log(err);
    }
  }, [orderID]);

  return (
    <div className="w-[34rem]">
      <div
        className="text-2xl font-bold cursor-pointer text-right"
        onClick={closeItemsModel}
      >
        X
      </div>

      <div className="mt-3 h-96 overflow-auto">
        {items &&
          items.map((item, index) => {
            return (
              <div key={index} onClick={()=>{navigate(`/product/${item.id}`)}} className="flex gap-7 bg-gray-300 h-20 p-3 rounded-md mb-3">
                <div className="w-16">
                  <img
                    className="h-full rounded-md w-full object-contain"
                    src={item.image_url}
                    alt="product"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm">
                  {item.name.length > 60 ? `${item.name.slice(0, 60)}...` : item.name}
                  </div>
                  <div className="text-sm">Q : {item.order_product.quantity}</div>
                  <div className="text-sm">{item.price}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ItemsCard;
