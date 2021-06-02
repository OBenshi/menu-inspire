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
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Copyright from "../components/Copyright";

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

export default function ForgotPassword() {
  const classes = useStyles();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // console.log(currentUser);
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(passwordRef.current.value);
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your Email inbox for further Instructions");
    } catch {
      setError("Failed to Reset Password");
    }

    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* {console.log(currentUser)} */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        {error && (
          <Alert variant="filled" color="error" severity="error">
            {error}
          </Alert>
        )}
        {message && (
          <Alert variant="filled" color="success" severity="success">
            {message}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Reset Password
          </Button>
          <Grid container justify="center" direction="row">
            <Grid item xs={6}>
              <Link to="/signin" variant="body2">
                Login
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
