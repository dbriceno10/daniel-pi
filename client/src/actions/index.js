import axios from "axios";

export const pokeAction = {
  GET_ALL_POKEMONS: "GET_ALL_POKEMONS",
  GET_TYPES: "GET_TYPES",
  FILTER_POKEMONS_BY_TYPE: "FILTER_POKEMONS_BY_TYPE",
};

//acción para traerme a todos los pokemons del api + los de la base de datos
export function getAllPokemons() {
  return async function (dispatch) {
    const pokemons = await axios("http://localhost:3001/api/pokemons");
    return dispatch({
      type: pokeAction.GET_ALL_POKEMONS,
      payload: pokemons.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    const types = await axios("http://localhost:3001/api/types");
    return dispatch({
      type: pokeAction.GET_TYPES,
      payload: types.data,
    });
  };
}

export function fillterPokemonsByType(types) {
  return {
    type: pokeAction.FILTER_POKEMONS_BY_TYPE,
    payload: types,
  };
}
