import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

import {
  FormValues,
  PokemonCreateProps,
  initialValues,
  validationSchema,
} from "../../interfaces";
import Form from "../../../components/Form";
import { Pokemon } from "../../../models";

const PokemonCreate: React.FC<PokemonCreateProps> = ({
  typesPokemons,
  createPokemon,
  getTypes,
}): JSX.Element => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setDisabled(true);
    createPokemon(values, (pokemon: Pokemon) => {
      setDisabled(false);
      console.log('here')
      resetForm();
      navigate(`/home/${pokemon.id}`);
    }, () => setDisabled(false));
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

  return (
    <Form
      title="Crea tu Pokemon"
      formikInstance={formikInstance}
      typesPokemons={typesPokemons}
      disabled={disabled}
    />
  );
};

export default PokemonCreate;
