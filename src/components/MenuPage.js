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

function MenuPage(props) {
  //   const { menuPage } = props;
  //   const classes = useStyles();
  let { pageId } = useParams();
  //   let { path, url } = useRouteMatch();

  //   useEffect(() => {
  //     fetchMenuPages();
  //   }, []);
  console.log(9999);
  return (
    <div>
      <h3>{pageId}</h3>
    </div>
  );

  // <Grid container direction="column">

  //   {/* {!loading ? (
  //       menuPages.map((page, index) => {
  //         return (
  //           <Grid item>
  //             <Grid container className={classes.page}>
  //               <Grid item xs={12} md={6}>
  //                 <img className={classes.pic} src={page.large_src} alt="" />
  //               </Grid>
  //               {page.dishes !== [] && (
  //                 <Grid item className={classes.pic} xs={12} md={6}>
  //                   <TableContainer component={Paper}>
  //                     <Table
  //                       className={classes.table}
  //                       aria-label="simple table"
  //                     >
  //                       <TableBody>
  //                         {page.dishes.map((dish) => (
  //                           <TableRow key={dish.name}>
  //                             <TableCell component="th" scope="row">
  //                               {dish.name}
  //                             </TableCell>
  //                             {dish.price && (
  //                               <TableCell align="right">
  //                                 {dish.price}$
  //                               </TableCell>
  //                             )}
  //                           </TableRow>
  //                         ))}
  //                       </TableBody>
  //                     </Table>
  //                   </TableContainer>
  //                 </Grid>
  //               )}
  //             </Grid>
  //           </Grid>
  //         );
  //       })
  //     ) : (
  //       <Loading />
  //     )} */}
  // </Grid>
}
export default MenuPage;
