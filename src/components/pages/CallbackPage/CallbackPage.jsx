import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "src/axios/AxiosClient";

export const CallbackPage = () => {
  const navigate = useNavigate();
  const emailFromStore = useSelector((state) => state.account.loggedIn.email);
  const useridFromStore = useSelector((state) => state.account.loggedIn.id);

  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const userid = localStorage.getItem("userid") || useridFromStore; // Lấy userID từ localStorage

      if (!userid) {
        console.error("User ID not found in localStorage or Redux store");
        navigate("/payment-fail");
        return;
      }

      try {
        // Construct URL with userID and query parameters
        const url = `https://localhost:7000/api/VnPay/payment-callback?userid=${userid}&${queryParams.toString()}`;

        const response = await axiosClient.get(url);
        console.log(response);

        const { success } = response.result; // Correctly access the result object

        // Get the email from localStorage or Redux store
        const userEmail = localStorage.getItem("userEmail") || emailFromStore;

        if (success) {
          if (userEmail) {
            // Send email if payment is successful
            await axiosClient.post(`https://localhost:7000/api/VnPay/send-email`, null, {
              params: {
                email: userEmail,
              },
            });
          }
          navigate("/payment-success");
        } else {
          navigate("/payment-fail");
        }
      } catch (error) {
        console.error("Error handling payment callback:", error.response ? error.response : error);
        navigate("/payment-fail");
      }
    };

    handleCallback();
  }, [navigate, emailFromStore, useridFromStore]);

  return <p>Processing payment...</p>;
};
