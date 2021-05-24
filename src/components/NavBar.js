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
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
// import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { ClickAwayListener, Drawer, List, ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";
import { useAuth } from "../context/AuthContext";
const useStyles = makeStyles((theme) => ({
  appBarchen: {
    background:
      "radial-gradient(circle, #ff6700, #df3b3e, #ad2751, #722550, #3a1f3b, #3a1f3b, #3a1f3b, #3a1f3b, #722550, #ad2751, #df3b3e, #ff6700)",
    // "linear-gradient(to right , #ff6700, #ff726a, #ff90af, #ffb6e2, #fdd9fd, #fdd9fd, #fdd9fd, #fdd9fd, #ffb6e2, #ff90af, #ff726a, #ff6700)",
    // "radial-gradient(circle, #86a8e7, #a4b6eb, #bdc6ef, #d4d6f3, #e8e7f8, #e8e7f8, #e8e7f8, #e8e7f8, #d4d6f3, #bdc6ef, #a4b6eb, #86a8e7)",
    // "radial-gradient(circle, #ffffff, #eeedfa, #dadcf5, #c5cbf1, #acbced, #acbced, #acbced, #acbced, #c5cbf1, #dadcf5, #eeedfa, #ffffff)",
  },
  root: {
    flexGrow: 1,
    // backgroundColor: "#FFFFff",
    marginBottom: "1rem",
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
  special: {
    fontFamily: "Permanent Marker",
    fontSize: "2rem",
    color: "orange",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
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
    color: "white",
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
    // color: theme.palette.primary.contrastText,
    color: "white",
    fontFamily: "Permanent Marker",
    fontSize: "1.5rem",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  list: {
    width: 250,
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const {
    searchTerm,
    setSearchTerm,
    clearSearchTerm,
    fetchAgain,
    setFetchAgain,
    changeFetchAgain,
    doNotFetch,
    setDoNotFetch,
    resultPage,
    setResultPage,
  } = useContext(MenusContext);
  const { clearMenus } = useContext(MenusContext);
  let { path, url } = useRouteMatch();
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };
  // const toggleDrawer = (open) => (event) => {
  //   setDrawerState(open);
  // };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink to="/signup">
          <ListItem button key={"signup"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign up"} />
          </ListItem>{" "}
        </NavLink>
        <NavLink to="/signin">
          <ListItem button key={"signin"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign in"} />
          </ListItem>{" "}
        </NavLink>
      </List>
      <Divider />
      {currentUser && (
        <List>
          <ListItem button key={"logout"} onClick={handleLogOut}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      )}
    </div>
  );

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }

  const handleSearch = (userSearchTerm) => {
    setDoNotFetch(false);
    clearMenus();
    setSearchTerm(userSearchTerm);
    setResultPage(1);
    changeFetchAgain();
    history.push("/menus");
  };

  const blankIt = () => {
    clearMenus();
    clearSearchTerm();
    setResultPage(1);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBarchen}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            {" "}
            <MenuIcon />
          </IconButton>{" "}
          <Drawer
            anchor={"right"}
            open={drawerState}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
          <Typography className={classes.title} variant="h6" noWrap>
            <span className={classes.special}>Menu</span>
            <span className={classes.special}>Inspire</span> <sup>*</sup>
          </Typography>
          <div>
            {currentUser && currentUser.uid}
            {/* {" "}
            <Breadcrumbs
              aria-label="breadcrumb"
              className={classes.Breadcrumbs}
              maxItems={9}
              itemsBeforeCollapse={9}
              itemsAfterCollapse={9}
            > */}
            {/* <Button> */}
            {history.location.pathname !== "/" ? (
              <NavLink
                to="/"
                className={classes.link}
                onClick={() => clearSearchTerm()}
              >
                <HomeIcon className={classes.icon} />
                home
              </NavLink>
            ) : (
              <span className={classes.link}>
                {" "}
                <HomeIcon className={classes.icon} />
                home
              </span>
            )}
            {/* </Button> */}

            {history.location.pathname !== "/menus" ? (
              <NavLink
                to="/menus"
                className={classes.link}
                onClick={(event) => {
                  clearMenus();
                  clearSearchTerm();
                  setResultPage(1);
                  changeFetchAgain();
                  setDoNotFetch(false);
                  console.log(resultPage, searchTerm);
                }}
              >
                <WhatshotIcon className={classes.icon} />
                Menus
              </NavLink>
            ) : (
              <span className={classes.link}>
                {" "}
                <WhatshotIcon className={classes.icon} />
                Menus
              </span>
            )}
            {/* </Breadcrumbs> */}
          </div>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
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
          </div> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
