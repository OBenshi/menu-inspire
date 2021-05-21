import { Grid } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
// import { SearchContext } from "../context/searchContext";
import { MenusContext } from "../context/menusContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "radial-gradient(circle, #ff6700, #df3b3e, #ad2751, #722550, #3a1f3b, #3a1f3b, #3a1f3b, #3a1f3b, #722550, #ad2751, #df3b3e, #ff6700)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    // vertical padding + font size from searchIcon
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
  //   const [SearchSort, setSearchSort] = React.useState("relevance");
  const history = useHistory();
  const {
    searchTerm,
    setSearchTerm,
    clearSearchTerm,
    fetchAgain,
    setFetchAgain,
    changeFetchAgain,
    doNotFetch,
    setDoNotFetch,
    resultPage,
    setResultPage,
    searchSort,
    setSearchSort,
    loading,
  } = useContext(MenusContext);
  const { clearMenus } = useContext(MenusContext);
  let { path, url } = useRouteMatch();

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
    <Grid container className={classes.root}>
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
      {!loading && (
        <Grid item>
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
      )}
    </Grid>
  );
}

export default Search;
