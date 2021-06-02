import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/firestoreContext";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./Menu";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    paddingBottom: "5rem",

    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
  },
  menusContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: 500,
    // height: "5rem",
    transform: "translateZ(0)",
  },
}));
export default function Favs(props) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { getFavs, favs } = useDb();
  console.log("currentUser is", currentUser);
  useEffect(() => {
    getFavs();
  }, []);
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Hello {currentUser.displayName},
          </Typography>
        </Grid>

        {favs.length > 0 ? (
          <Grid item xs>
            <Grid container spacing={1} className={classes.menusContainer}>
              {favs.map((fav) => {
                console.log(fav);
                return <Menu menu={fav} />;
              })}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={10}>
            <Typography variant="h5" align="center">
              It seems like you haven't picked any Favourites yet...
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
