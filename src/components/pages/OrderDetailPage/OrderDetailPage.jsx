import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "src/axios/AxiosClient";
import { BannerPath } from "src/components";

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/Order/${orderId}`)
      .then((response) => {
        setOrder(response);
      })
      .catch((error) => {
        console.error("There was an error fetching the order details!", error);
      });
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <BannerPath title="My Purchase" path="Home - My Purchase" image="src/assets/image/slider-bg.jpg" />
      <h1 className="text-2xl font-bold text-center mb-10">Order Detail</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> {order.total}</p>
      </div>
      <div className="mt-8">
        {order.orderDetails.map((detail) => (
          <div key={detail.id} className="flex items-center border-b py-4">
            <img src={detail.product.imgUrl} alt={detail.product.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
            <div>
              <p><strong>Product:</strong> {detail.product.name}</p>
              <p><strong>Quantity:</strong> {detail.quantity}</p>
              <p><strong>Price:</strong> {detail.productCost}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
