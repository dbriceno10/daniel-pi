import * as Yup from "yup";

import { TypesAction } from "../../actions/types";
import { PokemonUpdateDTO, PokemonCreateDTO } from "../../interfaces";
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

export interface DetailsProps {
  pokemon: Pokemon | null;
  clearDetails: () => TypesAction;
  getDetails: (
    id: string | number,
    callbackSuccess?: Function,
    callbackError?: Function
  ) => Promise<void>;
}

export interface PokemonCreateProps {
  typesPokemons: Type[];
  createPokemon: (
    form: PokemonCreateDTO,
    callbackSuccess?: (pokemon: Pokemon) => void,
    callbackError?: Function
  ) => Promise<void>;
  getTypes: (
    callbackSuccess?: Function,
    callbackError?: Function
  ) => Promise<void>;
}

export interface FormValues extends PokemonCreateDTO {
  id?: string;
}

export const initialValues: FormValues = {
  name: "",
  hp: 0,
  strength: 0,
  defense: 0,
  speed: 0,
  height: 0,
  weight: 0,
  img: "",
  types: [],
};

//@ts-ignore
export const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
  name: Yup.string().required("Este campo es requerido."),
  hp: Yup.number()
    .typeError("Debe ser una cantidad válida")
    .test("Validación de monto", "La cantidad debe ser positiva", (value) => {
      if ((value as number) < 0) {
        return false;
      }
      return true;
    })
    .required("Este campo es requerido."),
  strength: Yup.number()
    .typeError("Debe ser una cantidad válida")
    .test("Validación de monto", "La cantidad debe ser positiva", (value) => {
      if ((value as number) < 0) {
        return false;
      }
      return true;
    })
    .required("Este campo es requerido."),
  defense: Yup.number()
    .typeError("Debe ser una cantidad válida")
    .test("Validación de monto", "La cantidad debe ser positiva", (value) => {
      if ((value as number) < 0) {
        return false;
      }
      return true;
    })
    .required("Este campo es requerido."),
  speed: Yup.number()
    .typeError("Debe ser una cantidad válida")
    .test("Validación de monto", "La cantidad debe ser positiva", (value) => {
      if ((value as number) < 0) {
        return false;
      }
      return true;
    })
    .required("Este campo es requerido."),
  weight: Yup.number()
    .typeError("Debe ser una cantidad válida")
    .test("Validación de monto", "La cantidad debe ser positiva", (value) => {
      if ((value as number) < 0) {
        return false;
      }
      return true;
    })
    .required("Este campo es requerido."),
  height: Yup.number()
    .typeError("Debe ser una cantidad válida")
    .test("Validación de monto", "La cantidad debe ser positiva", (value) => {
      if ((value as number) < 0) {
        return false;
      }
      return true;
    })
    .required("Este campo es requerido."),
  types: Yup.array()
    .of(Yup.string().required("Cada elemento debe ser un tipo válido"))
    .min(1, "Debe tener al menos un tipo")
    .max(2, "No puede tener más de 2 tipos")
    .required("Este campo es requerido."),
  img: Yup.string()
    .matches(
      /(https?:\/\/.*\.(?:png|jpg))/,
      "Debe ser una URL de imagen válida (png o jpg)"
    )
    .optional(),
  id: Yup.string().optional(),
});
