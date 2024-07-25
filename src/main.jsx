import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import About from "./components/pages/AboutPage/AboutPage";
import JewelryManage from "./components/pages/AdminPage/JewelryManage";
import UserManage from "./components/pages/AdminPage/UserManage";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./app/store";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import { NotFound } from "./components/pages/NotFound/NotFound";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { CartPage } from "./components/pages/CartPage";
import { ShopCategoryPage } from "./components/pages/ShopCategoryPage";
import { PrivateRoute } from "./components/pages/PrivateRoute";
import { CheckoutPage } from "./components/pages/CheckOutPage/CheckoutPage";
import PaymentSuccess from "./components/pages/PaymentStatus/PaymentSuccess";
import PaymentFail from "./components/pages/PaymentStatus/PaymentFail";
import { CallbackPage } from "./components/pages/CallbackPage/CallbackPage";
import CategoryManagement from "./components/pages/AdminPage/CategoryManage";
import PromotionManagement from "./components/pages/AdminPage/PromotionManage";
import ViewOrder from "./components/pages/AdminPage/ViewOrder";
import Dashboard from "./components/pages/AdminPage/Dashboard";
import { MyPurchasePage } from "./components/pages/MyPurchasePage/MyPurchasePage";
import { OrderDetailPage } from "./components/pages/OrderDetailPage/OrderDetailPage";
import { ProfilePage } from "./components/pages/ProfilePage/ProfilePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="product-detail/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="shop-category" element={<ShopCategoryPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-fail" element={<PaymentFail />} />
            <Route path="payment-callback" element={<CallbackPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="user/purchase" element={<MyPurchasePage />} />
          <Route path="user/purchase/order/:orderId" element={<OrderDetailPage />} />
          <Route path="user/account/profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/user-manage" element={<UserManage />} />
        <Route path="/admin/jewelry-manage" element={<JewelryManage />} />
        <Route path="/admin/category-manage" element={<CategoryManagement />} />
        <Route
          path="/admin/promotion-manage"
          element={<PromotionManagement />}
        />
        <Route path="/admin/view-order" element={<ViewOrder />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
