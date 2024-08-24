import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../actions";
import { capitalizeString, urlPatternValidation } from "../utils/utils";
import styles from "./styles/PokemonCreate.module.css";
import wikedexImg from "../assets/Logo_WikiDex_App.png";

export default function PokemonCreate() {
  const dispatch = useDispatch();
  //Estados de Redux y locales de React
  const typesPokemons = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name: "",
    hp: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    types: [],
  });
  const [error, setError] = useState({});//Estados locales para errores
  const [disabled, setDisabled] = useState(true);//Estado local para desabilitar o habilitar el botón de enviar
  const history = useHistory();//Hook useHoistory permite hacer una redirección a una página dada

  //componentWillMount
  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handlers
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.trim(),//Al campo actual le elimino los espacios a los lados
    });
    setError(
      validate({//validamos los errores
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input)); //despachamos la acción que se va a encargar de crear al pokemon, envía la data al backend
    // alert("Pokemon Creado");
    setInput({
      name: "",
      hp: "",
      strength: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      types: [],
    });
    setTimeout(() => {
      history.push("/home");
    }, 1000)
  }
  function handleCheck(e) {
    //Para seleccionar los tipos del pokemon
    if (e.target.checked) {
      //cuando este es seleccionado guarda el tipo en un arreglo
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    if (!e.target.checked) {
      //cuando el tipo es deselecconado, lo saca del array de tipos
      input.types.splice(input.types.indexOf(e.target.value), 1);
      setInput({
        ...input,
      });
    }
    setError(
      validate({ //validamos errores
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  //Función para validar errores
  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "Nombre Requerido";
    if (input.hp < 0) errors.hp = "Inválido!";
    if (input.strength < 0) errors.strength = "Inválido!";
    if (input.defense < 0) errors.defense = "Inválido!";
    if (input.speed < 0) errors.speed = "Inválido!";
    if (input.height < 0) errors.height = "Inválido!";
    if (input.weight < 0) errors.weight = "Inválido!";
    if (!urlPatternValidation(input.img) && input.img !== "")
      errors.img = "Formato no soportado";
    return errors;
  }

  //componentWillUpdate, escucha los cambios en los estados de error, input y setDisabled, para disparar el control de errores
  useEffect(() => {
    if (
      input.name.length > 0 &&
      input.types.length < 3 &&
      !error.hasOwnProperty("img") &&
      !error.hasOwnProperty("hp") &&
      !error.hasOwnProperty("strength") &&
      !error.hasOwnProperty("defense") &&
      !error.hasOwnProperty("speed") &&
      !error.hasOwnProperty("height") &&
      !error.hasOwnProperty("weight")
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [error, input, setDisabled]);
  return (
    <React.Fragment>
      <Link className={styles.link} to="/home">
        <div className={styles.wikiimg}>
          <div>
            <img src={wikedexImg} alt="not found" />
          </div>
          <p>Volver</p>
        </div>
      </Link>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Crea tu Pokemon</h1>
          <section className={styles.datacontainer}>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Nombre:</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {error.name && (
                  <p className={styles.errormessage}>{error.name}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Vida:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Vida"
                  name="hp"
                  value={input.hp}
                  onChange={handleChange}
                />
                {error.hp && <p className={styles.errormessage}>{error.hp}</p>}
              </div>
            </div>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Fuerza:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Fuerza"
                  name="strength"
                  value={input.strength}
                  onChange={handleChange}
                />
                {error.strength && (
                  <p className={styles.errormessage}>{error.strength}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Defensa:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Defensa"
                  name="defense"
                  value={input.defense}
                  onChange={handleChange}
                />
                {error.defense && (
                  <p className={styles.errormessage}>{error.defense}</p>
                )}
              </div>
            </div>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Velocidad:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Velocidad"
                  name="speed"
                  value={input.speed}
                  onChange={handleChange}
                />
                {error.speed && (
                  <p className={styles.errormessage}>{error.speed}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Altura:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Altura"
                  name="height"
                  value={input.height}
                  onChange={handleChange}
                />
                {error.height && (
                  <p className={styles.errormessage}>{error.height}</p>
                )}
              </div>
            </div>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Peso:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Peso"
                  name="weight"
                  value={input.weight}
                  onChange={handleChange}
                />
                {error.weight && (
                  <p className={styles.errormessage}>{error.weight}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Imagen:</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="url..."
                  name="img"
                  value={input.img}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {error.img && (
                  <p className={styles.errormessage}>{error.img}</p>
                )}
              </div>
            </div>
          </section>
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
                    onClick={handleCheck}
                  />
                </div>
              );
            })}
            {input.types.length > 2 ? (
              <p className={styles.errormessage2}>Seleccione Máximo 2 Tipos</p>
            ) : null}
          </div>

          <button className={styles.btnsend} type="submit" disabled={disabled}>
            Enviar
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
