import React from "react";

function HelloWorld(props) {
  const age = props.myAge;
  return (
    <div>
      <h1>Hello world</h1>
      <p>{age}</p>
    </div>
  );
}
export default HelloWorld;
