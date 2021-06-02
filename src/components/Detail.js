import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import GeneralInfo from "../components/GeneralInfo";
import Loading from "../components/Loading.js";
import MenuPage from "../components/MenuPage.js";
import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/firestoreContext";
import { MenusContext } from "../context/menusContext";
import apiKey from "../key.js";
import ScrollToTop from "./ScrollTop";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    paddingBottom: "12rem",
  },
  page: {
    display: "flex",
    // alignItems: "flex-start",
    marginBottom: "1rem",
    // marginTop: "10rem",
    // flexWrap: "noWrap",
    justifyContent: "center",
  },
  table: {},
  thumb: {},
  bob: {
    display: "flex",
    margin: "none",
  },
  kol: {
    height: "100%",
  },
  favButton: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Detail(props) {
  const classes = useStyles();
  const { menus, setDoNotFetch } = useContext(MenusContext);
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  const [menuPages, setMenuPages] = useState([]);
  const [menuMom, setMenuMom] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toggleFavorite, getFavs, favs, checkIfFav, isFav } = useDb();
  const history = useHistory();
  const fetchMenuPages = () => {
    fetch(
      `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus/${id}/pages/?&token=${process.env.REACT_APP_NYPL_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMenuPages(data.pages);
        if (menus.length !== 0) {
          setMenuMom(menus.find((x) => x.id === parseInt(id)));
        } else {
          console.log(favs.find((x) => x.id === parseInt(id)));
          setMenuMom(favs.find((x) => x.id === parseInt(id)));
          console.log(menuMom);
        }
        if (menuMom === null) {
          fetch(
            `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus/${id}?&token=${process.env.REACT_APP_NYPL_API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              setMenuMom(data);
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(menuMom);
  useEffect(() => {
    fetchMenuPages();
    getFavs();
    checkIfFav(id);
    console.log("user is", currentUser);
  }, []);
  return (
    <div className={classes.kol} key={`${id}div`}>
      {!loading ? (
        <div className={classes.root}>
          {" "}
          <Router>
            <Grid container justify="center">
              {" "}
              {menus.length > 0 && (
                <Grid item xs={5}>
                  <Button
                    onClick={() => {
                      setDoNotFetch(true);
                      history.push("/menus");
                    }}
                    variant="contained"
                    color="primary"
                  >
                    <Typography>Back to my search</Typography>
                  </Button>
                </Grid>
              )}{" "}
              <Grid item xs={5}>
                <Link color="inherit" to={`${path}`}>
                  <Button variant="contained" color="primary">
                    <Typography>Info about this menu</Typography>
                  </Button>{" "}
                </Link>
              </Grid>
              {currentUser !== null && (
                <Grid item xs={12} className={classes.favButton}>
                  {isFav ? (
                    <Tooltip title="Add Favorite">
                      <IconButton
                        onClick={() => toggleFavorite(currentUser.uid, menuMom)}
                        aria-label="Add Favorite"
                        color="primary"
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Remove Favorite">
                      <IconButton
                        onClick={() => toggleFavorite(currentUser.uid, menuMom)}
                        aria-label="Remove Favorite"
                        color="primary"
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              )}
            </Grid>{" "}
            <div className={classes.root}>
              <Switch>
                <Route exact path={path}>
                  {" "}
                  <ScrollToTop />
                  {/* {console.log("menuMom is", menuMom)} */}
                  <GeneralInfo menu={menuMom} />
                </Route>

                {menuPages ? (
                  menuPages.map((page, index) => {
                    // console.log(page);
                    return (
                      <Route
                        exact
                        path={`${path}/${page.id}`}
                        key={index * page.id}
                      >
                        <ScrollToTop />
                        <MenuPage
                          menuPage={page}
                          currency={menuMom.currency_symbol}
                        />
                      </Route>
                    );
                  })
                ) : (
                  <p>fail</p>
                )}
              </Switch>{" "}
              <Grid container direction="row" className={classes.page}>
                {menuPages.map((page, index) => {
                  // console.log(page);
                  return (
                    <Grid
                      item
                      className={classes.bob}
                      key={`${menuMom.sponsor} Menu, page number ${page.page_number}`}
                    >
                      <Tooltip
                        title={`${menuMom.sponsor} Menu, page number ${page.page_number}`}
                      >
                        <Link
                          color="inherit"
                          to={`${url}/${page.id}`}
                          className={classes.thumb}
                        >
                          <img
                            key={`${id}pagediv`}
                            src={page.thumbnail_src}
                            alt={`${menuMom.sponsor} Menu, page number ${page.page_number}`}
                          />
                        </Link>
                      </Tooltip>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Router>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Detail;
