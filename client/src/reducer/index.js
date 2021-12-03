import { pokeAction } from "../actions";
const inicialState = {
  pokemons: [], //estado actual
  pokemonsTypesFilter: [], //estado de los pokemons filtrados
  pokemonsCopy: [], //copia del estado original siempre va a tener todos los pokemon del api y bd
  types: [], //guarda el arreglo de los tipos
  details: [],
  searchPokemons: [], //para guardar los pokemon buscados con la SearchBar
  // pokemon: {}, //un pokemon
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case pokeAction.GET_ALL_POKEMONS:
      return {
        ...state,

        pokemons: [...state.searchPokemons, ...action.payload], //en mi estado de pokemons, que en un principio es un arreglo vacío, manda todo lo que te envie la acción
        pokemonsCopy: [...state.searchPokemons, ...action.payload], //una copia que siempre voy a mantener con todos los pokemons que envía el back
        pokemonsTypesFilter: action.payload, // para no perder los estados filtrados al buscar entre pokemons del api y creados, la inicializa con todos los pokemon en un pricipio
      };
    case pokeAction.GET_POKEMON:
      const findPokemon = state.pokemonsCopy.filter(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (findPokemon.length) {
        return {
          ...state,
          pokemons: [action.payload],
        };
      } else {
        return {
          ...state,
          pokemons: [action.payload],
          searchPokemons: [action.payload, ...state.searchPokemons],
        };
      }
    case pokeAction.POST_POKEMON:
      return {
        ...state,
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
      let createdFilter = [];
      if (action.payload === "created") {
        createdFilter = allPokemons2.filter((pokemon) => pokemon.createInDb);
      } else if (action.payload === "api") {
        createdFilter = allPokemons2.filter((pokemon) => !pokemon.createInDb);
      } else {
        createdFilter = allPokemons2;
      }
      return {
        ...state,
        pokemons: createdFilter,
      };
    case pokeAction.SORT_POKEMONS_ALPHABETICALLY:
      let sortedArr1 = [];
      if (action.payload === "asc") {
        sortedArr1 = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (action.payload === "desc") {
        sortedArr1 = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      } else {
        sortedArr1 = state.pokemons;
      }
      return {
        ...state,
        pokemons: sortedArr1,
      };
    case pokeAction.SORT_POKEMONS_BY_STRENGTH:
      let sortedArr2 = [];
      if (action.payload === "asc") {
        sortedArr2 = state.pokemons.sort((a, b) => {
          if (a.strength > b.strength) return 1;
          if (a.strength < b.strength) return -1;
          return 0;
        });
      } else if (action.payload === "desc") {
        sortedArr2 = state.pokemons.sort((a, b) => {
          if (a.strength > b.strength) return -1;
          if (a.strength < b.strength) return 1;
          return 0;
        });
      } else {
        sortedArr2 = state.pokemons;
      }
      return {
        ...state,
        pokemons: sortedArr2,
      };
    case pokeAction.GET_DETAILS:
      return {
        ...state,
        details: [action.payload],
      };
    case pokeAction.CLEAR_DETAILS_STATE:
      return {
        ...state,
        details: [],
      };
    default:
      return state;
  }
}
export default rootReducer;
