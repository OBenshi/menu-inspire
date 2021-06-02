import "@fontsource/permanent-marker";
import "@fontsource/playfair-display";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail.js";
import Favs from "./components/Favs";
import ForgotPassword from "./components/ForgotPassword";
import NavBar from "./components/NavBar.js";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { FirestoreContextProvider } from "./context/firestoreContext";
import { MenusContextProvider } from "./context/menusContext";
// import apiKey from "./key.js";
import Home from "./views/Home.js";
// import "./App.css";
import Menus from "./views/Menus.js";
const useStyles = makeStyles({
  root: {
    paddingBottom: "5rem",
    background:
      "radial-gradient(circle, #ff6700, #ff726a, #ff90af, #ffb6e2, #fdd9fd, #fdd9fd, #fdd9fd, #fdd9fd, #ffb6e2, #ff90af, #ff726a, #ff6700)",
    // "radial-gradient(circle, #ffffff, #eeedfa, #dadcf5, #c5cbf1, #acbced, #acbced, #acbced, #acbced, #c5cbf1, #dadcf5, #eeedfa, #ffffff)",
    // "linear-gradient(to  bottom, #ffffff, #f0dcfa, #f4b3e5, #fd85bb, #ff517f, #ed3a60, #d82241, #c20023, #920728, #620f24, #331019, #000000)",
    // "radial-gradient(circle, #ffffff, #f0dcfa, #f4b3e5, #fd85bb, #ff517f, #ed3a60, #d82241, #c20023, #920728, #620f24, #331019, #000000)",
    // "radial-gradient(circle, #d977dc, #ff71b8, #ff7992, #ff8d72, #ffa55b, #feaa52, #fcb049, #f9b640, #f6a73d, #f2973c, #ed883b, #e7793c)",
    // "linear-gradient(to right bottom,#e7793c,#ed883b,#f2973c,#f6a73d,#f9b640,#fcb049,#feaa52,#ffa55b, #ff8d72, #ff7992, #ff71b8, #d977dc)",
    // height: "100vh",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff8b3d",
      main: "#ff781f",
      dark: "#ff6600",
    },
    secondary: {
      light: "#ffb6e2",
      main: "#e6a4cb",
      dark: "#cc92b5",
      contrastText: "white",
    },
    background: {
      paper: "rgba(255, 184, 226, 0.75)",
    },
    text: {
      secondary: "#ffff",
    },
  },
  typography: {
    fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    h1: {
      fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    },
    h2: {
      fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    },
    h3: {
      fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    },
    h4: {
      fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    },
    h5: {
      fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    },
    h6: {
      fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
    },
    body2: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
  },
});

theme.typography.h1 = {
  fontFamily: '"Permanent Marker","Helvetica","Arial",sans-serif',
  fontSize: "3rem",
  "@media (min-width:600px)": {
    fontSize: "4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "6rem",
  },
};

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        {" "}
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <FirestoreContextProvider>
              <MenusContextProvider>
                <NavBar />
                <Switch>
                  <Route exact path="/signup" children={<SignUp />} />
                  <Route exact path="/signin" children={<SignIn />} />
                  <Route
                    exact
                    path="/forgotpassword"
                    children={<ForgotPassword />}
                  />
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    children={<Dashboard />}
                  />
                  <PrivateRoute exact path="/Favourites" children={<Favs />} />
                  <Route exact path="/" children={<Home />} />
                  <Route exact path="/menus" children={<Menus />} />
                  <Route exact path="/detail/:id" children={<Detail />} />
                </Switch>
              </MenusContextProvider>
            </FirestoreContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>{" "}
    </div>
  );
}

export default App;
