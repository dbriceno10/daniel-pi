import { Box, InputAdornment, Grid, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

import { FormProps } from "./interfaces";
import { capitalizeString } from "../utils/utils";

import styles from "../pages/styles/PokemonCreate.module.scss";

import wikidexImg from "../assets/Logo_WikiDex_App.png";

const Form: React.FC<FormProps> = ({
  formikInstance,
  typesPokemons,
  title,
  disabled
}): JSX.Element => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Para seleccionar los tipos del pokemon
    if (e.target.checked) {
      //cuando este es seleccionado guarda el tipo en un arreglo
      formikInstance.setFieldValue("types", [
        ...formikInstance.values.types,
        e.target.value,
      ]);
    }
    if (!e.target.checked) {
      //cuando el tipo es deselecconado, lo saca del array de tipos
      // const aux = formikInstance.values.types
      // aux.splice(aux.indexOf(e.target.value), 1);
      const aux = formikInstance.values.types?.filter(
        (type) => type !== e.target.value
      );
      formikInstance.setFieldValue("types", aux);
    }
  };

  return (
    <React.Fragment>
      <Link className={styles.link} to="/home">
        <div className={styles.wikiimg}>
          <div>
            <img src={wikidexImg} alt="Wikidex" title="Wikidex" />
          </div>
          <p>Volver</p>
        </div>
      </Link>
      <div className={styles.container}>
        <Box
          component="form"
          className={styles.form}
          onSubmit={formikInstance.handleSubmit}
        >
          {/* <h1>Crea tu Pokemon</h1> */}
          <h1>{title}</h1>

          <Grid container sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="name"
                label="Nombre"
                placeholder="Nombre"
                value={formikInstance.values.name}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.name && formikInstance.touched.name && (
                <span className={styles.errorMessage}>
                  {formikInstance.errors.name}
                </span>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="hp"
                label="Vida"
                placeholder="Vida"
                value={formikInstance.values.hp}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.hp && formikInstance.touched.hp && (
                <span className={styles.errorMessage}>
                  {formikInstance.errors.hp}
                </span>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="strength"
                label="Fuerza"
                placeholder="Fuerza"
                value={formikInstance.values.strength}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.strength &&
                formikInstance.touched.strength && (
                  <span className={styles.errorMessage}>
                    {formikInstance.errors.strength}
                  </span>
                )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="defense"
                label="Defensa"
                placeholder="Defensa"
                value={formikInstance.values.defense}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.defense &&
                formikInstance.touched.defense && (
                  <span className={styles.errorMessage}>
                    {formikInstance.errors.defense}
                  </span>
                )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="speed"
                label="Velocidad"
                placeholder="Velocidad"
                value={formikInstance.values.speed}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.speed && formikInstance.touched.speed && (
                <span className={styles.errorMessage}>
                  {formikInstance.errors.speed}
                </span>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="height"
                label="Altura"
                placeholder="Altura"
                value={formikInstance.values.height}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.height &&
                formikInstance.touched.height && (
                  <span className={styles.errorMessage}>
                    {formikInstance.errors.height}
                  </span>
                )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="weight"
                label="Peso"
                placeholder="Peso"
                value={formikInstance.values.weight}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.weight &&
                formikInstance.touched.weight && (
                  <span className={styles.errorMessage}>
                    {formikInstance.errors.weight}
                  </span>
                )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 1 }}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="img"
                label="Imagen"
                value={formikInstance.values.img}
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
                placeholder="URL..."
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon className={styles.pokeballIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              {formikInstance.errors.img && formikInstance.touched.img && (
                <span className={styles.errorMessage}>
                  {formikInstance.errors.img}
                </span>
              )}
            </Grid>
          </Grid>
          <label style={{ fontWeight: "bold" }}>Tipo:</label>
          <div className={styles.checkcontainer}>
            {typesPokemons?.map((type) => {
              return (
                <div key={type.name}>
                  <p className={styles[type.name]}>
                    {capitalizeString(type.name)}
                  </p>
                  <input
                    type="checkbox"
                    name={type.name}
                    value={type.name}
                    onChange={(e) => handleCheck(e)}
                  />
                </div>
              );
            })}
            {formikInstance.errors.types && formikInstance.touched.types && (
              <p className={styles.errormessage2}>
                {formikInstance.errors.types}
              </p>
            )}
          </div>

          <button
            className={styles.btnsend}
            type="submit"
            disabled={disabled}
          >
            Enviar
          </button>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default Form;
