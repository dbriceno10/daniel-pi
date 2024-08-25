import * as React from "react";
import { ProviderPokemonCreate } from "../hoc";

const PokemonCreatePage: React.FC<React.ReactNode> = () => {
  return <ProviderPokemonCreate />;
};

PokemonCreatePage.displayName = "Pokemon Create Page";

export default PokemonCreatePage;
