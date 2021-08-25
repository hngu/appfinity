import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import PromisePage from './pages/PromisePage';
import StarRatingPage from './pages/StarRatingPage';
import TypeAheadPage from './pages/TypeAheadPage';

const App = () => {
  return (
    <Router>
      <h1>My React and TypeScript App!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/star-rating">Star Rating Widget</Link>
          </li>
          <li>
            <Link to="/custom-promise">Custom Promise</Link>
          </li>
          <li>
            <Link to="/typeahead">TypeAhead Example</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Route path="/star-rating" component={StarRatingPage}></Route>
        <Route path="/custom-promise" component={PromisePage}></Route>
        <Route path="/typeahead" component={TypeAheadPage}></Route>
      </div>
    </Router>
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
