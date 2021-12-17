import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon, trueLoader } from "../actions";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState({ name: "" });
  const [error, setError] = useState(true);
  function handleInputChange(e) {
    e.preventDefault();
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value.trim(),
    });
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getPokemon(pokemon.name));
    dispatch(trueLoader());
    setPokemon({ name: "" });
    e.target.reset();
  }
  useEffect(() => {
    if (!pokemon.name.length) {
      setError(true);
    } else {
      setError(false);
    }
  }, [pokemon, setError]);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
    </form>
  );
}
