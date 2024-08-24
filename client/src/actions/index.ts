import { AxiosError } from "axios";
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
  TypesAction,
} from "./types";
import { Pokemon, Type } from "../models";
import { ErrorHandler, PokemonCreateDTO } from "../interfaces";
import { Dao } from "../api/dao";
import { Repository } from "../api/repository";
import ToastifyAlert from "../components/ToastifyAlert";

//acción que permite traer a todos los pokemones del api + los de la base de datos

function getAllPokemons(payload: Pokemon[]): TypesAction {
  return {
    payload,
    type: GET_ALL_POKEMONS,
  };
}

export function getAllPokemonsAsync(
  callbackSuccess?: Function,
  callbackError?: Function
) {
  return async function (dispatch: Function) {
    try {
      const response = await Dao.getPokemons();
      dispatch(getAllPokemons(response.data));
      callbackSuccess && callbackSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
    const message = data?.message ?? "Ha ocurrido un error";
        ToastifyAlert({
          text: message,
          type: "error",
        });
        callbackError && callbackError();
      }
    }
  };
}
//acción que permite traer a un pokemon por su nombre exacto o su id

function getPokemon(payload: Pokemon): TypesAction {
  return {
    payload,
    type: GET_POKEMON,
  };
}

export function getPokemonAsync(
  name: string | number,
  callbackSuccess?: Function,
  callbackError?: Function
) {
  return async function (dispatch: Function) {
    try {
      const response = await Dao.getPokemons(name);
      dispatch(getPokemon(response.data[0]));
      callbackSuccess && callbackSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
    const message = data?.message ?? "Ha ocurrido un error";
        ToastifyAlert({
          text: message,
          type: "error",
        });
        callbackError && callbackError();
      }
    }
  };
}

//acción que permite crear a un pokemon con los datos obtenidos desde el formulario controlado

function postPokemon(payload: Pokemon): TypesAction {
  return {
    payload,
    type: POST_POKEMON,
  };
}

export function postPokemonAsync(
  form: PokemonCreateDTO,
  callbackSuccess?: Function,
  callbackError?: Function
) {
  return async function (dispatch: Function) {
    try {
      const response = await Repository.createPokemon(form);
      dispatch(postPokemon(response.data.pokemon));
      ToastifyAlert({
        text: response.data.message,
        type: "success",
      });
      callbackSuccess && callbackSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
    const message = data?.message ?? "Ha ocurrido un error";
        ToastifyAlert({
          text: message,
          type: "error",
        });
        callbackError && callbackError();
      }
    }
  };
}

//acción que permite traer todos los types de los pokemones

function getTypes(payload: Type[]): TypesAction {
  return {
    payload,
    type: GET_TYPES,
  };
}

export function getTypesAsync(
  callbackSuccess?: Function,
  callbackError?: Function
) {
  return async function (dispatch: Function) {
    try {
      const response = await Dao.getTypes();
      dispatch(getTypes(response.data));
      callbackSuccess && callbackSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
    const message = data?.message ?? "Ha ocurrido un error";
        ToastifyAlert({
          text: message,
          type: "error",
        });
        callbackError && callbackError();
      }
    }
  };
}

//acción que permite filtrar a los pokemones por tipo
export function filterPokemonsByType(payload: string): TypesAction {
  return {
    type: FILTER_POKEMONS_BY_TYPE,
    payload,
  };
}

//acción que permite filtrar a los pokemones si estos vienen del api o de la base de datos
export function filterPokemonsCreated(payload: string): TypesAction {
  return {
    type: FILTER_POKEMONS_CREATED,
    payload,
  };
}

//acción que permite ordenar a los pokemones de forma alfabética
export function sortPokemonsAlphabetically(payload: string): TypesAction {
  return {
    type: SORT_POKEMONS_ALPHABETICALLY,
    payload,
  };
}

//acción que permite ordenar a los pokemones por fuerza (actualmente en desuso)
export function sortPokemonsByStrength(payload: string): TypesAction {
  return {
    type: SORT_POKEMONS_BY_STRENGTH,
    payload,
  };
}

//acción que permite traer un pokemon por su id para la ruta de detalles

function getDetails(payload: Pokemon): TypesAction {
  return {
    payload,
    type: GET_DETAILS,
  };
}

export function getDetailsAsync(
  id: string | number,
  callbackSuccess?: Function,
  callbackError?: Function
) {
  return async function (dispatch: Function) {
    try {
      const response = await Dao.showPokemon(id);
      dispatch(getDetails(response.data));
      callbackSuccess && callbackSuccess();
    } catch (error) {
      dispatch(trueLoader());
      if (error instanceof AxiosError) {
        const data: ErrorHandler = error.response?.data;
    const message = data?.message ?? "Ha ocurrido un error";
        ToastifyAlert({
          text: message,
          type: "error",
        });
        callbackError && callbackError();
      }
    }
  };
}

//acción que permite limpiar el estado de detalles
export function clearDetailsState(): TypesAction {
  return {
    type: CLEAR_DETAILS_STATE,
  };
}

//acción que permite cambiara true el estado de loader
export function trueLoader(): TypesAction {
  return {
    type: LOADER_TRUE,
  };
}

//acción que permite cambiar a false es estado de loader
export function falseLoader(): TypesAction {
  return {
    type: LOADER_FALSE,
  };
}
