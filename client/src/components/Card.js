import React from "react";
import { Link } from "react-router-dom";
import { capitalizeStringWithTrim } from "../utils/utils";

export default function Card({ img, name, types, id }) {
  // types ---> es un arreglo con los tipos del pokemon
  return (
    <div>
      <Link to={`/home/${id}`}>
        <img src={img} alt="img not found" width="200px" height="250px" />
      </Link>
      <h2>{name}</h2>
      <h5>
        {types?.map((type) => {
          return (
            <span
              style={{
                marginLeft: "2px",
                marginRight: "2px",
              }}
              key={type}
            >
              {capitalizeStringWithTrim(type)}
            </span>
          );
        })}
      </h5>
    </div>
  );
}
