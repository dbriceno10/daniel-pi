import { AxiosResponse } from "axios";

import axiosIntance from "../config/axiosInstance";
import { Pokemon, Type } from "../models";

export const Dao = {
  getPokemons: (
    search?: string | number
  ): Promise<AxiosResponse<Pokemon[] | Pokemon>> => {
    let name = "";
    if (search) {
      name = `?name=${search}`;
    }
    return axiosIntance.get(`/pokemons${name}`);
  },
  showPokemon: (id: number | string): Promise<AxiosResponse<Pokemon>> => {
    return axiosIntance.get(`/pokemons/${id}`);
  },
  getTypes: (): Promise<AxiosResponse<Type[]>> => {
    return axiosIntance.get("/types");
  },
};
