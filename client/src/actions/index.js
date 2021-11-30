import axios from "axios";

export const pokeAction = {
  GET_ALL_POKEMONS: "GET_ALL_POKEMONS",
};

//acción para traerme a todos los pokemons del api + los de la base de datos
export function getAllPokemons() {
  return async function (dispatch) {
    const pokemons = await axios("http://localhost:3001/api/pokemons");
    return dispatch({
      type: pokeAction.GET_ALL_POKEMONS,
      payload: pokemons.data
    })
  };
}
