import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";

import { SearchBarProps } from "./interfaces";

import styles from "./styles/SearchBar.module.scss";

const SearchBar: React.FC<SearchBarProps> = ({
  getPokemon,
  setLoader,
}): JSX.Element => {
  //Estados locales de React
  const [pokemon, setPokemon] = useState({ name: "" });
  const [error, setError] = useState(true); //Este estado es para habilitar o desabilitar el botón de búsqueda
  //Handlers
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value.trim(),
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //Dispara la búsqueda al enviar al backend la información escrita en el input despachando la action de getPokemon, luego limpia el input
    e.preventDefault();
    setLoader(true);
    getPokemon(
      pokemon.name,
      () => setLoader(false),
      () => setLoader(false)
    );
    setPokemon({ name: "" });
    const form = e.target as HTMLFormElement;
    form.reset();
  }

  //componentWillUpdate
  useEffect(() => {
    if (!pokemon.name.length) {
      setError(true);
    } else {
      setError(false);
    }
  }, [pokemon, setError]);
  return (
    <Box component="form" className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        name="name"
        value={pokemon.name}
        onChange={handleInputChange}
        type="text"
        placeholder="Buscar..."
        autoComplete="off"
      />
      <button className={styles.button} disabled={error} type="submit">
        Buscar
      </button>
    </Box>
  );
};

export default SearchBar;
