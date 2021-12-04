import axios from "axios";

export const pokeAction = {
  GET_ALL_POKEMONS: "GET_ALL_POKEMONS",
  GET_POKEMON: "GET_POKEMON",
  POST_POKEMON: "POST_POKEMON",
  GET_TYPES: "GET_TYPES",
  FILTER_POKEMONS_BY_TYPE: "FILTER_POKEMONS_BY_TYPE",
  FILTER_POKEMONS_CREATED: "FILTER_POKEMONS_CREATED",
  SORT_POKEMONS_ALPHABETICALLY: "SORT_POKEMONS_ALPHABETICALLY",
  SORT_POKEMONS_BY_STRENGTH: "SORT_POKEMONS_BY_STRENGTH",
  GET_DETAILS: "GET_DETAILS",
  CLEAR_DETAILS_STATE: "CLEAR_DETAILS_STATE",
  LOADER_TRUE: "LOADER_TRUE",
  LOADER_FALSE: "LOADER_FALSE",
};

//acción para traerme a todos los pokemons del api + los de la base de datos
export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const pokemons = await axios("http://localhost:3001/api/pokemons");
      return dispatch({
        type: pokeAction.GET_ALL_POKEMONS,
        payload: pokemons.data,
      });
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error, por favor vuelve a intentar");
    }
  };
}
export function getPokemon(name) {
  return async function (dispatch) {
    try {
      const pokemon = await axios(
        `http://localhost:3001/api/pokemons?name=${name}`
      );
      return dispatch({
        type: pokeAction.GET_POKEMON,
        payload: pokemon.data,
      });
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error, por favor vuelve a intentar");
      return dispatch({ type: pokeAction.LOADER_FALSE });
    }
  };
}

export function postPokemon(dataPokemon) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.post(
        "http://localhost:3001/api/pokemons",
        dataPokemon
      );
      return dispatch({
        type: pokeAction.POST_POKEMON,
        payload: pokemon,
      });
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error, por favor vuelve a intentar");
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const types = await axios("http://localhost:3001/api/types");
      return dispatch({
        type: pokeAction.GET_TYPES,
        payload: types.data,
      });
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error, por favor vuelve a intentar");
    }
  };
}

export function fillterPokemonsByType(types) {
  return {
    type: pokeAction.FILTER_POKEMONS_BY_TYPE,
    payload: types,
  };
}

export function fillterPokemonsCreated(created) {
  return {
    type: pokeAction.FILTER_POKEMONS_CREATED,
    payload: created,
  };
}

export function sortPokemonsAlphabetically(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_ALPHABETICALLY,
    payload: sort,
  };
}

export function sortPokemonsByStrength(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_BY_STRENGTH,
    payload: sort,
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const detail = await axios(`http://localhost:3001/api/pokemons/${id}`);
      return dispatch({
        type: pokeAction.GET_DETAILS,
        payload: detail.data,
      });
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error, por favor vuelve a intentar");
      return dispatch({ type: pokeAction.LOADER_FALSE });
    }
  };
}

export function clearDetailsState() {
  return {
    type: pokeAction.CLEAR_DETAILS_STATE,
  };
}

export function trueLoader() {
  return {
    type: pokeAction.LOADER_TRUE,
  };
}
