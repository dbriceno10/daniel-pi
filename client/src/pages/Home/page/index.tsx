import * as React from "react";
import { ProviderHome } from "../hoc";

const HomePage: React.FC<React.ReactNode> = () => {
  return <ProviderHome />;
};

HomePage.displayName = "Home Page";

export default HomePage;
