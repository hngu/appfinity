import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './globals';

const App = () => <h1>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
