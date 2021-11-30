import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../actions";
import Card from "./Card";
import { capitalizeStringWithTrim } from "../utils/utils";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const typesPokemons = useSelector((state) => state.types);
  useEffect(() => {
    //componentDitMount
    dispatch(getTypes());
    dispatch(getAllPokemons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //NOTA: Podemos poner dispatch como argumento para que se ejecute el useEffect cada vez que se despache una acción, pero como no queremos estarle pegando a cada momento a la ruta de pokemons y tipos lo dejaremos así mientras.

  // Voy a setear estados locales para manejar el paginado
  const [currentPage, setCurrentPage] = useState(1); //inicializamos en la página 1 para arrancar desde allí
  // eslint-disable-next-line no-unused-vars
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //12 pokemons por página
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
    dispatch(getAllPokemons());
  }
  return (
    <React.Fragment>
      <Link to="/pokemons">
        <h1>Crear Pokemon</h1>
      </Link>
      <button onClick={handleClick}>Volver a cargar todos los pokemons</button>
      <div>
        {/* Acá vamos a poner los filtros */}
        <select>
          {/*Primer select para ordenar de forma ascendente y descendente por orden alfabético y por fuerza */}
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
        </select>
        <select>
          {/*Segundo select para filtrar por tipo de pokemon */}
          <option value="all">Todos</option>
          {typesPokemons?.map((type) => {
            return (
              <option key={type.name} value={type.name}>
                {capitalizeStringWithTrim(type.name)}
              </option>
            );
          })}
        </select>
        <select>
          {/* Tercer select, para filtrar por pokemons que vienen del api o por pokemons creados por el usuario */}
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="api">De Internet</option>
        </select>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons}
          paginado={paginado}
        />
        {currentPokemons?.map((pokemon) => {
          return (
            <Card
              name={capitalizeStringWithTrim(pokemon.name)}
              img={pokemon.img}
              types={pokemon.types}
              key={pokemon.id}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}
