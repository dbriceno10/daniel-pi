import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Card from "./Card";
import { capitalizeString } from "../utils/utils";
import Paginado from "./Paginado";
import SortSelect from "./SortSelect";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const typesPokemons = useSelector((state) => state.types);
  const loader = useSelector((state) => state.loader);
  useEffect(() => {
    //componentDitMount
    dispatch(getTypes());
    dispatch(getAllPokemons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch(trueLoader());
    };
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
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }

  function handleFilterTypes(e) {
    e.preventDefault();
    dispatch(fillterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(fillterPokemonsCreated(e.target.value));
  }

  function handleSortAlphabetically(e) {
    e.preventDefault();
    dispatch(sortPokemonsAlphabetically(e.target.value));
    setCurrentPage(1); //seteo la página actual en 1
    setOrder(e.target.value); //Seteo el orden actual para que me lo tome y haga el renderizado
  }

  function handleSortByStrength(e) {
    e.preventDefault();
    dispatch(sortPokemonsByStrength(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <React.Fragment>
    <Link to="/"><h2>LandingPage</h2></Link>
      <Link to="/create">
        <h1>Crear Pokemon</h1>
      </Link>
      <button onClick={handleClick}>Volver a cargar todos los pokemons</button>
      <SearchBar />
      <div>
        {/* Acá vamos a poner los filtros */}
        {/*Primeros select para ordenar de forma ascendente y descendente por orden alfabético y fuerza*/}
        <SortSelect
          handleSort={handleSortAlphabetically}
          sortDescription="Ordenar Alfabéricamente:"
        />
        <SortSelect
          handleSort={handleSortByStrength}
          sortDescription="Ordernar Por Fuerza:"
        />
        <select onChange={handleFilterTypes}>
          {/*Segundo select para filtrar por tipo de pokemon */}
          <option value="all">Todos</option>
          {typesPokemons?.map((type) => {
            return (
              <option key={type.name} value={type.name}>
                {capitalizeString(type.name)}
              </option>
            );
          })}
          de
        </select>
        <select onChange={handleFilterCreated}>
          {/* Tercer select, para filtrar por pokemons que vienen del api o por pokemons creados por el usuario */}
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="api">De Internet</option>
        </select>
        {loader ? (
          <p>...loading</p>
        ) : (
          <div>
            <Paginado
              pokemonsPerPage={pokemonsPerPage}
              allPokemons={allPokemons}
              paginado={paginado}
            />
            {/* Ahora debemos mapear currentPokemons */}
            {currentPokemons?.map((pokemon) => {
              return (
                <Card
                  name={capitalizeString(pokemon.name)}
                  img={pokemon.img}
                  types={pokemon.types}
                  key={pokemon.id}
                  id={pokemon.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
