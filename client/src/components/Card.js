import React from "react";

export default function Card({ img, name, types }) {
  // types ---> es un arreglo con los tipos del pokemon
  return (
    <div>
      <img src={img} alt="img not found" width="200px" height="250px" />
      <h2>{name}</h2>
      <h5>{types}</h5>
    </div>
  );
}
