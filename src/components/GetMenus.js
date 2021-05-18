import React, { useState, useEffect } from "react";
import apiKey from "../key.js";

const GetMenus = () => {
  const [menus, setMenus] = useState([]);
  const fetchMenus = () => {
    fetch(
      `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus?&token=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMenus(data.menus);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(menus);
  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div>
      {menus &&
        menus.map((menu) => {
          return <img src={menu.large_src} />;
        })}
    </div>
  );
};
export default GetMenus;
