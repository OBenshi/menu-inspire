import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
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
