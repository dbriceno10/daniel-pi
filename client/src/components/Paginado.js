import React from "react";
import styles from "./styles/Paginado.module.css"
export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbrers = [];
  const top = Math.ceil(allPokemons.length / pokemonsPerPage); // --> calculo la cantidad de páginas que voy a tener en función de la cantidad de personajes
  for (let i = 1; i < top + 1; i++) {
    pageNumbrers.push(i);
  }
  return (
    <nav className={styles.container}>
      <ul>
        {pageNumbrers?.map((number) => {
          return (
            <li key={number}>
            {/* debemos usar un "a" en ligar de un "button", esto es solo mientras */}
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
