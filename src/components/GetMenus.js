// import React from "react";
//   const GetMenus = () => {
//     console.log(apiKey);
//     fetch(
//       `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus?per_page=1&token=${apiKey.apiKey}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   useEffect(() => {
//     fetchApi();
//   });

//   return ()

// export default GetMenus;

import React, { useState, useEffect } from "react";
import apiKey from "../key.js";

const GetMenus = () => {
  console.log(apiKey);
  const [menus, setMenus] = useState([]);
  const fetchMenus = () => {
    fetch(
      `https://api.jsonbin.io/b/609be2f81a02f86e1f0aa409`,
      {
        headers: {
          "secret-key":
            "$2b$10$OAvZhY0ujX2TpQXV.Z1IGebEbLkQaZvuF4Fa413X3WtOip8vjpHhi",
        },
      }
      //   `https://cab-cors-anywhere.herokuapp.com/http://api.menus.nypl.org/menus?per_page=1&token=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenus(data.menus);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
