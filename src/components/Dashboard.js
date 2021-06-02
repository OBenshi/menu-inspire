import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
// import { useDb } from "../context/firestoreContext";
import { useHistory } from "react-router-dom";
import Copyright from "../components/Copyright.js";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

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
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const { currentUser, getUserInfo, userInfo, updateEmail, updatePassword } =
    useAuth();
  // const { addNewUser } = useDb();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [win, setWin] = useState("");
  // console.log(currentUser.uid);
  //   useEffect(() => {
  //   history.push();
  // }, [loading])
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
            Update
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
