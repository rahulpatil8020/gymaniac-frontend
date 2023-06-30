import React, { useState } from "react";
import {
  Grid,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "components/InputField";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
  }, [firstName, lastName, username, password, confirmPassword, email]);

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
      const { message } = await signup({
        firstName,
        lastName,
        username,
        email,
        password,
      }).unwrap();
      // dispatch(setCredentials({ accessToken }));
      navigate("/", { replace: true });
    } catch (error) {
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Form Data");
      } else if (error.status === 409) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg(error.data.message);
      }
    }
  };

  const error = () => (
    <Snackbar onClose={handleClose} open={errMsg} autoHideDuration={3000}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errMsg}
      </Alert>
    </Snackbar>
  );

  return (
    <>
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
        <Box>
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
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </>
  );
};

export default SignupForm;
