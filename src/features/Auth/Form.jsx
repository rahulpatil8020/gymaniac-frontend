import { useState, useEffect } from "react";
import { Box, Button, useTheme, Grid, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "components/InputField";
// import { signup, login, setStatus } from "app/slices/userSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { status, error } = useSelector((state) => state.auth);
  // const user = JSON.parse(localStorage.getItem("user"));
  const status = "idle";
  const error = null;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    if (
      formData.confirmPassword.length > 0 &&
      formData.password !== formData.confirmPassword
    ) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
    setIsValidPassword(PWD_REGEX.test(formData.password));
    setErrorMessage("");
  }, [formData]);

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (error) setErrorMessage(error.message);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "idle" || status === "failed") {
      if (isSignup) {
        if (!isValidPassword) {
          setErrorMessage(
            "The password should be 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed characters are: ! @ # $ %"
          );
          return;
        }
        // dispatch(signup(formData));
      } else {
        // dispatch(login(formData));
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setFormData(initialState);
    setErrorMessage("");
    setIsSignUp((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showLoading = () => {
    if (status === "idle" || status === "failed") {
      return <div>{isSignup ? "Sign Up" : "Sign In"}</div>;
    } else if (status === "loading") {
      return <CircularProgress color="info" />;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {isSignup ? (
            <>
              <InputField
                value={formData.firstName}
                name="firstName"
                handleChange={handleInputChange}
                label="First Name"
                type="text"
                half
              />
              <InputField
                value={formData.lastName}
                name="lastName"
                handleChange={handleInputChange}
                label="Last Name"
                type="text"
                half
              />
            </>
          ) : null}
          <InputField
            value={formData.email}
            name="email"
            label="Email Address"
            handleChange={handleInputChange}
            type="email"
          />
          <InputField
            value={formData.password}
            name="password"
            label="Password"
            handleChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          {isSignup ? (
            <>
              <InputField
                value={formData.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleInputChange}
                type="password"
                errorMessage={passwordError}
              />
              <Box paddingLeft={2} color="red">
                {passwordError}
              </Box>
            </>
          ) : null}
        </Grid>
        {errorMessage.length > 0 && (
          <Grid item sx={{ marginTop: 1 }} xs={12}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}
        <Button
          // disabled={buttonDisabled}
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
          {showLoading()}
        </Button>
      </form>
    </>
  );
};

export default Form;
