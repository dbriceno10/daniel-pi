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
                  <span
                    className={styles[type]}
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
          <div>
            <img
              src={img ? img : defaultImg}
              alt="img not found"
              width="150px"
              height="150px"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
