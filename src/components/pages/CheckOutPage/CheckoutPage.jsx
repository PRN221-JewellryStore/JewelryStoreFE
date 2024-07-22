import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react"; // Sử dụng Button từ NextUI
import { axiosClient } from "src/axios/AxiosClient";
import { BannerPath } from "src/components";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const carts = useSelector((state) => state.cart.carts);
  const user = useSelector((state) => state.account.loggedIn);
  const selectedVoucher = localStorage.getItem("selectedVoucher");

  useEffect(() => {
    if (selectedVoucher && Object.keys(carts).length > 0) {
      const createOrder = async () => {
        try {
          const formData = new FormData();
          formData.append("PromotionID", selectedVoucher);

          const token = localStorage.getItem('token');
          if (!token) {
            console.error("No token found in localStorage");
            return;
          }

          console.log("Creating order with token: ", token);
          console.log("Form data:", { PromotionID: selectedVoucher });

          const orderResponse = await axiosClient.post("/Order/create", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
          });

          console.log("Full order response: ", orderResponse);

          const orderID = orderResponse.id; // Lấy OrderID từ phản hồi
          console.log("Order created with ID: ", orderID);

          if (!orderID) {
            console.error("Order ID not found in response");
            return;
          }

          // Thêm delay để đảm bảo order đã được tạo
          await new Promise(resolve => setTimeout(resolve, 2000)); // Chờ 2 giây

          const orderDetailsPromises = Object.keys(carts).map((productId) => {
            const { product, quantity } = carts[productId];
            const detailFormData = new FormData();
            detailFormData.append("OrderID", orderID);
            detailFormData.append("ProductID", product.id);
            detailFormData.append("Quantity", quantity);

            console.log("Creating order detail with data:", {
              OrderID: orderID,
              ProductID: product.id,
              Quantity: quantity
            });

            return axiosClient.post("/OrderDetail/create", detailFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
            }).catch(error => {
              console.error("Error creating order detail: ", error.response ? error.response.data : error);
              throw error;
            });
          });

          await Promise.all(orderDetailsPromises).then((results) => {
            results.forEach((result, index) => {
              console.log(`Order detail created: `, result);
            });
          });

          const orderDetailsResponse = await axiosClient.get(`/Order/${orderID}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
          console.log("Order details: ", orderDetailsResponse);
          setOrderDetails(orderDetailsResponse);
        } catch (error) {
          console.error("Error during checkout:", error.response ? error.response.data : error);
        } finally {
          setLoading(false);
        }
      };

      createOrder();
    } else {
      navigate("/cart");
    }
  }, [carts, navigate, selectedVoucher, user.id]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const paymentData = {
        orderType: "online_payment", // Adjust this field as per your actual order type
        amount: orderDetails.total,
        orderDescription: "Payment for order", // Adjust as needed
        name: orderDetails.user.fullName // Adjust as needed
      };

      const paymentResponse = await axiosClient.post("https://localhost:7000/api/VnPay/create-payment-url", paymentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log("VNPay payment response: ", paymentResponse);
      if (paymentResponse.result) {
        window.location.href = paymentResponse.result; // Redirect to VNPay page
      } else {
        console.error("Payment URL not found in response");
      }
    } catch (error) {
      console.error("Error during payment:", error.response ? error.response.data : error);
    }
  };



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BannerPath
        title="CheckOut Cart"
        path="Home - CheckOut Cart"
        image="src/assets/image/slider-bg.jpg"
      />
      <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold" }}>Chi tiết đơn hàng</h1>
      {orderDetails && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "40%" }}>
            <h2>User Information</h2>
            <p>Full Name: {orderDetails.user.fullName}</p>
            <p>Email: {orderDetails.user.email}</p>
            <p>Address: {orderDetails.user.address}</p>
            <p>Phone: {orderDetails.user.phoneNumber}</p>
          </div>
          <div style={{ width: "55%" }}>
            <h2>Order Details</h2>
            <ul>
              {orderDetails.orderDetails.map((detail) => (
                <li key={detail.id} style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                  <img
                    src={detail.product.imgUrl}
                    alt={detail.product.name}
                    style={{ width: "100px", height: "100px", marginRight: "20px" }}
                  />
                  <div>
                    <p>Sản phẩm: {detail.product.name}</p>
                    <p>Số lượng: {detail.quantity}</p>
                    <p>Giá: {detail.productCost}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ textAlign: "left", marginTop: "20px" }}>
              <p>Giá gốc: {orderDetails.primaryPrice}</p>
              <p style={{ color: "red" }}>Giá được giảm: {orderDetails.total}</p>
              <Button color="primary" onClick={handlePayment}>
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
