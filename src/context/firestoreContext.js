// 1. import the modules
import React, { createContext, useState, useContext } from "react";
import { db } from "../firebase";
// 2. initialize the context
// const initDbContext = {
//   menus: [],
//   fetchAgain: false,
//   searchTerm: "",
//   loading: true,
//   resultPage: 1,
//   doNotFetch: false,
//   totalPages: null,
//   searchSort: "date",
// };

// 3. create context

export const FirestoreContext = createContext();
export const useDb = () => useContext(FirestoreContext);

// 4. make provider => value / children
export const FirestoreContextProvider = ({ children }) => {
  const addNewUser = (uid, firstName, lastName, email, password) =>
    db
      .collection("users")
      .doc(uid)
      .set({
        first: firstName,
        last: lastName,
        email: email,
        password: password,
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  const addFavorite = (uid, menu) =>
    db
      .collection("users")
      .doc(uid)
      .collection(`${uid}-favorites`)
      .add(menu)
      .catch((error) => {
        console.error("Error adding favorite", error);
      });
  return (
    <FirestoreContext.Provider value={{ addNewUser, addFavorite }}>
      {children}
    </FirestoreContext.Provider>
  );
};
