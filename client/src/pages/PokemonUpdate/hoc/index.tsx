import { connect } from "react-redux";

import PokemonUpdate from "../container";
import {
  getTypesAsync,
  updatePokemonAsync,
  getDetailsAsync,
  clearDetailsState,
} from "../../../actions";
import { RootState } from "../../../store";

const mapStateToProps = (state: RootState) => {
  return { typesPokemons: state.types, pokemon: state.details };
};

export const ProviderPokemonUpdate = connect(mapStateToProps, {
  getTypes: getTypesAsync,
  updatePokemon: updatePokemonAsync,
  getDetails: getDetailsAsync,
  clearDetails: clearDetailsState,
})(PokemonUpdate);
