// 1. import the modules
import React, { createContext, useState } from "react";
// 2. initialize the context
const initSearchContext = {
  searchTerm: "",
  loading: true,
};

// 3. create context

export const SearchContext = createContext(initSearchContext);

// 4. make provider => value / children
export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(initSearchContext.searchTerm);

  const clearSearchTerm = () => {
    setSearchTerm("");
  };
  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        clearSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
