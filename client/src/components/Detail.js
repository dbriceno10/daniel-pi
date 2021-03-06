import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, clearDetailsState, trueLoader } from "../actions";
import { capitalizeString } from "../utils/utils";
import defaultImg from "../assets/who_is.png";
import Loader from "./Loader";
// import Footer from "./Footer";
import styles from "./styles/Details.module.css";
import wikedexImg from "../assets/Logo_WikiDex_App.png";
export default function Details(props) {
  const dispatch = useDispatch();
  //Estados globales de Redux
  const pokemon = useSelector((state) => state.details);
  const loader = useSelector((state) => state.loader);

  useEffect(() => {
    //componentWillMount
    dispatch(getDetails(props.match.params.id)); //al montar el componente dispara getDetails para cargar la información del pokemon en la ruta de detalles
    return () => {
      //componentWillUnmount
      dispatch(clearDetailsState());
      dispatch(trueLoader());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.detailscontainer}>
      <Link className={styles.link} to="/home">
        <div className={styles.wikiimg}>
          <div>
            <img src={wikedexImg} alt="not found" />
          </div>
          <p>Volver</p>
        </div>
      </Link>
      {/* Mientras el estado de detalles (que es un array) esté vació, se va a estar mostrando el Loader */}
      {pokemon.length > 0 ? (
        <div className={styles.details}>
          {pokemon[0].createInDb ? (
            <span className={styles.created}>Created</span>
          ) : (
            <span className={styles.created}># {pokemon[0].id}</span>
          )}
          <h1 className={styles.title}>{capitalizeString(pokemon[0].name)}</h1>
          <h3 className={styles.types}>
            {pokemon[0].types?.map((type) => {
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
                src={pokemon[0].img ? pokemon[0].img : defaultImg}
                alt="not found"
              />
            </div>
            <div className={styles.dataskill}>
              <p>
                Vida: <span>{pokemon[0].hp}</span>
              </p>
              <p>
                Fuerza: <span>{pokemon[0].strength}</span>
              </p>
              <p>
                Defensa: <span>{pokemon[0].defense}</span>
              </p>
              <p>
                Velocidad: <span>{pokemon[0].speed}</span>
              </p>
              <p>
                Altura: <span>{pokemon[0].height}</span>
              </p>
              <p>
                Peso: <span>{pokemon[0].weight}</span>
              </p>
            </div>
          </div>
          {/* Mientras loader sea true y el estado de detalles esté vació se va a mostrar el loader */}
        </div>
      ) : loader ? (
        <Loader />
      ) : null}
      {/* Si loader cambia a false y sigue vacío el componente de detalles, quiere decir que la carga falló o el pokemon no se encontró, por lo que vamos a mostrar una imagen con un texto que diga que el pokemon no se encontró */}
      {loader ? null : (
        <div>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/home">
            <img
              src={defaultImg}
              alt="Pokemon not Found"
              width="300px"
              height="300px"
            />
            <h2> Pokemon Not Found</h2>
          </Link>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}
