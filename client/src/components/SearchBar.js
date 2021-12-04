import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon, trueLoader } from "../actions";

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
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={pokemon.name}
        onChange={handleInputChange}
        type="text"
        placeholder="Buscar..."
      />
      <button disabled={error} type="submit">
        Bucar
      </button>
    </form>
  );
}
