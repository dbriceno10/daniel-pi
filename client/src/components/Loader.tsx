import React from "react";

import "./styles/Loader.scss";

export const Loader = (): JSX.Element => {
  return (
    <div className="lds-grid">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
