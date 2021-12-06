import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import { capitalizeString } from "../utils/utils";
import styles from "./styles/NavHome.module.css";
import { useState } from "react";
import wikedexImg from "../assets/Logo_WikiDex_App.png";
export default function NavHome({
  typesPokemons,
  handleClick,
  handleSortAlphabetically,
  handleSortByStrength,
  handleFilterCreated,
  handleFilterTypes,
}) {
  const [filter, setFilter] = useState("Ordenar Alfabéticamente");
  function handleFilter(e) {
    e.preventDefault();
    console.log(e.type);
    console.log(filter);
    if (filter === "Ordenar Alfabéticamente") setFilter("Ordenar por Fuerza");
    if (filter === "Ordenar por Fuerza") setFilter("Ordenar Alfabéticamente");
  }
  return (
    <div className={styles.background}>
      <div className={styles.left}>
        <button
          className={styles.changesort}
          style={{ marginLeft: "10px" }}
          value={filter}
          onClick={(e) => handleFilter(e)}
        >
          {filter}
        </button>
        {filter === "Ordenar Alfabéticamente" ? (
          <SortSelect
            handleSort={handleSortAlphabetically}
            sortDescription="Ordenar"
          />
        ) : (
          <SortSelect
            handleSort={handleSortByStrength}
            sortDescription="Ordernar"
          />
        )}
        <p className={styles.filtertext}>Filtrar:</p>
        <select onChange={handleFilterTypes}>
          <option value="all">Todos</option>
          {typesPokemons?.map((type) => {
            return (
              <option key={type.name} value={type.name}>
                {capitalizeString(type.name)}
              </option>
            );
          })}
        </select>
        <select onChange={handleFilterCreated}>
          <option value="all">Creados/Internet</option>
          <option value="created">Creados</option>
          <option value="api">De Internet</option>
        </select>
      </div>
      <div className={styles.center}>
        <Link className={styles.link} to="/">
          <div className={styles.wikiimg}>
            <div>
              <img src={wikedexImg} alt="not found" />
            </div>
            <p>Volver</p>
          </div>
        </Link>
      </div>
      <div className={styles.rigth}>
        <SearchBar />
        <Link to="/create">
          <button className={styles.create}>Crear Pokemon</button>
        </Link>
        {/* <button onClick={handleClick}>Volver a cargar todos los pokemons</button> */}
      </div>
    </div>
  );
}
