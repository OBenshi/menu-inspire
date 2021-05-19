import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { NavLink, Redirect, useHistory, useRouteMatch } from "react-router-dom";
import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  Breadcrumbs: {
    display: "flex",
    // position: "sticky",

    // justifyContent: "center",
    // background:
    //   // "radial-gradient(circle, #000000, #3b3b3b, #777777, #b9b9b9, #ffffff)",
    //   "radial-gradient(circle, #ffffff, #b9b9b9, #777777, #3b3b3b, #000000)",
  },
  link: {
    display: "inline-flex",
    // color: "primary",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const {
    searchTerm,
    setSearchTerm,
    fetchAgain,
    setFetchAgain,
    changeFetchAgain,
  } = useContext(SearchContext);
  const { clearMenus } = useContext(MenusContext);
  let { path, url } = useRouteMatch();

  const handleSearch = (userSearchTerm) => {
    // setSearchTerm("");
    clearMenus();
    setSearchTerm(userSearchTerm);
    path !== "/menus" ? history.push("/menus") : changeFetchAgain();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            MenuInspire
          </Typography>
          <div>
            {" "}
            <Breadcrumbs
              aria-label="breadcrumb"
              className={classes.Breadcrumbs}
              maxItems={9}
              itemsBeforeCollapse={9}
              itemsAfterCollapse={9}
            >
              <NavLink to="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                home
              </NavLink>
              <NavLink to="/menus" className={classes.link}>
                <WhatshotIcon className={classes.icon} />
                Menus
              </NavLink>
            </Breadcrumbs>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon} onClick={() => console.log(8)}>
              <SearchIcon />
            </div>
            <InputBase
              id="mainSearch"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyUp={(eve) => {
                // console.log(eve.key);
                eve.key === "Enter" && handleSearch(eve.target.value);
              }}
            />
          </div>
        </Toolbar>
        <p>{searchTerm}</p>
      </AppBar>
    </div>
  );
}
