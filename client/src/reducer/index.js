import { pokeAction } from "../actions";
const inicialState = {
  pokemons: [],
  pokemonsCopy: [],
  types: [],
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case pokeAction.GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload, //en mi estado de pokemons, que en un principio es un arreglo vacío, manda todo lo que te envie la acción
        pokemonsCopy: action.payload,
      };
    case pokeAction.GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case pokeAction.FILTER_POKEMONS_BY_TYPE:
      const allPokemons = state.pokemonsCopy; //voy a tener pokemonsCopy que siempre va a tener una copia del estado completo, y el estado que se va a esatar enviando filtrado va a ser pokemons, así cada vez que vaya a filtrar nuevamente, voy a tomar como referencia a la copia con el estado original de todos los pokemons
      const typesFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((pokemon) =>
              pokemon.types.includes(action.payload)
            );
      return {
        ...state,
        pokemons: typesFiltered,
      };
    default:
      return state;
  }
}
export default rootReducer;
