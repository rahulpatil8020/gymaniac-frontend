import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const InputField = ({
  half,
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
  autoComplete,
  rows,
  multiline,
  value,
  errorMessage,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        value={value}
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        autoComplete={autoComplete}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        rows={rows}
        multiline={multiline}
        error={errorMessage ? true : false}
      />
    </Grid>
  );
};

export default InputField;
