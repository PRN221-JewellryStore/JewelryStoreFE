import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "src/axios/AxiosClient";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    fullName: ""
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (accountLoggedIn.id) {
      axiosClient
        .get(`/User/${accountLoggedIn.id}`)
        .then((response) => {
          setUser(response.value); // Truy cập vào thuộc tính value
          setFormData({
            username: response.value.username,
            email: response.value.email,
            phoneNumber: response.value.phoneNumber,
            address: response.value.address,
            fullName: response.value.fullName
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the user profile!", error);
        });
    }
  }, [accountLoggedIn.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === "email") {
      validateEmail(value);
    } else if (name === "phoneNumber") {
      validatePhoneNumber(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email không đúng định dạng.");
    } else {
      setEmailError("");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:\+84|0)[1-9][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Số điện thoại không đúng định dạng.");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || phoneError) {
      toast.error("Vui lòng nhập thông tin hợp lệ.");
      return;
    }
    axiosClient
      .patch(`/User/update/${accountLoggedIn.id}`, formData)
      .then((response) => {
        toast.success(response.value, {
          onClose: () => {
            navigate('/home'); // Chuyển hướng về trang home
          }
        });
      })
      .catch((error) => {
        console.error("There was an error updating the user profile!", error);
        toast.error("Failed to update profile.");
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Hồ Sơ Của Tôi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tên
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${phoneError ? 'border-red-500' : ''}`}
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};
