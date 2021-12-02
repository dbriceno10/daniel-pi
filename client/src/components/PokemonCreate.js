import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../actions";
import { capitalizeStringWithTrim } from "../utils/utils";

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
  const history = useHistory();
  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("Pokemon Creado");
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
      // const index = input.types.indexOf(e.target.value);
      // const newTypes = input.types.filter((e) => e !== input.types[index]);
      setInput({
        ...input,
        // types: newTypes,
      });
    }
  }
  // function handleCheck(e) {
  //   if (e.target.checked) {
  //     setInput({
  //       ...input,
  //       types: e.target.value,
  //     });
  //   }
  // }
  // function handleSelect(e) {
  //   setInput({
  //     ...input,
  //     types: [...input.types, e.target.value], //traeme lo que había y concatenale el target.value
  //   });
  // }
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
        <label>Vida:</label>
        <input
          type="number"
          placeholder="Vida"
          name="hp"
          value={input.hp}
          onChange={handleChange}
        />
        <label>Fuerza:</label>
        <input
          type="number"
          placeholder="Fuerza"
          name="strength"
          value={input.strength}
          onChange={handleChange}
        />
        <label>Defensa:</label>
        <input
          type="number"
          placeholder="Defensa"
          name="defense"
          value={input.defense}
          onChange={handleChange}
        />
        <label>Velocidad:</label>
        <input
          type="number"
          placeholder="Velocidad"
          name="speed"
          value={input.speed}
          onChange={handleChange}
        />
        <label>Altura:</label>
        <input
          type="number"
          placeholder="Altura"
          name="height"
          value={input.height}
          onChange={handleChange}
        />
        <label>Peso:</label>
        <input
          type="number"
          placeholder="Peso"
          name="weight"
          value={input.weight}
          onChange={handleChange}
        />
        <label>Imagen:</label>
        <input
          type="text"
          placeholder="url..."
          name="img"
          value={input.img}
          onChange={handleChange}
        />
        <label>Tipo</label>
        <div>
          {typesPokemons?.map((type) => {
            return (
              <label key={type.name}>
                <input
                  type="checkbox"
                  name={type.name}
                  value={type.name}
                  onChange={handleCheck}
                />
                {capitalizeStringWithTrim(type.name)}
              </label>
            );
          })}
        </div>
        {/* <div>
          <label>Tipos</label>
          <select onChange={handleSelect}>
            {typesPokemons?.map((type) => {
              return (
                <option key={type.id} value={type.name}>
                  {capitalizeStringWithTrim(type.name)}
                </option>
              );
            })}
          </select>
          <ul>
            <li>{input.types.map((type) => type + ",")}</li>
          </ul>
        </div> */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
