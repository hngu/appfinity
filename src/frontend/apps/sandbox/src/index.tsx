import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { StarRating } from './components/StarRating';
import HPromise, { HandlerFunction } from './HPromise';

new HPromise((resolve: HandlerFunction) => {
  setTimeout(() => {
    resolve('Huy');
  }, 1000);
})
  .then((success: unknown) => {
    console.log('success', success);
    return new HPromise((_: HandlerFunction, reject: HandlerFunction) => {
      setTimeout(() => {
        reject('Huy 2');
      }, 1000);
    });
  })
  .then(
    (success: unknown) => {
      console.log('success', success);
      return true;
    },
    (failure: unknown) => {
      console.log('failure', failure);
      return true;
    },
  )
  .then((success: unknown) => {
    console.log(success);
    return true;
  });

const App = () => {
  return (
    <>
      <h1>My React and TypeScript App!</h1>
      <StarRating />
    </>
  );
};

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
