import React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components/macro";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Main} from './Main';
import { CreateItem } from "./CreateItem";

const App = () => {

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/item">Create Item</Link></li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route path="/item">
              <CreateItem />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </StyledApp>
    </>
  );
};

const StyledApp = styled.div`
  padding: 0;
  margin: 0;
`;

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }

  * {
    font-family: Roboto;
  }
`

// all react stuff must happen before you hit render
render(<App />, document.getElementById("app"));

