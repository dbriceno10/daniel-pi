import { PokemonResponse } from "../interfaces";
import { Pokemon, Type } from "../models";

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

interface ActionGetAllPokemons {
  payload: Pokemon[];
  type: typeof pokeAction.GET_ALL_POKEMONS;
}

interface ActionGetPokemon {
  payload: Pokemon[];
  type: typeof pokeAction.GET_POKEMON;
}

interface ActionPostPokemon {
  payload: PokemonResponse;
  type: typeof pokeAction.POST_POKEMON;
}

interface ActionGetTypes {
  payload: Type[];
  type: typeof pokeAction.GET_TYPES;
}

interface ActionFilterPokemonsByType {
  payload: string;
  type: typeof pokeAction.FILTER_POKEMONS_BY_TYPE;
}

interface ActionFilterPokemonsCreated {
  payload: string;
  type: typeof pokeAction.FILTER_POKEMONS_CREATED;
}

interface ActionSortPokemonsAlphabetically {
  payload: string;
  type: typeof pokeAction.SORT_POKEMONS_ALPHABETICALLY;
}

interface ActionSortPokemonsByStrength {
  payload: string;
  type: typeof pokeAction.SORT_POKEMONS_BY_STRENGTH;
}

interface ActionGetDetails {
  payload: Pokemon;
  type: typeof pokeAction.GET_DETAILS;
}

interface ActionClearDetailsState {
  type: typeof pokeAction.CLEAR_DETAILS_STATE;
}

interface ActionTrueLoader {
  type: typeof pokeAction.LOADER_TRUE;
}

interface ActionFalseLoader {
  type: typeof pokeAction.LOADER_FALSE;
}

export type TypesAction =
  | ActionGetAllPokemons
  | ActionGetPokemon
  | ActionPostPokemon
  | ActionGetTypes
  | ActionFilterPokemonsByType
  | ActionFilterPokemonsCreated
  | ActionSortPokemonsAlphabetically
  | ActionSortPokemonsByStrength
  | ActionGetDetails
  | ActionClearDetailsState
  | ActionTrueLoader
  | ActionFalseLoader;
