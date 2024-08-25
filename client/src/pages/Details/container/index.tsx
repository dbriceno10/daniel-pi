import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { capitalizeString } from "../../../utils/utils";
import { DetailsProps } from "../../interfaces";
import Loader from "../../../components/Loader";
// import Footer from "./Footer";

import defaultImg from "../../../assets/who_is.png";
import wikedexImg from "../../../assets/Logo_WikiDex_App.png";

import styles from "../../styles/Details.module.scss";

const Details: React.FC<DetailsProps> = ({
  pokemon,
  getDetails,
  clearDetails,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    //componentWillMount
    setLoader(true);
    getDetails(
      id as string,
      () => setLoader(false),
      () => {
        setLoader(false);
        navigate("/home");
      }
    ); //al montar el componente dispara getDetails para cargar la información del pokemon en la ruta de detalles
    return () => {
      //componentWillUnmount
      clearDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.detailscontainer}>
      <Link className={styles.link} to="/home">
        <div className={styles.wikiimg}>
          <div>
            <img src={wikedexImg} alt="go back" title="go back" />
          </div>
          <p>Volver</p>
        </div>
      </Link>
      {/* Mientras el estado de detalles (que es un array) esté vació, se va a estar mostrando el Loader */}
      {!loader && pokemon ? (
        <div className={styles.details}>
          {pokemon.createInDb ? (
            <span className={styles.created}>Created</span>
          ) : (
            <span className={styles.created}># {pokemon.id}</span>
          )}
          <h1 className={styles.title}>{capitalizeString(pokemon.name)}</h1>
          <h3 className={styles.types}>
            {pokemon.types?.map((type) => {
              return (
                <p className={styles[type]} key={type}>
                  {capitalizeString(type)}
                </p>
              );
            })}
          </h3>
          <div className={styles.flexdata}>
            <div>
              <img
                className={styles.pokeimg}
                src={pokemon.img ? pokemon.img : defaultImg}
                alt={pokemon.img ? pokemon.name : "not found"}
                title={pokemon.img ? pokemon.name : "not found"}
              />
            </div>
            <div className={styles.dataskill}>
              <p>
                Vida: <span>{pokemon.hp}</span>
              </p>
              <p>
                Fuerza: <span>{pokemon.strength}</span>
              </p>
              <p>
                Defensa: <span>{pokemon.defense}</span>
              </p>
              <p>
                Velocidad: <span>{pokemon.speed}</span>
              </p>
              <p>
                Altura: <span>{pokemon.height}</span>
              </p>
              <p>
                Peso: <span>{pokemon.weight}</span>
              </p>
            </div>
          </div>
          {/* Mientras loader sea true y el estado de detalles esté vació se va a mostrar el loader */}
        </div>
      ) : (
        <Loader />
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default Details;
