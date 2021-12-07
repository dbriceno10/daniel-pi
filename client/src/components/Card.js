import React from "react";
import { Link } from "react-router-dom";
import { capitalizeStringWithTrim } from "../utils/utils";
import defaultImg from "../assets/who_is.png";
import styles from "./styles/Card.module.css";
export default function Card({ img, name, types, id, create }) {
  // types ---> es un arreglo con los tipos del pokemon
  return (
    <div className={styles.background}>
      {create ? (
        <span className={styles.created}>Created</span>
      ) : (
        <span className={styles.created}># {id}</span>
      )}
      <Link className={styles.link} to={`/home/${id}`}>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.name}>{name}</h2>
            <h5 className={styles.typescontainer}>
              {types?.map((type) => {
                return (
                  <p
                    className={styles[type]}
                    key={type}
                  >
                    {capitalizeStringWithTrim(type)}
                  </p>
                );
              })}
            </h5>
          </div>
          <div>
          {img?<img
              src={img}
              alt="img not found"
              width="150px"
              height="150px"
            />:<img
              src={defaultImg}
              alt="img not found"
              width="130px"
              height="130px"
              style={{margin: "10px"}}
            />}
          </div>
        </div>
      </Link>
    </div>
  );
}
