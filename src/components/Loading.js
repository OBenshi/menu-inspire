import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: theme.palette.secondary.main,
    backgroundColor: "rgba(230, 163, 202, 0.5)",
    // position: "absolute",
  },
}));

function Loading() {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
export default Loading;
