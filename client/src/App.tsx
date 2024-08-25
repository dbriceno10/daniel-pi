import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loader from "./components/SuspenseLoader/Loader";
// import PokemonCreate from "./components/PokemonCreate";

import "./App.css";
import "./global.scss";

const LandingPage = Loader(lazy(() => import("./pages/LandingPage/page")));
const Home = Loader(lazy(() => import("./pages/Home/page")));
const NotFoundPage = Loader(lazy(() => import("./pages/NotFoundPage/page")));
const Details = Loader(lazy(() => import("./pages/Details/page")));
const PokemonCreate = Loader(lazy(() => import("./pages/PokemonCreate/page")));
const PokemonUpdate = Loader(lazy(() => import("./pages/PokemonUpdate/page")));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<PokemonCreate />} />
          <Route path="/update/:id" element={<PokemonUpdate />} />
          <Route path="/home/:id" element={<Details />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
