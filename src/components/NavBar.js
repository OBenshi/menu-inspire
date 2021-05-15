// import React from "react";
import { Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
// import { Menu as MenuIcon } from "@material-ui/icons";

// export default function NavBar() {
//   return (
//     <AppBar position="fixed" color="primary">
//       <Toolbar>
//         <Link to="/">
//           <Typography variant="h6">home</Typography>
//         </Link>
//         <Link to="/menus">Menus</Link>
//       </Toolbar>
//     </AppBar>
//     // <nav>
//     //   <ul>
//     //     <li>
//     //       <Link to="/">Home</Link>
//     //     </li>
//     //     <li>
//     //       <Link to="/menus">Menus</Link>
//     //     </li>
//     //   </ul>
//     // </nav>
//   );
// }
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
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
    position: "sticky",

    justifyContent: "center",
    // background:
    //   // "radial-gradient(circle, #000000, #3b3b3b, #777777, #b9b9b9, #ffffff)",
    //   "radial-gradient(circle, #ffffff, #b9b9b9, #777777, #3b3b3b, #000000)",
  },
  link: {
    display: "flex",
    color: "primary",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();

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
            Material-UI
          </Typography>
          <div>
            {" "}
            <Breadcrumbs
              aria-label="breadcrumb"
              className={classes.Breadcrumbs}
            >
              <Link color="inherit" to="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                <Typography className={classes.title} variant="h6" noWrap>
                  home
                </Typography>
              </Link>
              <Link color="inherit" to="/menus" className={classes.link}>
                <WhatshotIcon className={classes.icon} />
                Menus
              </Link>
            </Breadcrumbs>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// const useStyles = makeStyles((theme) => ({
//   Breadcrumbs: {
//     display: "flex",
//     position: "sticky",

//     justifyContent: "center",
//     background:
//       // "radial-gradient(circle, #000000, #3b3b3b, #777777, #b9b9b9, #ffffff)",
//       "radial-gradient(circle, #ffffff, #b9b9b9, #777777, #3b3b3b, #000000)",
//   },
//   link: {
//     display: "flex",
//   },
//   icon: {
//     marginRight: theme.spacing(0.5),
//     width: 20,
//     height: 20,
//   },
// }));

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

// export default function NavBar() {
//   const classes = useStyles();

//   return (
// <Breadcrumbs aria-label="breadcrumb" className={classes.Breadcrumbs}>
//   <Link color="inherit" to="/" className={classes.link}>
//     <HomeIcon className={classes.icon} />
//     Home
//   </Link>
//   <Link color="inherit" to="/menus" className={classes.link}>
//     <WhatshotIcon className={classes.icon} />
//     Menus
//   </Link>
//   <Typography color="textPrimary" className={classes.link}>
//     <GrainIcon className={classes.icon} />
//     Breadcrumb
//   </Typography>
// </Breadcrumbs>
//   );
// }
