import { connect } from "react-redux";

import PokemonCreate from "../container";
import {
  getTypesAsync,
  postPokemonAsync,
} from "../../../actions";
import { RootState } from "../../../store";

const mapStateToProps = (state: RootState) => {
  return { typesPokemons: state.types };
};

export const ProviderPokemonCreate = connect(mapStateToProps, {
  getTypes: getTypesAsync,
  createPokemon: postPokemonAsync,
})(PokemonCreate);
