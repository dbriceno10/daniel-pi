import { render, screen} from '@testing-library/react';
import LandingPage from '../components/LandingPage'
import { MemoryRouter } from 'react-router-dom';

test('Renderiza texto de bienvenida', () => {
    render(<LandingPage />, { wrapper: MemoryRouter})

    expect(screen.getByText('WikiDex')).toBeInTheDocument()
})



// import React from "react";
// import { Link } from "react-router-dom";
// import { configure, shallow } from "enzyme"
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import isReact from "is-react";

// import LandingPage from "../components/LandingPage.js"

// configure({ adapter: new Adapter() });

// describe("<LandingPage />", () => {
//   let landingPage;
//   beforeEach(() => {
//     landingPage = shallow(<LandingPage/>);
//     expect(isReact.classComponent(LandingPage)).toBetoBeFalsy();
//   });

//   it('Debería renderizar un <Link to="/home" />.', () => {
//     expect(landingPage.find(Link).length).toBeGreaterThanOrEqual(1);
//   });

//   it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/"', () => {
//     expect(landingPage.find(Link).at(0).prop("to")).toEqual("/home");

//   });
// });
