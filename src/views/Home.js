import { Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  special: {
    // fontFamily: "Permanent Marker",
    // fontSize: "2rem",
    // color: "orange",
  },
  vidItemBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
    marginTop: "1rem",
    position: "relative",
    overflow: "shown",
    width: "100%",
    paddingTop: "56.25%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */,
  },
  responsiveIframe: {
    "-webkit-box-shadow": "0px 0px 50px 0px rgba(0,0,0,0.79)",
    boxShadow: "0px 0px 50px 0px rgba(0,0,0,0.79)",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  root: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "8rem",
  },
  root9: {
    // background: "#ff0000",
  },
  signupBox: {
    // margin: "1rem",
    // padding: "2rem",
  },
  signupButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textDecoration: "none",
  },
}));

function Home(props) {
  const { currentUser } = useAuth();
  const classes = useStyles();
  const myDate = new Date();
  let hrs = myDate.getHours();

  let greet = null;
  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
  console.log(greet);
  return (
    <div className={classes.root9}>
      <Grid
        container
        direction="column"
        alignContent="center"
        className={classes.root}
      >
        {currentUser && (
          <Grid item>
            <Typography align="left">
              {greet},{currentUser.displayName}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography
            variant="h1"
            align="center"
            noWrap
            className={classes.special}
            color="primary"
          >
            MenuInspire
            <sup style={{ color: "white" }}>*</sup>
          </Typography>
        </Grid>{" "}
        <Grid item xs={11} md={5}>
          <Typography variant="h5" align="center">
            There's a lot of data behind The New York Public Library's What's On
            The Menu?, and here's your chance to explore it
          </Typography>{" "}
        </Grid>
        {!currentUser && (
          <Grid item xs={12}>
            <Paper
              elevation={24}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "1rem",
                padding: "1rem",
                background: "rgba(255, 184, 226, 0.1)",
              }}
            >
              <Grid
                container
                className={classes.signupBox}
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Typography align="center">
                    Don't have an account yet?
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.signupButton}>
                  <Link to="/signup">
                    <Button variant="contained" color="primary">
                      <Typography align="center" color="textSecondary">
                        signup
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
        <Grid item xs={10} className={classes.vidItemBox}>
          <iframe
            // width="560"
            // height="315"
            className={classes.responsiveIframe}
            src="https://www.youtube.com/embed/2RmdjHVHaL4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Grid>
        <Grid item xs={11}>
          <Typography align="center" variant="body2" paragraph={true}>
            With approximately 45,000 menus dating from the 1840s to the
            present, The New York Public Library’s restaurant menu collection is
            one of the largest in the world, used by historians, chefs,
            novelists and everyday food enthusiasts, MenuInspire<sup>*</sup>{" "}
            provides a colourful, user-friendly interface for exploring it.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
