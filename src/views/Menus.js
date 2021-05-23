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
// import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";
import { Paper } from "@material-ui/core";
import Search from "../components/Search.js";

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
function Menus(props) {
  const { menus, setMenus } = useContext(MenusContext);
  const { loading, setLoading } = useContext(MenusContext);
  const { doNotFetch, setDoNotFetch } = useContext(MenusContext);
  // setLoading(true);
  const {
    searchTerm,
    setSearchTerm,
    clearSearchTerm,
    fetchAgain,
    setFetchAgain,
    resultPage,
    setResultPage,
    totalPages,
    setTotalPages,
    searchSort,
  } = useContext(MenusContext);

  let toFetch;
  searchTerm === ""
    ? (toFetch = `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus?&token=${process.env.REACT_APP_NYPL_API_KEY}&status=complete&page=${resultPage}&sort_by=${searchSort}`)
    : (toFetch = `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus/search?query=${searchTerm}&token=${process.env.REACT_APP_NYPL_API_KEY}&page=${resultPage}&sort_by=${searchSort}`);
  console.log(searchSort);
  const classes = useStyles();
  const fetchMenus = () => {
    fetch(toFetch)
      .then((response) => {
        // console.log(bob);
        return response.json();
      })
      .then((data) => {
        setTotalPages(Math.ceil(data.stats.count / 50));
        // let tempMenus = data.menus;
        menus === []
          ? setMenus(data.menus)
          : setMenus([...menus, ...data.menus]);
        // menus.forEach((menu) => {
        //   console.log(`${menu.sponsor},${menu.location}`);
        // });
        // clearSearchTerm();
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(menus);
  useEffect(() => {
    if (!doNotFetch) {
      fetchMenus();
    }
  }, [resultPage, fetchAgain, searchSort]);
  return (
    <div className={classes.root}>
      <Search />
      {!loading ? (
        <Grid container spacing={1} className={classes.menusContainer}>
          {menus.map((menu, index) => {
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
          })}
          {resultPage < totalPages && (
            <button
              onClick={() => {
                setDoNotFetch(false);
                setResultPage(resultPage + 1);
              }}
            >
              more
            </button>
          )}
        </Grid>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Menus;
