import React, { useState, useEffect } from "react";
import MenuPage from "../components/MenuPage.js";
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
  page: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  pic: {
    height: "100%",
    width: "100%",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  table: {
    // minWidth: 650,
  },
}));

function Detail(props) {
  const classes = useStyles();
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  const [menuPages, setMenuPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMenuPages = () => {
    fetch(
      `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus/${id}/pages/?&token=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.pages);
        setMenuPages(data.pages);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(id);

  useEffect(() => {
    fetchMenuPages();
  }, []);
  return (
    <div>
      {!loading ? (
        <div>
          <Breadcrumbs aria-label="breadcrumb" className={classes.Breadcrumbs}>
            {menuPages.map((page, index) => {
              console.log(`${url}/${page.id}`);
              return (
                <Link color="inherit" to={`${url}/${page.id}`}>
                  <Typography className={classes.title} variant="h6" noWrap>
                    {index}
                  </Typography>
                </Link>
              );
            })}
          </Breadcrumbs>
          <hr />

          <Switch>
            <Route exact path={path}>
              <h3>Please select a topic.</h3>
            </Route>

            {menuPages.map((page, index) => {
              return (
                <Route exact path={`${path}:pageId`} children={<MenuPage />} />
              );
            })}
          </Switch>

          <Grid container className={classes.page}>
            <Grid item xs={12} md={6}>
              <img
                className={classes.pic}
                src={menuPages[0].large_src}
                alt=""
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Loading />
      )}

      {/* <Grid container direction="column">
        {!loading ? (
          menuPages.map((page, index) => {
            return (
              <Grid item>
                <Grid container className={classes.page}>
                  <Grid item xs={12} md={6}>
                    <img className={classes.pic} src={page.large_src} alt="" />
                  </Grid>
                  {page.dishes !== [] && (
                    <Grid item className={classes.pic} xs={12} md={6}>
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableBody>
                            {page.dishes.map((dish) => (
                              <TableRow key={dish.name}>
                                <TableCell component="th" scope="row">
                                  {dish.name}
                                </TableCell>
                                {dish.price && (
                                  <TableCell align="right">
                                    {dish.price}$
                                  </TableCell>
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
            );
          })
        ) : (
          <Loading />
        )}
      </Grid> */}
    </div>
  );
}
export default Detail;

/* function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}
 */
