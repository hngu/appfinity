import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import HomePage from './pages/HomePage';

const App = () => <HomePage />;

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
