import { Pokemon, Type } from "../models";

export interface State {
  pokemons: Pokemon[];
  pokemonsTypesFilter: Pokemon[];
  pokemonsCopy: Pokemon[];
  types: Type[];
  details: Pokemon[];
  searchPokemons: Pokemon[];
  loader: boolean;
}
