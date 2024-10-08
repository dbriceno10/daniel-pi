import {
  GET_ALL_POKEMONS,
  GET_POKEMON,
  POST_POKEMON,
  GET_TYPES,
  FILTER_POKEMONS_BY_TYPE,
  FILTER_POKEMONS_CREATED,
  SORT_POKEMONS_ALPHABETICALLY,
  SORT_POKEMONS_BY_STRENGTH,
  GET_DETAILS,
  CLEAR_DETAILS_STATE,
  LOADER_TRUE,
  LOADER_FALSE,
  UPDATE_POKEMON,
  DELETE_POKEMON,
  TypesAction,
} from "../actions/types";
import { State } from "./state";

const inicialState: State = {
  pokemons: [], //estado actual
  pokemonsTypesFilter: [], //estado de los pokemons filtrados
  pokemonsCopy: [], //copia del estado original siempre va a tener todos los pokemon del api y bd
  types: [], //guarda el arreglo de los tipos
  details: null,
  searchPokemons: [], //para guardar los pokemon buscados con la SearchBar
  loader: true, //para setear un loader
  // pokemon: {}, //un pokemon
};

function rootReducer(state = inicialState, action: TypesAction) {
  switch (action.type) {
    //taer a todos los pokemones de la ruta principal
    case GET_ALL_POKEMONS: {
      return {
        ...state,
        loader: false,
        pokemons: [...state.searchPokemons, ...action.payload], //en mi estado de pokemons, que en un principio es un arreglo vacío, manda todo lo que te envie la acción
        pokemonsCopy: [...state.searchPokemons, ...action.payload], //una copia que siempre voy a mantener con todos los pokemons que envía el back
        pokemonsTypesFilter: action.payload, // para no perder los estados filtrados al buscar entre pokemons del api y creados, la inicializa con todos los pokemon en un pricipio
      };
    }
    case GET_POKEMON: {
      // //traer a un pokemon por su nombre o id
      // const findPokemon = state.pokemonsCopy.filter(
      //   (pokemon) => pokemon.id === action.payload.id
      // );
      // if (findPokemon.length) {
      //   return {
      //     ...state,
      //     pokemons: [action.payload],
      //     loader: false,
      //   };
      // } else {
      //   return {
      //     ...state,
      //     pokemons: [action.payload], // si hago get a un pokemon que no esté en el estado actual, lo guardo en un arreglo y luego lo paso al principal
      //     searchPokemons: [action.payload, ...state.searchPokemons],
      //     loader: false,
      //   };
      // }
      let pokemons = [...state.pokemons];
      const index = pokemons?.findIndex((e) => e.id === action.payload.id);
      if (index === -1) {
        pokemons = [action.payload, ...pokemons];
      }
      return {
        ...state,
        pokemons,
      };
    }
    case POST_POKEMON: {
      //crear a un pokemon y guardarlo en la base de datos
      let pokemons = [action.payload, ...state.pokemons];
      return {
        ...state,
        pokemons,
      };
    }
    case UPDATE_POKEMON: {
      let copyPokemons = [...state.pokemons];
      const index = copyPokemons?.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        copyPokemons[index] = action.payload;
      } else {
        copyPokemons = [action.payload, ...copyPokemons];
      }
      return {
        ...state,
        pokemons: copyPokemons,
      };
    }
    case GET_TYPES: {
      //obtener los tipos de pokemones
      return {
        ...state,
        types: action.payload,
      };
    }
    case FILTER_POKEMONS_BY_TYPE: {
      //Filtrar a los pokemones por tipo
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
    }
    case FILTER_POKEMONS_CREATED: {
      //filtrar a los pokemones por si estos vienen del api o son creados por el usuario
      const allPokemons2 = state.pokemonsTypesFilter;
      let createdFilter = [];
      if (action.payload === "created") {
        createdFilter = allPokemons2.filter((pokemon) => pokemon.createInDb);
      } else if (action.payload === "api") {
        createdFilter = allPokemons2.filter((pokemon) => !pokemon.createInDb);
      } else {
        createdFilter = allPokemons2.slice();
      }
      return {
        ...state,
        pokemons: createdFilter,
      };
    }
    case DELETE_POKEMON: {
      const pokemons = state.pokemons?.filter(
        (e) => e.id !== action.payload.id
      );
      return {
        ...state,
        pokemons,
      };
    }
    case SORT_POKEMONS_ALPHABETICALLY: {
      //ordenar a los pokemones de forma alfabética
      let sortedArr1 = [];
      if (action.payload === "asc") {
        //ordena de forma ascendente (A - Z)
        sortedArr1 = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (action.payload === "desc") {
        //ordena de forma descendente (Z - A)
        sortedArr1 = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      } else {
        // si se elije ordenar, es decir default, devuelve una copia de pokemonsCopy con el orden original
        sortedArr1 = state.pokemonsCopy.slice();
      }
      return {
        ...state,
        pokemons: sortedArr1,
      };
    }
    case SORT_POKEMONS_BY_STRENGTH: {
      //ordena a los pokemones por fuerza (actualmente en desuso)
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
        sortedArr2 = state.pokemons.slice();
      }
      return {
        ...state,
        pokemons: sortedArr2,
      };
    }
    case GET_DETAILS: {
      return {
        ...state,
        details: action.payload,
      };
    }
    case CLEAR_DETAILS_STATE: {
      //Limmpiar (vaciar) el estado de detalles
      return {
        ...state,
        details: null,
      };
    }
    case LOADER_TRUE: {
      //camiar el loader a true
      return {
        ...state,
        loader: true,
      };
    }
    case LOADER_FALSE: {
      //cambiar el loader a false
      return {
        ...state,
        loader: false,
      };
    }
    default: {
      return state;
    }
  }
}
export default rootReducer;
