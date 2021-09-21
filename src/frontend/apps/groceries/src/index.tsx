import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Button } from '@material-ui/core';

const App = () => (
  <>
    <h1>My React and TypeScript App!</h1>
    <Button color="primary">Hello World</Button>
  </>
);

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
