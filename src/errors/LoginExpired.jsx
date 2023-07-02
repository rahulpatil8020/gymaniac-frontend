import React from "react";
import { Link } from "react-router-dom";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";

const LoginExpired = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography variant="h1">Your Login Has Expired</Typography>
        <Link to="/auth"> Click here to login </Link>
      </Box>
    </Box>
  );
};

export default LoginExpired;
