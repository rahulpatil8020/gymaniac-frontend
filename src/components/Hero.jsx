import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <Link to="/auth" replace>
        Login / Signup
      </Link>
    </div>
  );
};

export default Hero;
