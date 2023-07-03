import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginExpired = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/hero");
  }, []);
  return <></>;
};

export default LoginExpired;
