import React from "react";

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
