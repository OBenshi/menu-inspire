import React, { useState, useEffect } from "react";
import HelloWorld from "../components/HelloWorld.js";
import { Button } from "@material-ui/core";
import Menu from "../components/Menu.js";
import Loading from "../components/Loading.js";
function Home() {
  const [name, setName] = useState("Ottavia");
  const [age, setAge] = useState(27);

  const handleClick = (e) => {
    console.log(e);
    setName("Moe");
  };

  const myStyledDiv = {
    backgroundColor: "lightgrey",
  };
  return (
    <div style={myStyledDiv}>
      <h1>Hello {name}</h1>
      <Button onClick={handleClick}>Click me!</Button>

      <HelloWorld myAge={age} />
    </div>
  );
}
export default Home;
