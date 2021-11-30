import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../actions";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    //componentDitMount
    dispatch(getAllPokemons());
  }, []);
  // useEffect(() => {
  //   console.log(allPokemons);
  // });
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
      {/* <button onClick={(e) => handleClick(e)}>
        Volver a cargar todos los pokemons
      </button> */}
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
          <option value="normal">Normal</option>
          <option value="fighting">Lucha</option>
          <option value="flying">Volador</option>
          <option value="poison">Veneno</option>
          <option value="ground">Tierra</option>
          <option value="rock">Roca</option>
          <option value="bug">Bicho</option>
          <option value="ghost">Fantasma</option>
          <option value="steel">Acero</option>
          <option value="fire">Fuego</option>
          <option value="water">Agua</option>
          <option value="gass">Planta</option>
          <option value="electric">Eléctrico</option>
          <option value="psychic">Psíquico</option>
          <option value="ice">Hielo</option>
          <option value="dragon">Dragón</option>
          <option value="dark">Siniestro</option>
          <option value="fairy">Hada</option>
          <option value="unknown">Desconocido</option>
          <option value="shadow">Sombra</option>
        </select>
        <select>
          {/* Tercer select, para filtrar por pokemons que vienen del api o por pokemons creados por el usuario */}
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="api">De Internet</option>
        </select>
        {allPokemons &&
          allPokemons.map((pokemon) => {
            return (
              <Card
                name={pokemon.name}
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

//const mapStateToProps = (state) => {
//   return {
//     pokemons: state.pokemons
//   };
// };

//const mapDispatchToProps = { getAllPokemons };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
