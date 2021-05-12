import GetMenus from "./components/GetMenus";
import apiKey from "./key.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // const [menus, setMenus] = useState([]);
  // const fetchMenus = () => {
  // axios
  //   .get(`http://api.menus.nypl.org/menus?`)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // fetch(
  // `http://www.nokeynoshade.party/api/queens/all`
  // `http://api.menus.nypl.org/menus`,
  // {
  //   headers: {
  //     Authorization: `Token token=${apiKey}`,
  //   },
  // }
  // `https://ridb.recreation.gov/api/v1/campsites?offset=0`,
  // {
  //   headers: {
  //     apikey: apiKey,
  //   },
  // }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);

  //     setMenus(data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // };
  // useEffect(() => {
  //   fetchMenus();
  // });
  // console.log(menus);
  return (
    <div>
      <GetMenus />
      {/* appbar
      display
      footer  */}
    </div>
  );
}

export default App;
