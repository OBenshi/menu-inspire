import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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
}));

function MenuPage(props) {
  const { menuPage, currency } = props;
  const classes = useStyles();
  let { pageId } = useParams();

  useEffect(() => {
    console.log(9);
  }, [pageId]);

  return (
    <div key={pageId} className={classes.menuRoot}>
      {menuPage && (
        <Grid container direction="column" className={classes.menuPage}>
          <Grid item className={classes.page}>
            <Grid container className={classes.boi}>
              <Grid item className={classes.pagePic}>
                <img className={classes.pic} src={menuPage.large_src} alt="" />
              </Grid>
              {menuPage.dishes !== [] && (
                <Grid item xs={10} className={classes.pic}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        {menuPage.dishes.map((dish) => (
                          <TableRow key={dish.name}>
                            <TableCell component="th" scope="row">
                              {dish.name}
                            </TableCell>
                            {dish.price && (
                              <TableCell align="right">
                                {dish.price}
                                {currency && currency}
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
        </Grid>
      )}
    </div>
  );
}
export default MenuPage;
