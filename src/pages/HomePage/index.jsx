import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  React.useEffect(() => {
    console.log(user);
  }, [user]);
  console.log(user);
  return <div>HomePage</div>;
};

export default HomePage;
