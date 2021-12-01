import { pokeAction } from "../actions";
const inicialState = {
  pokemons: [], //estado actual
  pokemonsTypesFilter: [], //estado de los pokemons filtrados
  pokemonsCopy: [], //copia del estado original siempre va a tener todos los pokemon del api y bd
  types: [], //guarda el arreglo de los tipos
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
        pokemonsTypesFilter: typesFiltered,
      };
    case pokeAction.FILTER_POKEMONS_CREATED:
      const allPokemons2 = state.pokemonsTypesFilter;
      // const createdFilter = action.payload === "created" ? allPokemons2.filter(pokemon => pokemon.createdInDb) : allPokemons2.filter(pokemon => !pokemon.createdInDb)
      let createdFilter = [];
      if (action.payload === "created") {
        createdFilter = allPokemons2.filter((pokemon) => pokemon.createInDb);
        // console.log(createdFilter);
      } else if (action.payload === "api") {
        createdFilter = allPokemons2.filter((pokemon) => !pokemon.createInDb);
        // console.log(createdFilter);
      } else {
        createdFilter = allPokemons2;
        // console.log(createdFilter);
      }
      return {
        ...state,
        pokemons: createdFilter,
      };
    case pokeAction.SORT_POKEMONS:
      // const allPokemons3 = state.pokemonsCopy;
      let sortedArr = [];
      if (action.payload === "asc") {
        sortedArr = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return 1; // a - b ---> a, b
          if (a.name < b.name) return -1;
          return 0;
        });
      } else {
        sortedArr = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
      return {
        ...state,
        pokemons: sortedArr,
      };
    default:
      return state;
  }
}
export default rootReducer;
