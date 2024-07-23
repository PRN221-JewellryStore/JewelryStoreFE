import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "src/axios/AxiosClient";

export const CallbackPage = () => {
  const navigate = useNavigate();
  const emailFromStore = useSelector((state) => state.account.loggedIn.email);

  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);

      try {
        // Construct URL with query parameters
        const url = `https://localhost:7000/api/VnPay/payment-callback?${queryParams.toString()}`;

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
  }, [navigate, emailFromStore]);

  return <p>Processing payment...</p>;
};
