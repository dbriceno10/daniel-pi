import { AxiosResponse } from "axios";

import axiosIntance from "../config/axiosInstance";
import {
  PokemonResponse,
  PokemonCreateDTO,
  PokemonUpdateDTO,
} from "../interfaces";

export const Repository = {
  updatePokemon: (
    id: number | string,
    pokemon: PokemonUpdateDTO
  ): Promise<AxiosResponse<PokemonResponse>> => {
    return axiosIntance.put(`/pokemons/${id}`, pokemon);
  },
  createPokemon: (
    pokemon: PokemonCreateDTO
  ): Promise<AxiosResponse<PokemonResponse>> => {
    return axiosIntance.post("/pokemons", pokemon);
  },
  deletePokemon: (
    id: number | string
  ): Promise<AxiosResponse<PokemonResponse>> => {
    return axiosIntance.delete(`/pokemons/${id}`);
  },
};
