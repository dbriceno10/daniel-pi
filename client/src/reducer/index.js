import { pokeAction } from "../actions";
const inicialState = {
  pokemons: [],
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case pokeAction.GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload, //en mi estado de pokemons, que en un principio es un arreglo vacío, manda todo lo que te envie la acción
      };
    default:
      return state;
  }
}
export default rootReducer;
