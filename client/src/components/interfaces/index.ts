import { FormikProps } from "formik";

import { Pokemon, Type } from "../../models";
import { FormValues } from "../../pages/interfaces";

export interface PaginadoProps {
  pokemonsPerPage: number;
  allPokemons: Pokemon[];
  paginado: (value: number) => void;
  currentPage: number;
}

export interface SearchBarProps {
  getPokemon: (
    name: string | number,
    callbackSuccess?: Function,
    callbackError?: Function
  ) => Promise<void>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CardProps {
  img: string;
  name: string;
  types: string[];
  id: string | number;
  create?: boolean;
}

export interface NavHomeProps extends SearchBarProps {
  typesPokemons: Type[];
  handleSortAlphabetically: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterCreated: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterTypes: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface FormProps {
  formikInstance: FormikProps<FormValues>;
  typesPokemons: Type[];
  title: string;
  disabled: boolean;
}
