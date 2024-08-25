import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import {
  FormValues,
  PokemonUpdateProps,
  initialValues,
  validationSchema,
} from "../../interfaces";
import Form from "../../../components/Form";
import Loader from "../../../components/Loader";
import { Pokemon } from "../../../models";
import { PokemonUpdateDTO } from "../../../interfaces";

const PokemonUpdate: React.FC<PokemonUpdateProps> = ({
  typesPokemons,
  getTypes,
  pokemon,
  getDetails,
  clearDetails,
  updatePokemon,
}): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setDisabled(true);
    updatePokemon(
      values as PokemonUpdateDTO,
      (pokemon: Pokemon) => {
        setDisabled(false);
        resetForm();
        navigate(`/home/${pokemon.id}`);
      },
      () => setDisabled(false)
    );
  };

  const formikInstance = useFormik({
    initialValues: pokemon
      ? {
          id: String(pokemon.id),
          img: pokemon.img,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          hp: pokemon.hp,
          speed: pokemon.speed,
          defense: pokemon.defense,
          strength: pokemon.strength,
          types: pokemon.types,
          createInDb: pokemon.createInDb,
        }
      : initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    setLoader(true);
    getDetails(
      id as string,
      () => setLoader(false),
      () => {
        setLoader(false);
        navigate("/home");
      }
    );
    if (!typesPokemons.length) {
      getTypes();
    }
    return () => {
      clearDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {!loader && pokemon ? (
        <Form
          title="Actualiza tu Pokemon"
          formikInstance={formikInstance}
          typesPokemons={typesPokemons}
          disabled={disabled}
        />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default PokemonUpdate;
