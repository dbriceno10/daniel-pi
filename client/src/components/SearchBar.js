import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState("");
  const [error, setError] = useState(true);
  function handleInputChange(e) {
    e.preventDefault();
    setPokemon(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getPokemon(pokemon));
    setPokemon("");
    e.target.reset();
  }
  useEffect(() => {
    if (!pokemon.length) {
      setError(true);
    } else {
      setError(false);
    }
  }, [pokemon, setError]);
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} type="text" placeholder="Buscar..." />
      <button disabled={error} type="submit">
        Bucar
      </button>
    </form>
  );
}
