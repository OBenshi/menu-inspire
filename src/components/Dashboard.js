import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/firestoreContext";
import Menu from "../components/Menu";
export default function Dashboard() {
  const { currentUser } = useAuth();
  const { toggleFavorite, getFavs, favs, setFavs, checkIfFav, isFav } = useDb();
  useEffect(() => {
    getFavs();
  }, []);
  return (
    <div>
      {favs.map((fav) => (
        <Menu menu={fav} />
      ))}
    </div>
  );
}
