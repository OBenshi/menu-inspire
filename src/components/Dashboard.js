import React, { useRef, useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import PasswordField from "material-ui-password-field";
// import { useDb } from "../context/firestoreContext";
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Copyright from "../components/Copyright.js";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    // backgroundColor: "green",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const {
    signup,
    currentUser,
    getUserInfo,
    userInfo,
    updateEmail,
    updatePassword,
  } = useAuth();
  // const { addNewUser } = useDb();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [win, setWin] = useState("");
  // console.log(currentUser.uid);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    setWin("");

    if (emailRef.current.value !== currentUser.email) {
      db.collection("users").doc(currentUser.uid).update({
        email: emailRef.current.value,
      });
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== userInfo.password) {
      db.collection("users").doc(currentUser.uid).update({
        password: passwordRef.current.value,
      });
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setWin("Profile updated sucssfuly");
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getUserInfo(currentUser);
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* {console.log(currentUser)} */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update your profile
        </Typography>
        {error && (
          <Alert variant="filled" color="error" severity="error">
            {error}
          </Alert>
        )}
        {win && (
          <Alert variant="filled" color="sucsess" severity="error">
            {win}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                inputRef={firstNameRef}
                label="First Name"
                defaultValue={`${userInfo.first}`}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                inputRef={lastNameRef}
                label="Last Name"
                defaultValue={`${userInfo.last}`}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                defaultValue={`${userInfo.email}`}
                type="email"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue={`${userInfo.password}`}
                inputRef={passwordRef}
                autoComplete="current-password"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                defaultValue={`${userInfo.password}`}
                inputRef={passwordConfirmRef}
                // autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
