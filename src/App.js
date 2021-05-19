import GetMenus from "./components/GetMenus";
import apiKey from "./key.js";
import Home from "./views/Home.js";
// import "./App.css";
import Menus from "./views/Menus.js";
import MenuPage from "./components/MenuPage.js";
import NavBar from "./components/NavBar.js";
import Detail from "./components/Detail.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { SearchContextProvider } from "./context/searchContext";
import { MenusContextProvider } from "./context/menusContext";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(to  bottom, #ffffff, #f0dcfa, #f4b3e5, #fd85bb, #ff517f, #ed3a60, #d82241, #c20023, #920728, #620f24, #331019, #000000)",
    // "radial-gradient(circle, #ffffff, #f0dcfa, #f4b3e5, #fd85bb, #ff517f, #ed3a60, #d82241, #c20023, #920728, #620f24, #331019, #000000)",
    // "radial-gradient(circle, #d977dc, #ff71b8, #ff7992, #ff8d72, #ffa55b, #feaa52, #fcb049, #f9b640, #f6a73d, #f2973c, #ed883b, #e7793c)",
    // "linear-gradient(to right bottom,#e7793c,#ed883b,#f2973c,#f6a73d,#f9b640,#fcb049,#feaa52,#ffa55b, #ff8d72, #ff7992, #ff71b8, #d977dc)",
  },
  height: "100%",
});

const theme = createMuiTheme({
  palette: {
    background: {
      // default: "#00ff00",
      // paper: "#00ff00",
    },
  },
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />{" "}
        <MenusContextProvider>
          <SearchContextProvider>
            <div className={classes.root}>
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/menus">
                  <Menus />
                </Route>
                <Route exact path="/detail/:id" children={<Detail />} />
                {/* <Route exact path="/detail/:id/:pageId"  >children={<MenuPage />} */}
              </Switch>{" "}
            </div>{" "}
          </SearchContextProvider>
        </MenusContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
