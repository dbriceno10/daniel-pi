import React from "react";
import { PaginadoProps } from "./interfaces";

import styles from "./styles/Paginado.module.scss";


const Paginado: React.FC<PaginadoProps> = ({
  pokemonsPerPage,
  allPokemons,
  paginado,
  currentPage,
}): JSX.Element => {
  const pageNumbrers = [];
  const top = Math.ceil(allPokemons.length / pokemonsPerPage); // --> calculo la cantidad de páginas que voy a tener en función de la cantidad de personajes
  for (let i = 1; i < top + 1; i++) {
    //Voy a tener mi número de páginas, desde 1 hasta la última
    pageNumbrers.push(i);
  }
  return (
    <nav className={styles.container}>
      <div className={styles.ul}>
        {pageNumbrers?.map((number) => {
          return (
            <p className={styles.li} key={number}>
              <span
                className={
                  number === currentPage ? styles.current : styles.libtn
                }
                onClick={() => paginado(number)}
              >
                {number}
              </span>
            </p>
          );
        })}
      </div>
    </nav>
  );
};

export default Paginado;
