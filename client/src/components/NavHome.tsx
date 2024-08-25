import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import { capitalizeString } from "../utils/utils";
import { NavHomeProps } from "./interfaces";

import wikedexImg from "../assets/Logo_WikiDex_App.png";

import styles from "./styles/NavHome.module.scss";

/******* Componente de NavBar, Contendra el ordenamiento, filtrados y la SearchBar ******/
const NavHome: React.FC<NavHomeProps> = ({
  typesPokemons,
  handleSortAlphabetically,
  // handleSortByStrength,
  handleFilterCreated,
  handleFilterTypes,
  getPokemon,
  setLoader,
}): JSX.Element => {
  // const [sort, setSort] = useState("Ordenar Alfabéticamente");
  // function handleFilter(e) {
  //   e.preventDefault();
  //   if (sort === "Ordenar Alfabéticamente") setSort("Ordenar por Fuerza");
  //   if (sort === "Ordenar por Fuerza") setSort("Ordenar Alfabéticamente");
  // }
  return (
    <React.Fragment>
      <div className={styles.flex}>
        {/* <button
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
        )} */}
        <SortSelect
          handleSort={handleSortAlphabetically}
          sortDescription="Ordenar"
        />
        {/* <p className={styles.filtertext}>Filtrar:</p> */}
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
        <Link to="/">
          <div className={styles.wikiimg}>
            <div>
              <img src={wikedexImg} alt="not found" />
            </div>
            <p>Volver</p>
          </div>
        </Link>
        <SearchBar setLoader={setLoader} getPokemon={getPokemon} />
        <Link to="/create">
          <button className={styles.create}>Crear Pokemon</button>
        </Link>
      </div>
    </React.Fragment>
  );
};
export default NavHome;
