import React, { useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";

import {
  FormValues,
  PokemonCreateProps,
  initialValues,
  validationSchema,
} from "../../interfaces";
import Form from "../../../components/Form";

const PokemonCreate: React.FC<PokemonCreateProps> = ({
  typesPokemons,
  createPokemon,
  getTypes,
}): JSX.Element => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
  };

  const formikInstance = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!typesPokemons.length) {
      getTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Form title="Crea tu Pokemon" formikInstance={formikInstance} typesPokemons={typesPokemons}/>;
};

export default PokemonCreate;
