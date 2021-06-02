import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  menuRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  },
  table: {
    background: theme.palette.secondary.light,
  },
  pagePic: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  menuPage: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  boi: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  infoTable: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
}));

function GeneralInfo(props) {
  const classes = useStyles();
  const menu = props.menu;
  console.log(menu);

  return (
    <div className={classes.infoTable}>
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow key={menu.id * 55}>
                <TableCell component="th" scope="row">
                  Sponsor
                </TableCell>
                <TableCell align="right">
                  <Typography align="center">{menu.sponsor}</Typography>
                </TableCell>
              </TableRow>
              <TableRow key={menu.id * 56}>
                <TableCell component="th" scope="row">
                  Date
                </TableCell>
                <TableCell align="right">
                  <Typography align="center">
                    {menu.year && <span>{menu.year}/</span>}
                    {menu.month && <span>{menu.month}/</span>}
                    {menu.day && <span>{menu.day}</span>}
                  </Typography>
                </TableCell>
              </TableRow>
              {menu.location && (
                <TableRow key={menu.id * 57}>
                  <TableCell component="th" scope="row">
                    Location
                  </TableCell>
                  <TableCell align="right">
                    <Typography align="center">{menu.location}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {menu.physical_description && (
                <TableRow key={menu.id * 58}>
                  <TableCell component="th" scope="row">
                    Physical description:
                  </TableCell>
                  <TableCell align="right">
                    <Typography align="center">
                      {menu.physical_description}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {menu.notes && (
                <TableRow key={menu.id * 59}>
                  <TableCell component="th" scope="row">
                    Notes:
                  </TableCell>
                  <TableCell align="right">
                    <Typography align="center">{menu.notes}</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default GeneralInfo;
