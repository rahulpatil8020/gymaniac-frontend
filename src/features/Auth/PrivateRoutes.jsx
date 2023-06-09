import { Outlet, Navigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "features/Auth/authSlice";
import jwtDecode from "jwt-decode";

const PrivateRoutes = ({ children, ...rest }) => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
