// 1. import the modules
import React, { createContext, useState } from "react";
// 2. initialize the context
const initSearchContext = {
  fetchAgain: false,
  searchTerm: "",
  loading: true,
};

// 3. create context

export const SearchContext = createContext(initSearchContext);

// 4. make provider => value / children
export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(initSearchContext.searchTerm);
  const [fetchAgain, setFetchAgain] = useState(initSearchContext.fetchAgain);

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const changeFetchAgain = () => {
    console.log(fetchAgain);
    setFetchAgain(true);
  };
  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        clearSearchTerm,
        fetchAgain,
        setFetchAgain,
        changeFetchAgain,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
