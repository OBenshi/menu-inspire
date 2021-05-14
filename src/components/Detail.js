import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  pic: {
    // height: "100%",
    // width: "100%",
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
        <Grid container className={classes.page}>
          <Grid item xs={12} md={6}>
            <img className={classes.pic} src={menuPages[0].large_src} alt="" />
          </Grid>
        </Grid>
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
