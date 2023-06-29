import { Outlet, Navigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "components/Navbar";

const PrivateRoutes = ({ children, ...rest }) => {
  const location = useLocation();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
