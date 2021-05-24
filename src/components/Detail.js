import React, { useState, useEffect, useContext } from "react";
import MenuPage from "../components/MenuPage.js";
import apiKey from "../key.js";
import { useParams } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
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
import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/firestoreContext";
import { MenusContext } from "../context/menusContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import GeneralInfo from "../components/GeneralInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  page: {
    display: "flex",
    // alignItems: "flex-start",
    marginBottom: "1rem",
    marginTop: "10rem",
    // flexWrap: "noWrap",
  },
  // pic: {
  //   // height: "100%",
  //   // width: "100%",
  //   // marginTop: "0rem",
  //   marginBottom: "3rem",
  // },
  table: {
    // minWidth: 650,
  },
  thumb: {
    // height: "40%",
    // width: "40%",
  },
}));

function Detail(props) {
  const classes = useStyles();
  const { menus, setMenus, clearMenus } = useContext(MenusContext);
  const {
    fetchAgain,
    setFetchAgain,
    changeFetchAgain,
    doNotFetch,
    setDoNotFetch,
  } = useContext(MenusContext);
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  const [menuPages, setMenuPages] = useState([]);
  const [menuMom, setMenuMom] = useState("");
  const [loading, setLoading] = useState(true);
  const { signup, currentUser } = useAuth();
  const { addFavorite } = useDb();
  const history = useHistory();
  const fetchMenuPages = () => {
    fetch(
      `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus/${id}/pages/?&token=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMenuPages(data.pages);
        setMenuMom(
          menus.find((x) => x.id === parseInt(id))
          // menus.find((x) => x.id === parseInt(data.links[0].href.slice(32)))
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(menuMom);
  useEffect(() => {
    fetchMenuPages();
  }, [currentUser]);
  return (
    <div>
      {!loading ? (
        <div>
          <Button onClick={() => addFavorite(currentUser.uid, menuMom)}>
            take
          </Button>{" "}
          <Button onClick={() => {}}>take me back to my search</Button>
          <Router>
            <div className={classes.root}>
              <Switch>
                <Route exact path={path}>
                  <GeneralInfo menu={menuMom} />
                </Route>

                {menuPages ? (
                  menuPages.map((page, index) => {
                    // console.log(page);
                    return (
                      <Route
                        exact
                        path={`${path}/${page.id}`}
                        // path={`${path}/:pageId`}
                        // children={() => <MenuPage menuPage={page} />}
                        // render={() => <MenuPage menuPage={page}}/>
                      >
                        <MenuPage menuPage={page} />
                      </Route>
                    );
                  })
                ) : (
                  <p>fail</p>
                )}
              </Switch>
              {/* <Breadcrumbs
              aria-label="breadcrumb"
              className={classes.Breadcrumbs}
            > */}

              <Grid container direction="row" className={classes.page}>
                <Typography className={classes.title} variant="h5" noWrap>
                  select a menu page
                </Typography>{" "}
                <Grid item>
                  <Link color="inherit" to={`${path}`}>
                    hi
                  </Link>
                </Grid>
                {menuPages.map((page, index) => {
                  // console.log(page);
                  return (
                    <Grid item>
                      <Link color="inherit" to={`${url}/${page.id}`}>
                        {/* <Typography className={classes.title} variant="h6" noWrap>
                      {index + 1}
                    </Typography> */}
                        <img
                          src={page.thumbnail_src}
                          className={classes.thumb}
                        />
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
              {/* </Breadcrumbs> */}
              <hr />

              {/* <Grid container className={classes.page}>
              <Grid item xs={12} md={6}>
                <img
                  className={classes.pic}
                  src={menuPages[0].large_src}
                  alt=""
                />
              </Grid>
            </Grid> */}
            </div>
          </Router>
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
