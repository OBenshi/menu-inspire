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

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/menus">
            <Menus />
          </Route>
          <Route exact path="/detail/:id" children={<Detail />} />
          {/* <Route exact path="/detail/:id/:pageId" childxren={<MenuPage />} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
