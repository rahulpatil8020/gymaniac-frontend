import { useState } from "react";
import { Button, useTheme, Grid, Snackbar, Alert } from "@mui/material";
import InputField from "components/InputField";
import { useSignupMutation } from "./authApiSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  const handleSubmit = (e) => {};
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
        </Grid>
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
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
