import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setPokemon(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getPokemon(pokemon));
    // e.target.reset()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} type="text" placeholder="Buscar..." />
      <button type="submit">Bucar</button>
    </form>
  );
}
