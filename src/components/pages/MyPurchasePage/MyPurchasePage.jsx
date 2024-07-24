import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "src/axios/AxiosClient";
import { BannerPath } from "src/components";

export const MyPurchasePage = () => {
  const [orders, setOrders] = useState([]);
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (accountLoggedIn.id) {
      axiosClient
        .get(`/Order/user:${accountLoggedIn.id}`)
        .then((response) => {
          setOrders(response);
        })
        .catch((error) => {
          console.error("There was an error fetching the orders!", error);
        });
    }
  }, [accountLoggedIn.id]);

  const handleOrderClick = (orderId) => {
    navigate(`/user/purchase/order/${orderId}`);
  };

  return (
    <div className="container mx-auto mt-10">
      <BannerPath
        title="My Purchase"
        path="Home - My Purchase"
        image="src/assets/image/slider-bg.jpg"
      />
      <div className="mt-8">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li
                key={order.id}
                onClick={() => handleOrderClick(order.id)}
                className="border p-4 rounded-lg shadow-md mb-4 cursor-pointer transition-transform transform hover:scale-105"
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total:</strong> {order.total}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
