import React, { useState, useEffect, useContext } from "react";
import Menu from "../components/Menu.js";
import Loading from "../components/Loading.js";
import apiKey from "../key.js";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
import { GridList } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";

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
function Menus(props) {
  const { menus, setMenus } = useContext(MenusContext);
  const { loading, setLoading } = useContext(MenusContext);
  const [resultPage, setResultPage] = useState(1);
  const {
    searchTerm,
    setSearchTerm,
    clearSearchTerm,
    fetchAgain,
    setFetchAgain,
  } = useContext(SearchContext);
  console.log(menus);

  let toFetch;
  searchTerm === ""
    ? (toFetch = `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus?&token=${apiKey}&status=complete&page=${resultPage}`)
    : (toFetch = `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus/search?query=${searchTerm}&token=${apiKey}&page=${resultPage}`);

  const classes = useStyles();
  const fetchMenus = () => {
    fetch(toFetch)
      .then((response) => {
        // console.log(bob);
        return response.json();
      })
      .then((data) => {
        Math.ceil(data.stats.count / 50);
        // let tempMenus = data.menus;
        menus === []
          ? setMenus(data.menus)
          : setMenus([...menus, ...data.menus]);
        console.log(searchTerm);
        // clearSearchTerm();
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(fetchAgain);
  useEffect(() => {
    fetchMenus();
  }, [resultPage, fetchAgain]);
  return (
    <div className={classes.root}>
      {!loading ? (
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
          <button
            onClick={() => {
              setResultPage(resultPage + 1);
            }}
          >
            more
          </button>
        </Grid>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Menus;
