import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  return <div>HomePage</div>;
};

export default HomePage;
