import { useState } from "react";
import {
  Button,
  useTheme,
  Grid,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import InputField from "components/InputField";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "./authSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const abortController = new AbortController();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleClose = () => setErrMsg("");

  useEffect(() => {
    setErrMsg("");
    return () => {
      abortController.abort();
    };
  }, [username, password]); // eslint-disable-line

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
        <CircularProgress color="inherit" />
      </Backdrop>
      {errMsg && error()}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <InputField
            value={username}
            name="username"
            label="Username"
            handleChange={handleUsernameChange}
            type="text"
          />
          <InputField
            value={password}
            name="password"
            label="Password"
            handleChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
        </Grid>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0 1rem",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.neutral.dark,
              color: theme.palette.primary.main,
            },
          }}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
