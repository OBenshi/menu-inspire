import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",

    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
  },
  menusContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: 500,
    // height: "5rem",
    transform: "translateZ(0)",
  },
  menu: {
    // height: "100",
    // width: "100",
    margin: "1rem",
  },
  pic: {
    height: "100%",
    width: "100%",
    "-webkit-box-shadow": "5px 5px 15px 5px #000000",
    boxShadow: "5px 5px 15px 5px #000000",
    // margin: "1rem",
  },
}));
function Menu(props) {
  const { menu } = props;
  const classes = useStyles();
  return (
    <Link to={`detail/${menu.id}`} className={classes.menu}>
      <Grid item>
        <img
          src={menu.thumbnail_src}
          alt={`${menu.sponsor},${menu.event}`}
          className={classes.pic}
        />
      </Grid>
    </Link>
  );
}
export default Menu;
