import axios from "axios";
import swal from "sweetalert";

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

//acción que permite traer a todos los pokemones del api + los de la base de datos
export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const pokemons = await axios("/pokemons");
      return dispatch({
        type: pokeAction.GET_ALL_POKEMONS,
        payload: pokemons.data,
      });
    } catch (error) {
      console.error(error);
      // alert("Ha ocurrido un error, por favor vuelve a intentar");
      swal({
        title: "Error",
        text: "Ha ocurrido un error, por favor vuelve a intentar",
        icon: "error",
      });
    }
  };
}
// export function getAllPokemons() {
//   return function (dispatch) {
//     axios("/pokemons")
//       .then((pokemons) => {
//         return dispatch({
//           type: pokeAction.GET_ALL_POKEMONS,
//           payload: pokemons.data,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Ha ocurrido un error, por favor vuelve a intentar");
//       });
//   };
// }

//acción que permite traer a un pokemon por su nombre exacto o su id
export function getPokemon(name) {
  return async function (dispatch) {
    try {
      const pokemon = await axios(
        `/pokemons?name=${name}`
      );
      return dispatch({
        type: pokeAction.GET_POKEMON,
        payload: pokemon.data,
      });
    } catch (error) {
      console.error(error);
      // alert("Ha ocurrido un error, por favor vuelve a intentar");
      swal({
        title: "Error",
        text: "Ha ocurrido un error, por favor vuelve a intentar",
        icon: "error",
      });
      return dispatch({ type: pokeAction.LOADER_FALSE });
    }
  };
}

//acción que permite crear a un pokemon con los datos obtenidos desde el formulario controlado
export function postPokemon(dataPokemon) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.post(
        "/pokemons",
        dataPokemon
      );
      // alert("Pokemon Creado");
      swal({
        title: "Ok",
        text: "Pokemon Creado",
        icon: "success",
        timer: 3000
      });
      return dispatch({
        type: pokeAction.POST_POKEMON,
        payload: pokemon,
      });
    } catch (error) {
      console.error(error);
      // alert("Ha ocurrido un error, por favor vuelve a intentar");
      swal({
        title: "Error",
        text: "Ha ocurrido un error, por favor vuelve a intentar",
        icon: "error",
      });
    }
  };
}

//acción que permite traer todos los types de los pokemones
export function getTypes() {
  return async function (dispatch) {
    try {
      const types = await axios("/types");
      return dispatch({
        type: pokeAction.GET_TYPES,
        payload: types.data,
      });
    } catch (error) {
      console.error(error);
      // alert("Ha ocurrido un error, por favor vuelve a intentar");
      swal({
        title: "Error",
        text: "Ha ocurrido un error, por favor vuelve a intentar",
        icon: "error",
      });
    }
  };
}

//acción que permite filtrar a los pokemones por tipo
export function fillterPokemonsByType(types) {
  return {
    type: pokeAction.FILTER_POKEMONS_BY_TYPE,
    payload: types,
  };
}

//acción que permite filtrar a los pokemones si estos vienen del api o de la base de datos
export function fillterPokemonsCreated(created) {
  return {
    type: pokeAction.FILTER_POKEMONS_CREATED,
    payload: created,
  };
}

//acción que permite ordenar a los pokemones de forma alfabética
export function sortPokemonsAlphabetically(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_ALPHABETICALLY,
    payload: sort,
  };
}

//acción que permite ordenar a los pokemones por fuerza (actualmente en desuso)
export function sortPokemonsByStrength(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_BY_STRENGTH,
    payload: sort,
  };
}

//acción que permite traer un pokemon por su id para la ruta de detalles
export function getDetails(id) {
  return async function (dispatch) {
    try {
      const detail = await axios(`/pokemons/${id}`);
      return dispatch({
        type: pokeAction.GET_DETAILS,
        payload: detail.data,
      });
    } catch (error) {
      console.error(error);
      // alert("Ha ocurrido un error, por favor vuelve a intentar");
      swal({
        title: "Error",
        text: "Ha ocurrido un error, por favor vuelve a intentar",
        icon: "error",
      });
      return dispatch({ type: pokeAction.LOADER_FALSE });
    }
  };
}

//acción que permite limpiar el estado de detalles
export function clearDetailsState() {
  return {
    type: pokeAction.CLEAR_DETAILS_STATE,
  };
}

//acción que permite cambiara true el estado de loader
export function trueLoader() {
  return {
    type: pokeAction.LOADER_TRUE,
  };
}

//acción que permite cambiar a false es estado de loader
export function falseLoader() {
  return {
    type: pokeAction.LOADER_FALSE,
  };
}
