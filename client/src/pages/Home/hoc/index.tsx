import { connect } from "react-redux";

import Home from "../container";
import {
  getTypesAsync,
  getAllPokemonsAsync,
  filterPokemonsByType,
  filterPokemonsCreated,
  sortPokemonsAlphabetically,
} from "../../../actions";
import { RootState } from "../../../store";

const mapStateToProps = (state: RootState) => {
  return { allPokemons: state.pokemons, typesPokemons: state.types };
};

export const ProviderHome = connect(mapStateToProps, {
  getTypes: getTypesAsync,
  getAllPokemons: getAllPokemonsAsync,
  filterByType: filterPokemonsByType,
  filterCreated: filterPokemonsCreated,
  sortAlphabetically: sortPokemonsAlphabetically,
})(Home);
