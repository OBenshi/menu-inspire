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
import InfoIcon from "@material-ui/icons/Info";
const useStyles = makeStyles((theme) => ({
  appBarchen: {
    background: theme.secondary.dark,
  },
}));
function GeneralInfoThumb() {
  return (
    <React.Fragment>
      <InfoIcon />
    </React.Fragment>
  );
}

export default GeneralInfoThumb;
