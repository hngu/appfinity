import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import PromisePage from './pages/PromisePage';
import StarRatingPage from './pages/StarRatingPage';
import TypeAheadPage from './pages/TypeAheadPage';
import ToDoPage from './pages/ToDoPage';

type Page = {
  path: string;
  title: string;
  component: React.FC;
};

const Pages: Page[] = [
  {
    path: '/star-rating',
    title: 'Star Rating Widget',
    component: StarRatingPage,
  },
  {
    path: '/custom-promise',
    title: 'Custom Promise',
    component: PromisePage,
  },
  {
    path: '/typeahead',
    title: 'Typeahead Example',
    component: TypeAheadPage,
  },
  {
    path: '/todo',
    title: 'Todo Page',
    component: ToDoPage,
  },
];

const App = () => {
  return (
    <Router>
      <h1>My React and TypeScript App!</h1>
      <nav>
        <ul>
          {Pages.map((page) => (
            <li key={page.path}>
              <Link to={page.path}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {Pages.map((page) => (
          <Route key={page.path} path={page.path} component={page.component}></Route>
        ))}
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
