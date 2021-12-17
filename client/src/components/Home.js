import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getTypes,
  fillterPokemonsByType,
  fillterPokemonsCreated,
  sortPokemonsAlphabetically,
  sortPokemonsByStrength,
  trueLoader,
} from "../actions";
import styles from "./styles/Home.module.css";
import Card from "./Card";
import { capitalizeString } from "../utils/utils";
import Paginado from "./Paginado";
import Loader from "./Loader";
import NavHome from "./NavHome";
import defaultImg from "../assets/who_is.png";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const typesPokemons = useSelector((state) => state.types);
  const loader = useSelector((state) => state.loader);
  useEffect(() => {
    //componentDitMount
    dispatch(getTypes());
    dispatch(getAllPokemons());
    return () => {
      dispatch(trueLoader());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //NOTA: Podemos poner dispatch como argumento para que se ejecute el useEffect cada vez que se despache una acción, pero como no queremos estarle pegando a cada momento a la ruta de pokemons y tipos lo dejaremos así mientras.
  // Voy a setear estados locales para manejar el paginado
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //inicializamos en la página 1 para arrancar desde allí
  const pokemonsPerPage = 12; //12 pokemons por página
  const indexOfLastPokemon = currentPage * pokemonsPerPage; //voy a guardar el índice del último pokemon por página, para irlos ordenando, ojo es índice no id
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  ); //pokemons en la página actual
  const paginado = (page) => {
    setCurrentPage(page);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(trueLoader());
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }

  function handleFilterTypes(e) {
    dispatch(fillterPokemonsByType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(fillterPokemonsCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSortAlphabetically(e) {
    dispatch(sortPokemonsAlphabetically(e.target.value));
    setCurrentPage(1); //seteo la página actual en 1
    setOrder(e.target.value); //Seteo el orden actual para que me lo tome y haga el renderizado
  }

  function handleSortByStrength(e) {
    dispatch(sortPokemonsByStrength(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={styles.background}>
      <NavHome
        typesPokemons={typesPokemons}
        handleSortAlphabetically={handleSortAlphabetically}
        handleSortByStrength={handleSortByStrength}
        handleFilterCreated={handleFilterCreated}
        handleFilterTypes={handleFilterTypes}
      />
      <div className={styles.pokemonscontainer}>
        <button className={styles.refresh} onClick={handleClick}>
          Refrescar
        </button>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <Paginado
              pokemonsPerPage={pokemonsPerPage}
              allPokemons={allPokemons}
              currentPage={currentPage}
              paginado={paginado}
            />
            {currentPokemons.length ? null : (
              <div>
                <div
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    margin: "0 auto",
                  }}
                  to="/home"
                >
                  <img
                    src={defaultImg}
                    alt="Pokemon not Found"
                    width="300px"
                    height="300px"
                  />
                  <h2> Pokemon Not Found</h2>
                </div>
              </div>
            )}
            {/* Ahora debemos mapear currentPokemons */}
            <div className={styles.grid}>
              {currentPokemons?.map((pokemon) => {
                return (
                  <Card
                    name={capitalizeString(pokemon.name)}
                    img={pokemon.img}
                    types={pokemon.types}
                    key={pokemon.id}
                    id={pokemon.id}
                    create={pokemon.createInDb}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
