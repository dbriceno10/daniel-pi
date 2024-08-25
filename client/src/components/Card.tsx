import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { capitalizeStringWithTrim } from "../utils/utils";
import { CardProps } from "./interfaces";
import defaultImg from "../assets/who_is.png";

import styles from "./styles/Card.module.scss";

const Card: React.FC<CardProps> = ({
  img,
  name,
  types,
  id,
  create,
}): JSX.Element => {
  // types ---> es un arreglo con los tipos del pokemon
  const navigate = useNavigate();
  return (
    <Box className={styles.background}>
      {create ? (
        <span className={styles.created}>Created</span>
      ) : (
        <span className={styles.created}># {id}</span>
      )}

      <div className={styles.grid} onClick={() => navigate(`/home/${id}`)}>
        <div>
          <h2 className={styles.name}>{name}</h2>
          <h5 className={styles.typescontainer}>
            {types?.map((type) => {
              return (
                <p className={styles[type]} key={type}>
                  {capitalizeStringWithTrim(type)}
                </p>
              );
            })}
          </h5>
        </div>
        <div>
          {img ? (
            <img src={img} alt="img not found" width="150px" height="150px" />
          ) : (
            <img
              src={defaultImg}
              alt="img not found"
              width="130px"
              height="130px"
              style={{ margin: "10px" }}
            />
          )}
        </div>
      </div>
    </Box>
  );
};

export default Card;
