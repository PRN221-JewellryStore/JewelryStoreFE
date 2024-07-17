import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import About from "./components/pages/AboutPage/AboutPage";
import JewelryManage from "./components/pages/AdminPage/JewelryManage";
import UserManage from "./components/pages/AdminPage/UserManage";
import Product from "./components/pages/Product";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./app/store";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import { NotFound } from "./components/pages/NotFound/NotFound";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="home" index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin/user-manage" element={<UserManage />} />
          <Route path="/admin/jewelry-manage" element={<JewelryManage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
