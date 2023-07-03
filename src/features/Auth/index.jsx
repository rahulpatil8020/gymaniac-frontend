import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isSignup, setIsSignUp] = useState(false);
  const status = "idle";
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const handleIsSignUp = () => setIsSignUp((prev) => !prev);

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Gymaniac
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Gymaniac, Maximize your Gains!
        </Typography>
        {isSignup ? <SignupForm /> : <LoginForm />}

        <Button disabled={status === "loading"} onClick={handleIsSignUp}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthPage;
