import "./App.css";
import "./global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
// import Home from "./components/Home";
// import PokemonCreate from "./components/PokemonCreate";
// import Details from "./components/Detail";
// import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/create" element={<PokemonCreate />} /> */}
          {/* <Route path="/home/:id" element={<Details />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
