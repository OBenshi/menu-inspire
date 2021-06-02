import { Drawer, Grid, List, ListItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React, { useContext, useState } from "react";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";
// import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";

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
    // background: "rgba(255, 184, 226, 0.8)",
  },
  drawerLogo: {
    background: "rgba(255, 184, 226, 0.2)",
  },
  special: {
    // fontFamily: "Permanent Marker",
    // fontSize: "2rem",
    // color: "orange",
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
    // color: theme.palette.secondary.contrastText,
    // color: "white",
    // fontFamily: "Permanent Marker",
    // fontSize: "1.5rem",
    textDecoration: "none",
  },
  linkDisabled: {
    display: "inline-flex",
    // color: theme.palette.secondary.contrastText,
    // color: "white",
    // fontFamily: "Permanent Marker",
    // fontSize: "1.5rem",
    // textDecoration: "underline",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    // width: 20,
    // height: 20,
  },
  list: {
    width: 230,
    background: "rgba(255, 184, 226, 0.2)",
  },
  drawerList: {
    paper: {
      background: "#ff0000",
    },
  },
  star: {
    color: "white",
  },
  linkItem: {
    padding: "0.3rem",
  },
  logoGrid: {
    flexGrow: 1,
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
      {!currentUser && (
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
      )}
      <Divider />
      {currentUser && (
        <List>
          <NavLink to="/Favourites">
            <ListItem button key={"favourites"}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"Favourites"} />
            </ListItem>
          </NavLink>{" "}
          <NavLink to="/dashboard">
            <ListItem button key={"dashboard"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage profile"} />
            </ListItem>
          </NavLink>
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
            color="secondary"
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
            className={classes.drawerList}
            elevation={16}
          >
            <Typography variant="h6" align="center" noWrap color="primary">
              MenuInspire<sup className={classes.star}>*</sup>
            </Typography>
            {list()}
          </Drawer>
          <Grid container>
            <Grid item className={classes.logoGrid}>
              <Typography
                className={classes.title}
                variant="h4"
                color="primary"
                // noWrap
                align="left"
              >
                MenuInspire<sup className={classes.star}>*</sup>
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                {/* {currentUser && currentUser.uid} */}
                {history.location.pathname !== "/" ? (
                  <Grid item className={classes.linkItem}>
                    <NavLink
                      to="/"
                      className={classes.link}
                      onClick={() => clearSearchTerm()}
                    >
                      <Typography
                        color="primary"
                        variant="h5"
                        variantMapping={{ h5: "h6" }}
                        align="center"
                      >
                        home{"\u00A0"}
                        <HomeIcon className={classes.icon} />
                      </Typography>
                    </NavLink>
                  </Grid>
                ) : (
                  <Grid item className={classes.linkItem}>
                    <Typography
                      color="secondary"
                      variant="h5"
                      variantMapping={{ h5: "h6" }}
                      className={classes.linkDisabled}
                      align="center"
                    >
                      {" "}
                      home{"\u00A0"}
                      <HomeIcon className={classes.icon} />
                    </Typography>
                  </Grid>
                )}
                {history.location.pathname !== "/menus" ? (
                  <Grid item className={classes.linkItem}>
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
                      <Typography
                        color="primary"
                        variant="h5"
                        variantMapping={{ h5: "h6" }}
                        align="center"
                      >
                        Menus{"\u00A0"}
                        <MenuBookIcon className={classes.icon} />
                      </Typography>
                    </NavLink>
                  </Grid>
                ) : (
                  <Grid item className={classes.linkItem}>
                    <Typography
                      color="secondary"
                      variant="h5"
                      variantMapping={{ h5: "h6" }}
                      className={classes.linkDisabled}
                      align="center"
                    >
                      Menus{"\u00A0"}
                      <MenuBookIcon className={classes.icon} />
                    </Typography>
                  </Grid>
                )}{" "}
                {!currentUser &&
                  (history.location.pathname !== "/signin" ? (
                    <Grid item className={classes.linkItem}>
                      <NavLink
                        to="/signin"
                        className={classes.link}
                        onClick={() => clearSearchTerm()}
                      >
                        <Typography
                          color="primary"
                          variant="h5"
                          variantMapping={{ h5: "h6" }}
                          align="center"
                          noWrap
                        >
                          {`Login`}
                          {"\u00A0"}
                          <ExitToAppIcon className={classes.icon} />
                        </Typography>
                      </NavLink>
                    </Grid>
                  ) : (
                    <Grid item className={classes.linkItem}>
                      <Typography
                        color="secondary"
                        variant="h5"
                        variantMapping={{ h5: "h6" }}
                        className={classes.linkDisabled}
                        align="center"
                        noWrap
                      >
                        {`Login`}
                        {"\u00A0"}
                        <FavoriteIcon className={classes.icon} />
                      </Typography>
                    </Grid>
                  ))}
                {/* {currentUser &&
                  (history.location.pathname !== "/Favourites" ? (
                    <Grid item className={classes.linkItem}>
                      <NavLink
                        to="/Favourites"
                        className={classes.link}
                        onClick={() => clearSearchTerm()}
                      >
                        <Typography
                          color="primary"
                          variant="h5"
                          variantMapping={{ h5: "h6" }}
                          align="center"
                          noWrap
                        >
                          {`${currentUser.displayName}'s Favourites`}
                          {"\u00A0"}
                          <FavoriteIcon className={classes.icon} />
                        </Typography>
                      </NavLink>
                    </Grid>
                  ) : (
                    <Grid item className={classes.linkItem}>
                      <Typography
                        color="secondary"
                        variant="h5"
                        variantMapping={{ h5: "h6" }}
                        className={classes.linkDisabled}
                        align="left"
                        noWrap
                      >
                        {`${currentUser.displayName}'s Favourites`}
                        {"\u00A0"}
                        <FavoriteIcon className={classes.icon} />
                      </Typography>
                    </Grid>
                  ))} */}
              </Grid>
            </Grid>
          </Grid>{" "}
        </Toolbar>{" "}
        {history.location.pathname === "/menus" && <Search />}
      </AppBar>
    </div>
  );
}
