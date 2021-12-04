import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../actions";
import { capitalizeString, urlPatternValidation } from "../utils/utils";

export default function PokemonCreate() {
  const dispatch = useDispatch();
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
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.trim(),
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
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
    // history.push("/home");
  }
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    if (!e.target.checked) {
      input.types.splice(input.types.indexOf(e.target.value), 1);
      setInput({
        ...input,
      });
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function validate(input) {
    let errors = {};
    if (!input.types.length) errors.types = "Tipo Requerido";
    if (!input.name) errors.name = "Nombre Requerido";
    // if (!input.hp) errors.hp = "Vida Requerida";
    // if (!input.strength) errors.strength = "Fuerza Requerida";
    // if (!input.defense) errors.defense = "Fuerza Requerida";
    // if (!input.speed) errors.speed = "Velocidad Requerida";
    // if (!input.height) errors.height = "Altura Requerida";
    // if (!input.weight) errors.weight = "Peso Requerido";
    // if (!input.img) errors.img = "Imagen Requerida";
    if (!urlPatternValidation(input.img) && input.img !== "")
      errors.img = "Formato no soportado";
    return errors;
  }
  useEffect(() => {
    if (
      input.types.length > 0 &&
      input.name.length > 0 &&
      input.types.length < 3 &&
      !error.hasOwnProperty("img")
      // input.hp.length > 0 &&
      // input.strength.length > 0 &&
      // input.defense.length > 0 &&
      // input.speed.length > 0 &&
      // input.height.length > 0 &&
      // input.weight.length > 0 &&
      // input.img.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input, setDisabled]);
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        {error.name && <p>{error.name}</p>}
        <label>Vida:</label>
        <input
          type="number"
          placeholder="Vida"
          name="hp"
          value={input.hp}
          onChange={handleChange}
        />
        {/* {error.hp && <p>{error.hp}</p>} */}
        <label>Fuerza:</label>
        <input
          type="number"
          placeholder="Fuerza"
          name="strength"
          value={input.strength}
          onChange={handleChange}
        />
        {/* {error.strength && <p>{error.strength}</p>} */}
        <label>Defensa:</label>
        <input
          type="number"
          placeholder="Defensa"
          name="defense"
          value={input.defense}
          onChange={handleChange}
        />
        {/* {error.defense && <p>{error.defense}</p>} */}
        <label>Velocidad:</label>
        <input
          type="number"
          placeholder="Velocidad"
          name="speed"
          value={input.speed}
          onChange={handleChange}
        />
        {/* {error.speed && <p>{error.speed}</p>} */}
        <label>Altura:</label>
        <input
          type="number"
          placeholder="Altura"
          name="height"
          value={input.height}
          onChange={handleChange}
        />
        {/* {error.height && <p>{error.height}</p>} */}
        <label>Peso:</label>
        <input
          type="number"
          placeholder="Peso"
          name="weight"
          value={input.weight}
          onChange={handleChange}
        />
        {/* {error.weight && <p>{error.weight}</p>} */}
        <label>Imagen:</label>
        <input
          type="text"
          placeholder="url..."
          name="img"
          value={input.img}
          onChange={handleChange}
        />
        {error.img && <p>{error.img}</p>}
        <label>Tipo</label>
        <div>
          {typesPokemons?.map((type) => {
            return (
              <label key={type.name}>
                <input
                  type="checkbox"
                  name={type.name}
                  value={type.name}
                  onClick={handleCheck}
                />
                {capitalizeString(type.name)}
              </label>
            );
          })}
        </div>
        {error.types && <p>{error.types}</p>}
        {input.types.length > 2 ? <p>Seleccione Máximo 2 Tipos</p> : null}
        <button type="submit" disabled={disabled}>
          Enviar
        </button>
      </form>
    </div>
  );
}
