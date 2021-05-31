// 1. import the modules
import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useAuth } from "./AuthContext";
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
  const { currentUser } = useAuth();
  const [favs, setFavs] = useState([]);
  const [isFav, setIsFav] = useState(null);
  // console.log(currentUser.uid);

  const getFavs = async () => {
    // setCurrentUser(user);
    // console.log(user);
    if (currentUser) {
      const doc = await db.collection("users").doc(currentUser.uid).get();
      console.log(doc);
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("!!B4!! Document data:", doc.data().favs, "favs:", favs);
        setFavs(doc.data().favs);
        console.log("Document data:", doc.data().favs, "favs:", favs);
      }
    }
  };

  const checkIfFav = (menuId) => {
    favs.find((x) => x.id === parseInt(menuId))
      ? setIsFav(true)
      : setIsFav(false);
    console.log("isFav", isFav);
  };

  const toggleFavorite = (uid, menu) => {
    // console.log("§§favs§§", favs);
    // console.log(favs.find((x) => x.id === parseInt(menu.id)));
    !isFav
      ? db
          .collection("users")
          .doc(uid)
          .update({
            favs: firebase.firestore.FieldValue.arrayUnion(menu),
          })
      : db
          .collection("users")
          .doc(uid)
          .update({
            favs: firebase.firestore.FieldValue.arrayRemove(menu),
          });
    setIsFav(!isFav);
    // console.log(`${favs}`);
  };

  return (
    <FirestoreContext.Provider
      value={{ toggleFavorite, getFavs, favs, checkIfFav, isFav }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
