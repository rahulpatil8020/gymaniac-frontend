import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  React.useEffect(() => {
    console.log(user);
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
