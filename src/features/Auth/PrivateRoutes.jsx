import { Outlet, Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "features/Auth/authSlice";

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
