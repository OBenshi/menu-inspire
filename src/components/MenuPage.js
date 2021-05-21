import React, { useState, useEffect } from "react";
import apiKey from "../key.js";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Loading from "../components/Loading.js";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "80rem",
    display: "flex",
    // height: "100vh",
    // width: "100vh",
    // background: "#ff0000",
  },
  page: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "1rem",
    marginTop: "1rem",
    height: "100%",
    width: "100%",
    // background: "#ff0000",
  },
  pic: {
    height: "100%",
    width: "100%",
    marginTop: "1rem",
    // marginBottom: "0rem",
  },
  table: {
    // minWidth: 650,
    height: "100%",
    width: "100%",
  },
  pagePic: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    // height: "100%",
    // width: "100%",
  },
}));

function MenuPage(props) {
  const { menuPage } = props;
  console.log("kkj", menuPage);
  const classes = useStyles();
  let { pageId } = useParams();
  console.log(pageId);
  //   const [menuPagei, setMenuPagei] = useState(props);
  //   setMenuPagei(menuPage);
  //   let { path, url } = useRouteMatch();

  useEffect(() => {
    console.log(9);
  }, [pageId]);

  return (
    <div key={pageId} className={classes.root}>
      {menuPage && (
        <Grid container direction="column">
          <Grid item className={classes.page}>
            <Grid container>
              <Grid item xs={12} md={6} className={classes.pagePic}>
                <img className={classes.pic} src={menuPage.large_src} alt="" />
              </Grid>
              {menuPage.dishes !== [] && (
                <Grid item className={classes.pic} xs={12} md={6}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        {menuPage.dishes.map((dish) => (
                          <TableRow key={dish.name}>
                            <TableCell component="th" scope="row">
                              {dish.name}
                            </TableCell>
                            {dish.price && (
                              <TableCell align="right">{dish.price}</TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
export default MenuPage;
