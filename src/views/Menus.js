import { Fab, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading.js";
import Menu from "../components/Menu.js";
import Search from "../components/Search.js";
import { useDb } from "../context/firestoreContext";
// import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";
import { useAuth } from "../context/AuthContext";
// import ScrollToTopOnMount from "../components/ScrollTopOnMount.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    background:
      "radial-gradient(circle, #ff6700, #ff726a, #ff90af, #ffb6e2, #fdd9fd, #fdd9fd, #fdd9fd, #fdd9fd, #ffb6e2, #ff90af, #ff726a, #ff6700)",
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
    // height: "100%",
    // width: "100%",
    "-webkit-box-shadow": "5px 5px 15px 5px #000000",
    boxShadow: "5px 5px 15px 5px #000000",
    // margin: "1rem",
  },
  loadMore: {
    margin: "1rem",
  },
  fabiIcon: {
    // margin: "6rem",
    color: theme.palette.primary.dark,
  },
}));
function Menus(props) {
  const { favs, getFavs } = useDb();
  const { menus, setMenus } = useContext(MenusContext);
  const { loading, setLoading } = useContext(MenusContext);
  const { doNotFetch, setDoNotFetch } = useContext(MenusContext);
  const { lastScrollX, setLastScrollX } = useAuth();
  const { lastScrollY, setLastScrollY } = useAuth();
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
  // console.log(searchSort);
  const classes = useStyles();
  const fetchMenus = () => {
    if (menus.length === 0) {
      setLoading(true);
    }
    fetch(toFetch)
      .then((response) => {
        // console.log(bob);
        return response.json();
      })
      .then((data) => {
        setTotalPages(Math.ceil(data.stats.count / 50));
        menus === []
          ? setMenus(data.menus)
          : setMenus([...menus, ...data.menus]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(menus);
  useEffect(() => {
    if (!doNotFetch) {
      fetchMenus();
    }

    getFavs();
  }, [resultPage, fetchAgain, searchSort]);
  return (
    <div className={classes.root}>
      {/* <Search /> */}
      {!loading ? (
        // ((<ScrollToTopOnMount />),
        menus.length !== 0 ? (
          <Grid container spacing={1} className={classes.menusContainer}>
            {menus.map((menu, index) => {
              return <Menu menu={menu} key={`${index}-${menu.sponsor}`} />;
            })}
            {resultPage < totalPages && (
              <Grid
                container
                justify="center"
                align="center"
                className={classes.loadMore}
              >
                <Grid item xs={12}>
                  <Fab color="secondary" size="large" aria-label="add">
                    <AddCircleIcon
                      className={classes.fabiIcon}
                      onClick={(e) => {
                        console.log(window.screenX, window.screenY);
                        e.preventDefault();
                        setDoNotFetch(false);
                        setResultPage(resultPage + 1);
                      }}
                    />
                  </Fab>
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <p>no results</p>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Menus;
