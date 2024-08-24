import React from "react";
import { SortAZ } from "../utils/enums";

interface SortSelectProps {
  sortDescription: string;
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

//Componente de ordenamiento, sirve para pasar distintos tipos de ordenamientos, aunque actualmente solo se usar para pasarle ordenamiento alfabético desde el componente NavHome
const SortSelect: React.FC<SortSelectProps> = ({
  sortDescription,
  handleSort,
}): JSX.Element => {
  return (
    <select onChange={handleSort}>
      <option value="default">{sortDescription}</option>
      {/* <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option> */}
      <option value={SortAZ.ASC}>A - Z</option>
      <option value={SortAZ.DESC}>Z - A</option>
    </select>
  );
};

export default SortSelect;
