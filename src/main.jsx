import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import About from "./components/pages/AboutPage/AboutPage";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import Product from "./components/pages/Product";
import "./index.css";
import UserManage from "./components/pages/AdminPage/UserManage";
import JewelryManage from "./components/pages/AdminPage/JewelryManage";
import Dashboard from "./components/pages/AdminPage/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/admin/user-manage" element={<UserManage />} />
        <Route path="/admin/jewelry-manage" element={<JewelryManage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
