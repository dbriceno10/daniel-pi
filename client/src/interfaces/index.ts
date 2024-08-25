import { Pokemon } from "../models";

export interface PokemonResponse {
  pokemon: Pokemon;
  message: string;
}

export type ErrorHandler = {
  message: string;
};

export interface PokemonUpdateDTO {
  id: string | number;
  name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
  height: number;
  weight: number;
  img: string;
  createInDb: boolean;
  types: string[];
}

export interface PokemonCreateDTO
  extends Omit<PokemonUpdateDTO, "id" | "createInDb"> {}
