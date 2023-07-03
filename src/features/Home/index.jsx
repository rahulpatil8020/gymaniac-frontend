import React from "react";
import { useSelector } from "react-redux";
import HomeSkeleton from "./HomeSkeleton";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <HomeSkeleton />
    </div>
  );
};

export default HomePage;
