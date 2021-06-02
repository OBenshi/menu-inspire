import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollX, setLastScrollX] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  // const [favs, setFavs] = useState([]);

  const addNewUser = (uid, firstName, lastName, email, password) =>
    db
      .collection("users")
      .doc(uid)
      .set({
        first: firstName,
        last: lastName,
        email: email,
        password: password,
        favs: [],
      })
      .then(() => {
        auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);
          history.push("/");
        });
        // db.collection("users")
        //   .doc(uid)
        //   .get()
        //   .then((doc) => {
        //     console.log(doc.data());
        //     // setCurrentUser(doc.data());
        //   });
      })
      //   .then((docRef) => {
      //     console.log(docRef);
      //     // console.log("Document written with ID: ", docRef.id);
      //   })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  const signup = (firstName, lastName, email, password) =>
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: firstName,
        });
        console.log(user);
        addNewUser(user.user.uid, firstName, lastName, email, password);
      })

      .catch((e) => {
        setError(e);
      });

  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password).catch((e) => {
      setError(e);
    });

  const logout = () =>
    auth.signOut().catch((e) => {
      setError(e);
    });

  const resetPassword = (email) =>
    auth.sendPasswordResetEmail(email).catch((e) => {
      setError(e);
    });

  const updateEmail = (email) =>
    currentUser.updateEmail(email).catch((e) => {
      setError(e);
    });

  const updatePassword = (password) =>
    currentUser.updatePassword(password).catch((e) => {
      setError(e);
    });
  const getUserInfo = (currentUser) => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("userInfo", doc.data());
          setUserInfo(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    getUserInfo,
    userInfo,
    setUserInfo,
    lastScrollX,
    setLastScrollX,
    lastScrollY,
    setLastScrollY,
    updateEmail,
    updatePassword,
    error,
    setError,
    // favs,
    // setFavs,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   const unsubscribe = async () => {
  //     auth.onAuthStateChanged(async (user) => {
  //       setCurrentUser(user);
  //       // console.log(user);
  //       if (currentUser) {
  //         const doc = await db.collection("users").doc(currentUser.uid).get();
  //         console.log(doc);
  //         if (!doc.exists) {
  //           console.log("No such document!");
  //         } else {
  //           setFavs(doc.data().favs);
  //           console.log("Document data:", doc.data().favs, "favs:", favs);
  //         }
  //       }
  //       setLoading(false);
  //     });
  //   };
  //   unsubscribe();
  // }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
