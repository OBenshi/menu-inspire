import { Grid, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from "@material-ui/core/InputBase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
// import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";
const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    marginBottom: "1rem",
    background: "tranparent",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
  },
}));

function Search(props) {
  const classes = useStyles();
  const {
    searchTerm,
    setSearchTerm,
    changeFetchAgain,
    setDoNotFetch,
    setResultPage,
    searchSort,
    setSearchSort,
    loading,
  } = useContext(MenusContext);
  const { clearMenus } = useContext(MenusContext);

  const handleSearch = (userSearchTerm) => {
    setDoNotFetch(false);
    clearMenus();
    setSearchTerm(userSearchTerm);
    setResultPage(1);
    changeFetchAgain();
    // history.push("/menus");
  };

  const handleChange = (event) => {
    clearMenus();
    setSearchSort(event.target.value);
    setResultPage(1);
  };

  return (
    !loading && (
      <Grid container className={classes.searchBar}>
        <Grid item>
          <Typography
            // align="left"
            color="textSecondary"
            variantMapping={{ h5: "h2" }}
            variant="h4"
          >
            <i> Find a menu</i>
          </Typography>
        </Grid>{" "}
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="mainSearch"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyUp={(eve) => {
                // console.log(eve.key);
                eve.key === "Enter" && handleSearch(eve.target.value);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item style={{ color: "white" }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort menus by:</FormLabel>
            <RadioGroup
              aria-label="sort"
              name="sort1"
              className={classes.radioGroup}
              value={searchSort}
              onChange={handleChange}
            >
              <FormControlLabel value="date" control={<Radio />} label="Date" />
              <FormControlLabel value="name" control={<Radio />} label="Name" />
              {searchTerm !== "" && (
                <FormControlLabel
                  value="relevance"
                  control={<Radio />}
                  label="Relevance"
                />
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    )
  );
}

export default Search;
