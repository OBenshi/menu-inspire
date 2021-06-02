import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Copyright from "../components/Copyright.js";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

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
  container: {
    paddingBottom: "12rem",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { error, setError } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(() => history.push("/"))
      .catch((e) => {
        setError(e);
      });
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && (
          <Alert variant="filled" color="error" severity="error">
            {error.message}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={passwordRef}
                autoComplete="current-password"
              />
            </Grid>{" "}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Login
          </Button>
          <Grid container justify="center" direction="row">
            {" "}
            <Grid item xs={6}>
              <Link to="/forgotpassword" variant="body2">
                forgot your password?
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/signup" variant="body2">
                No account yet? Sign Up
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
