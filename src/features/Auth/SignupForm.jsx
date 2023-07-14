import React, { useState } from "react";
import {
  Grid,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import InputField from "components/InputField";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSignupMutation } from "./authApiSlice";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();
  const abortController = new AbortController();

  const [signup, { isLoading }] = useSignupMutation();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // eslint-disable-line

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleShowPassword = (e) => setShowPassword((prev) => !prev);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleClose = (event, reason) => {
    setErrMsg("");
  };

  useEffect(() => {
    setErrMsg("");

    return () => {
      abortController.abort();
    };
  }, [firstName, lastName, username, password, confirmPassword, email]); // eslint-disable-line

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password, PWD_REGEX]);

  useEffect(() => {
    if (password === confirmPassword && confirmPassword.length > 0) {
      setPasswordMatch(true);
    }
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const { message } = await signup({
        firstName,
        lastName,
        username,
        email,
        password,
      }).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrMsg(error?.data?.message);
    }
  };

  const error = () => (
    <Snackbar
      sx={{ marginTop: 5 }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      open={errMsg}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errMsg}
      </Alert>
    </Snackbar>
  );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        {" "}
        <CircularProgress color="inherit" />
      </Backdrop>
      {errMsg && error()}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <InputField
            value={firstName}
            name="firstName"
            handleChange={handleFirstNameChange}
            label="First Name"
            type="text"
            half
          />
          <InputField
            value={lastName}
            name="lastName"
            handleChange={handleLastNameChange}
            label="Last Name"
            type="text"
            half
          />
          <InputField
            value={username}
            name="username"
            handleChange={handleUsernameChange}
            label="Username"
            type="text"
          />
          <InputField
            value={email}
            name="email"
            label="Email Address"
            handleChange={handleEmailChange}
            type="email"
          />
          <InputField
            value={password}
            name="password"
            label="Password"
            handleChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          {!validPassword && (
            <Box paddingLeft={2} color="primary">
              Password Should be 8-24 characters. Should include !@#$%
            </Box>
          )}
          <InputField
            value={confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            handleChange={handleConfirmPasswordChange}
            type="password"
          />
          {!passwordMatch && confirmPassword.length > 0 && (
            <Box paddingLeft={2} color="red">
              Password Do not match
            </Box>
          )}
        </Grid>
        <Button
          disabled={isLoading}
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.neutral.dark,
              color: theme.palette.primary.main,
            },
          }}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
