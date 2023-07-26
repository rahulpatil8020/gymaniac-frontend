import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useGetUserInfoQuery } from "features/User/userApiSlice";

const Layout = () => {
  const { data: user } = useGetUserInfoQuery();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
