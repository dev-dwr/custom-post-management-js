import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import useStyles from "./styles";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";
import ConfirmEmailPopup from "./ConfirmEmailPopup/ConfirmEmailPopup";

const initialFormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSingUp] = useState(false);
  const [formData, setFormData] = useState(initialFormDataState);
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const history = useHistory();
  const dispatch = useDispatch();

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const switchMode = () => {
    setIsSingUp((prevState) => !prevState);
    setShowPassword(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, history));
      handleClickOpen();
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const googleFailure = (error) => {
    console.error("Google sign in was unsuccessful");
    console.error(error);
  };

  if(user?.result?.userId || user?.result?.googleId){
    history.push("/")
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <ConfirmEmailPopup
            open={open}
            email={formData.email}
            handleClose={handleClose}
          />
          <GoogleLogin
            clientId="263777238165-tsdlubr49m6f2gvvli496j6rkgneamnj.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
