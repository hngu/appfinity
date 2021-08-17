import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './globals';
import { Button } from './components/Button';

const App = () => (
  <h1>
    My React and TypeScript App!<Button>Test</Button>
  </h1>
);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
