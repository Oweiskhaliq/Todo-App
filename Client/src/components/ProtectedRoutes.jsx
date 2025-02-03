import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import React from "react";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  !token && toast.error("Access denied. Please Login.");
  const UserAuth = token ? true : false;
  return UserAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
