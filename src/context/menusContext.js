// 1. import the modules
import React, { createContext, useState } from "react";
// 2. initialize the context
const initMenusContext = {
  menus: [],
  loading: true,
};

// 3. create context

export const MenusContext = createContext(initMenusContext);

// 4. make provider => value / children
export const MenusContextProvider = ({ children }) => {
  const [menus, setMenus] = useState(initMenusContext.menus);
  const [loading, setLoading] = useState(initMenusContext.loading);

  const clearMenus = () => {
    setMenus([]);
  };

  console.log(menus);

  return (
    <MenusContext.Provider
      value={{
        menus,
        setMenus,
        clearMenus,
        loading,
        setLoading,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
