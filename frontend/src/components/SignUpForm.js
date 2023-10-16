import { Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  headingStyle,
  signupContainerStyle,
  usernameInputStyle,
  formStyle,
  signupFormButtonStyle,
  inputStyle,
  signRedirectStyle,
  linkStyle,
} from "../styles/styles";
import Trademark from "./Trademark";
import useField from "../hooks/useField";
import { useEffect, useState } from "react";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import PasswordMissmatch from "./PasswordMismatch";

const SignUpForm = () => {
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const repeatPassword = useField("password");
  const [inputError, setInputError] = useState(false);
  const passwordVisibility = usePasswordVisibility();

  useEffect(() => {
    if (repeatPassword.value !== "") {
      if (password.value === repeatPassword.value) {
        setInputError(false);
      } else {
        setInputError(true);
      }
    } else {
      setInputError(false);
    }
  }, [repeatPassword.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Paper elevation={12} style={signupContainerStyle}>
      <div style={headingStyle}>
        <h1>Sign Up</h1>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <TextField
          {...name}
          label="Name"
          style={usernameInputStyle}
          color="primary"
        ></TextField>
        <TextField
          {...username}
          label="Username"
          style={inputStyle}
          color="primary"
          autoComplete="username"
        ></TextField>
        <TextField
          {...password}
          type={passwordVisibility.visibility ? "text" : "password"}
          label="Password"
          style={inputStyle}
          color="primary"
          autoComplete="new-password"
          InputProps={{
            endAdornment: passwordVisibility.component,
          }}
          error={inputError}
        ></TextField>
        <TextField
          {...repeatPassword}
          type={passwordVisibility.visibility ? "text" : "password"}
          label="Repeat Password"
          style={inputStyle}
          autoComplete="new-password"
          InputProps={{
            endAdornment: passwordVisibility.component,
          }}
          error={inputError}
        ></TextField>
        <PasswordMissmatch
          password={password.value}
          repeatPassword={repeatPassword.value}
        />
        <Button variant="contained" type="submit" style={signupFormButtonStyle}>
          Sign Up
        </Button>
      </form>
      <span style={signRedirectStyle}>
        {"Already have an account? "}{" "}
        <Link style={linkStyle} to={"/"}>
          Log in
        </Link>
      </span>
      <Trademark />
    </Paper>
  );
};

export default SignUpForm;
