import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ requiredRole }) => {
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);

  if (!accountLoggedIn.id) {
    // Người dùng chưa đăng nhập
    return <Navigate to="/login" />;
  }

  if (requiredRole && accountLoggedIn.role !== requiredRole) {
    // Người dùng không có quyền truy cập vào trang này
    if (accountLoggedIn.role === "Admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/home" />;
    }
  }
  // Người dùng có quyền truy cập vào trang này
  return <Outlet />;
};
