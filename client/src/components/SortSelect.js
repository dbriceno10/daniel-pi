import React from "react";

//Componente de ordenamiento, sirve para pasar distintos tipos de ordenamientos, aunque actualmente solo se usar para pasarle ordenamiento alfabético desde el componente NavHome
export default function SortSelect({ sortDescription, handleSort }) {
  return (
    <select onChange={handleSort}>
      <option value="default">{sortDescription}</option>
      {/* <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option> */}
      <option value="asc">A - Z</option>
      <option value="desc">Z - A</option>
    </select>
  );
}
