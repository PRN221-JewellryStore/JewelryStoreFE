import React, { useState } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { axiosClient } from "src/axios/AxiosClient";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInAccount } from "src/app/feature/account/AccountSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isRemember: false,
  });

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post("/User/login", formData);
      const { token, ...account } = response;
      sessionStorage.setItem("token", token); // Ensure token is saved
      dispatch(setLoggedInAccount(account));
      navigate("/home");
      toast.success("Login success!");
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="login-page">
      <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 min-h-screen max-md:px-5">
        <img
          loading="lazy"
          src="/src/assets/image/slider-bg.jpg"
          alt=""
          className="object-cover absolute inset-0 w-full h-full"
          style={{ zIndex: -1 }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-2xl bg-pink-100 bg-opacity-80 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
            <img
              src="/src/assets/image/diamond.jpg"
              alt="DiamondShop"
              className="w-40 h-40 mb-10"
            />
            <h1 className="text-5xl font-poiret-one font-medium">Diamond</h1>
          </div>
          <div className="h-1 w-full md:h-full md:w-1 bg-black my-4 md:my-0"></div>
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-plus-jakarta font-semibold mb-4">
              Login Here
            </h2>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => handleDataChange("email", e.target.value)}
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => handleDataChange("password", e.target.value)}
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-4 ml-8 flex items-center">
              <Checkbox
                id="rememberMe"
                defaultSelected
                className="mr-1"
                onChange={(e) =>
                  handleDataChange("isRemember", e.target.checked)
                }
              />
              <label htmlFor="rememberMe" className="text-gray-700 mb-1">
                Remember Me
              </label>
            </div>
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-8 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
