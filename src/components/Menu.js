import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  menusContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateZ(0)",
  },
  menu: {
    margin: "1rem",
  },
  pic: {
    height: "100%",
    width: "100%",
    "-webkit-box-shadow": "5px 5px 15px 5px #000000",
    boxShadow: "5px 5px 15px 5px #000000",
  },
}));
function Menu(props) {
  const { menu } = props;
  const classes = useStyles();
  return (
    <Link
      to={`detail/${menu.id}`}
      className={classes.menu}
      key={`${menu.id}LinkImg`}
    >
      <Grid item key={`${menu.id}Link`}>
        <img
          src={menu.thumbnail_src}
          alt={`${menu.sponsor},${menu.event}`}
          className={classes.pic}
        />
      </Grid>
    </Link>
  );
}
export default Menu;
