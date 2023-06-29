import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Form from "./Form";
import React, { useState } from "react";

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isSignup, setIsSignUp] = useState(false);
  const status = "idle";
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
        <Form />
        {status === "loading" ? (
          <Button disabled onClick={() => {}}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        ) : (
          <Button onClick={() => {}}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AuthPage;
