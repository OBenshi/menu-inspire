// 1. import the modules
import React, { createContext, useState } from "react";
// 2. initialize the context
const initMenusContext = {
  menus: [],
  fetchAgain: false,
  searchTerm: "",
  loading: true,
  resultPage: 1,
  doNotFetch: false,
  totalPages: null,
  searchSort: "date",
};

// 3. create context

export const MenusContext = createContext(initMenusContext);

// 4. make provider => value / children
export const MenusContextProvider = ({ children }) => {
  const [menus, setMenus] = useState(initMenusContext.menus);
  const [loading, setLoading] = useState(initMenusContext.loading);
  const [searchTerm, setSearchTerm] = useState(initMenusContext.searchTerm);
  const [fetchAgain, setFetchAgain] = useState(initMenusContext.fetchAgain);
  const [resultPage, setResultPage] = useState(initMenusContext.resultPage);
  const [doNotFetch, setDoNotFetch] = useState(initMenusContext.dodoNotFetch);
  const [totalPages, setTotalPages] = useState(initMenusContext.totalPages);
  const [searchSort, setSearchSort] = useState(initMenusContext.searchSort);

  const clearMenus = () => {
    setMenus([]);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };
  // console.log(menus);

  const changeFetchAgain = () => {
    setFetchAgain(!fetchAgain);
    // console.log(fetchAgain);
  };

  return (
    <MenusContext.Provider
      value={{
        menus,
        setMenus,
        clearMenus,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        clearSearchTerm,
        fetchAgain,
        setFetchAgain,
        changeFetchAgain,
        resultPage,
        setResultPage,
        doNotFetch,
        setDoNotFetch,
        totalPages,
        setTotalPages,
        searchSort,
        setSearchSort,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
