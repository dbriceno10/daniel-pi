import { TypesAction } from "../../actions/types";
import { Pokemon, Type } from "../../models";

export interface HomeProps {
  allPokemons: Pokemon[];
  typesPokemons: Type[];
  getTypes: (
    callbackSuccess?: Function,
    callbackError?: Function
  ) => Promise<void>;
  getAllPokemons: (
    callbackSuccess?: Function,
    callbackError?: Function
  ) => Promise<void>;
  filterByType: (payload: string) => TypesAction;
  filterCreated: (payload: string) => TypesAction;
  sortAlphabetically: (payload: string) => TypesAction;
  getPokemon: (
    name: string | number,
    callbackSuccess?: Function,
    callbackError?: Function
  ) => Promise<void>;
}
