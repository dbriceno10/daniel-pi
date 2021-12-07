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
  handleSortAlphabetically,
  handleSortByStrength,
  handleFilterCreated,
  handleFilterTypes,
}) {
  const [sort, setSort] = useState("Ordenar Alfabéticamente");
  function handleFilter(e) {
    e.preventDefault();
    if (sort === "Ordenar Alfabéticamente") setSort("Ordenar por Fuerza");
    if (sort === "Ordenar por Fuerza") setSort("Ordenar Alfabéticamente");
  }
  return (
    <div className={styles.background}>
      <div className={styles.left}>
        <button
          className={styles.changesort}
          style={{ marginLeft: "10px" }}
          value={sort}
          onClick={(e) => handleFilter(e)}
        >
          {sort}
        </button>
        {sort === "Ordenar Alfabéticamente" ? (
          <SortSelect
            handleSort={handleSortAlphabetically}
            sortDescription="Ordenar"
          />
        ) : (
          <SortSelect
            handleSort={handleSortByStrength}
            sortDescription="Ordenar"
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
