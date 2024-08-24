import { Pokemon, Type } from "../models";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const POST_POKEMON = "POST_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE";
export const FILTER_POKEMONS_CREATED = "FILTER_POKEMONS_CREATED";
export const SORT_POKEMONS_ALPHABETICALLY = "SORT_POKEMONS_ALPHABETICALLY";
export const SORT_POKEMONS_BY_STRENGTH = "SORT_POKEMONS_BY_STRENGTH";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAILS_STATE = "CLEAR_DETAILS_STATE";
export const LOADER_TRUE = "LOADER_TRUE";
export const LOADER_FALSE = "LOADER_FALSE";

interface ActionGetAllPokemons {
  payload: Pokemon[];
  type: typeof GET_ALL_POKEMONS;
}

interface ActionGetPokemon {
  payload: Pokemon;
  type: typeof GET_POKEMON;
}

interface ActionPostPokemon {
  payload: Pokemon;
  type: typeof POST_POKEMON;
}

interface ActionGetTypes {
  payload: Type[];
  type: typeof GET_TYPES;
}

interface ActionFilterPokemonsByType {
  payload: string;
  type: typeof FILTER_POKEMONS_BY_TYPE;
}

interface ActionFilterPokemonsCreated {
  payload: string;
  type: typeof FILTER_POKEMONS_CREATED;
}

interface ActionSortPokemonsAlphabetically {
  payload: string;
  type: typeof SORT_POKEMONS_ALPHABETICALLY;
}

interface ActionSortPokemonsByStrength {
  payload: string;
  type: typeof SORT_POKEMONS_BY_STRENGTH;
}

interface ActionGetDetails {
  payload: Pokemon;
  type: typeof GET_DETAILS;
}

interface ActionClearDetailsState {
  type: typeof CLEAR_DETAILS_STATE;
}

interface ActionTrueLoader {
  type: typeof LOADER_TRUE;
}

interface ActionFalseLoader {
  type: typeof LOADER_FALSE;
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
