import React, { useState, useEffect } from "react";
import Menu from "../components/Menu.js";
import Loading from "../components/Loading.js";
import apiKey from "../key.js";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
import { GridList } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    // margin: "1rem",
  },
  pic: {
    height: "100%",
    width: "100%",
  },
}));
function Menus() {
  const [menus, setMenus] = useState([]);
  const [loadingi, setLoadingi] = useState(true);
  const classes = useStyles();
  const fetchMenus = () => {
    fetch(
      `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus?&token=${apiKey}&status=complete`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setMenus(data.menus);
        setLoadingi(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchMenus();
  }, []);
  return (
    <div className={classes.root}>
      {!loadingi ? (
        <Grid container spacing={1} className={classes.menusContainer}>
          {menus.map((menu, index) => {
            return (
              <Link to={`detail/${menu.id}`}>
                <Grid item>
                  <img
                    src={menu.thumbnail_src}
                    alt={`${menu.sponsor},${menu.event}`}
                    className={classes.pic}
                  />
                </Grid>
              </Link>
            );
          })}
        </Grid>
      ) : (
        <Loading />
        // <p>Hello></p>
      )}
    </div>
  );
}
export default Menus;
