import {
  faEnvelope,
  faLocationDot,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "src/axios/AxiosClient";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    roleID: "",
    agreeTerms: false,
  });

  const navigate = useNavigate();

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = async () => {
    const {
      username,
      password,
      confirmPassword,
      fullName,
      email,
      phoneNumber,
      address,
      roleID,
      agreeTerms,
    } = formData;

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !address ||
      !roleID
    ) {
      toast.error("Please fill out all required fields");
      return;
    }

    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }

    const payload = {
      username,
      password,
      fullName,
      email,
      phoneNumber,
      address,
      roleID,
    };

    try {
      await axiosClient.post("/User/register", payload);
      toast.success("Register success!");
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) { 
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Register failed!");
      }
      console.error(error);
    }
  };

  return (
    <main className="register-page">
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
              Register Here
            </h2>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => handleDataChange("username", e.target.value)}
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
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  handleDataChange("confirmPassword", e.target.value)
                }
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => handleDataChange("fullName", e.target.value)}
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => handleDataChange("email", e.target.value)}
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                onChange={(e) =>
                  handleDataChange("phoneNumber", e.target.value)
                }
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => handleDataChange("address", e.target.value)}
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-5">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="number"
                placeholder="Role ID"
                onChange={(e) => handleDataChange("roleID", e.target.value)}
                className="pl-10 p-2 border rounded-full w-full shadow"
              />
            </div>
            <div className="relative w-full max-w-sm mb-4 ml-8 flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                className="mr-2"
                onChange={(e) =>
                  handleDataChange("agreeTerms", e.target.checked)
                }
              />
              <label htmlFor="agreeTerms" className="text-gray-700 mb-1">
                I agree to the terms and conditions
              </label>
            </div>
            <Button
              className={`bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-8 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 ${
                !formData.agreeTerms && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleRegister}
              disabled={!formData.agreeTerms}
            >
              Register
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
