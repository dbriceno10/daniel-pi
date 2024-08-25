import * as React from "react";
import { ProviderPokemonUpdate } from "../hoc";

const PokemonUpdatePage: React.FC<React.ReactNode> = () => {
  return <ProviderPokemonUpdate />;
};

PokemonUpdatePage.displayName = "Pokemon Update Page";

export default PokemonUpdatePage;
