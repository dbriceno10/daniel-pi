import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { HomeProps } from "../../interfaces";
import Card from "../../../components/Card";
import { capitalizeString } from "../../../utils/utils";
import Paginado from "../../../components/Paginado";
import Loader from "../../../components/Loader";
import NavHome from "../../../components/NavHome";
import defaultImg from "../../../assets/who_is.png";

import styles from "../../styles/Home.module.scss";

const Home: React.FC<HomeProps> = ({
  allPokemons,
  typesPokemons,
  getAllPokemons,
  getTypes,
  filterByType,
  filterCreated,
  sortAlphabetically,
}) => {
  const navigate = useNavigate();

  //Estados de Redux

  // const loader = useAppSelector((state) => state.loader);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    //componentDitMount, pide (despacha las acciones) los pokemons de la ruta principal y los tipos al montar el componente
    if (!typesPokemons.length) {
      getTypes();
    }
    if (!allPokemons.length) {
      setLoader(true);
      getAllPokemons(
        () => setLoader(false),
        () => setLoader(false)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //NOTA: Podemos poner dispatch como argumento para que se ejecute el useEffect cada vez que se despache una acción, pero como no queremos estarle pegando a cada momento a la ruta de pokemons y tipos lo dejaremos así mientras.

  /******* Voy a setear estados locales para manejar el paginado *********/
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
  const paginado = (page: number) => {
    setCurrentPage(page);
  };

  /***** Manejadores de eventos (Handlers) ******/

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getTypes();
    getAllPokemons();
  };

  function handleFilterTypes(e: React.ChangeEvent<HTMLSelectElement>) {
    filterByType(e.target.value);
    setCurrentPage(1);
  }

  function handleFilterCreated(e: React.ChangeEvent<HTMLSelectElement>) {
    filterCreated(e.target.value);
    setCurrentPage(1);
  }

  function handleSortAlphabetically(e: React.ChangeEvent<HTMLSelectElement>) {
    sortAlphabetically(e.target.value);
    setCurrentPage(1); //seteo la página actual en 1
    setOrder(e.target.value); //Seteo el orden actual para que me lo tome y haga el renderizado
  }

  // function handleSortByStrength(e) {
  //   dispatch(sortPokemonsByStrength(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(e.target.value);
  // }

  return (
    <Box className={styles.background}>
      <NavHome
        typesPokemons={typesPokemons}
        handleSortAlphabetically={handleSortAlphabetically}
        // handleSortByStrength={handleSortByStrength}
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
                  onClick={() => navigate("/home")}
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
    </Box>
  );
};

export default Home;
