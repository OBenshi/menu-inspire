import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
function Menu(props) {
  const { menu } = props;
  return (
    <Link to={`detail/${menu.id}`}>
      <img src={menu.large_src} alt={`${menu.sponsor},${menu.event}`} />
    </Link>
  );
}
export default Menu;
