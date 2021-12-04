import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, clearDetailsState, trueLoader } from "../actions";
import { capitalizeStringWithTrim } from "../utils/utils";
export default function Details(props) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.details);
  const loader = useSelector((state) => state.loader);
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    return () => {
      //componentWilUnmount
      dispatch(clearDetailsState());
      dispatch(trueLoader());
    };
  }, []);

  return (
    <div>
      {pokemon.length > 0 ? (
        <div>
          <h1>{capitalizeStringWithTrim(pokemon[0].name)}</h1>
          <img src={pokemon[0].img} alt="not found" />
          <p>Vida: {pokemon[0].hp}</p>
          <p>Fuerza: {pokemon[0].strength}</p>
          <p>Defensa: {pokemon[0].defense}</p>
          <p>Velocidad: {pokemon[0].speed}</p>
          <p>Altura: {pokemon[0].height}</p>
          <p>Peso: {pokemon[0].weight}</p>
          <h5>
            {pokemon[0].types?.map((type) => {
              return (
                <span
                  style={{
                    marginLeft: "2px",
                    marginRight: "2px",
                  }}
                  key={type}
                >
                  {capitalizeStringWithTrim(type)}
                </span>
              );
            })}
          </h5>
        </div>
      ) : (
        <p className={loader ? null : "hidden"}>...Loading</p>
      )}
      <p className={loader ? "hidden" : null}>Pokemon Not Found</p>
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
