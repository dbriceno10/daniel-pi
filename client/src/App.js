import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Nota: por ahora vamos a estar trabajando con la versión 5 de react-router-dom para agilizar, luego lo vamos a migrar a la verisón 6
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonCreate from "./components/PokemonCreate";
import  Details  from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={PokemonCreate} />
          <Route exact path="/home/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
