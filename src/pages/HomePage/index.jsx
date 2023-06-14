import React from "react";

const HomePage = () => {
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    });
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
