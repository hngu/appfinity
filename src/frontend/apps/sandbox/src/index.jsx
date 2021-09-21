import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PromisePage from './pages/PromisePage';
import StarRatingPage from './pages/StarRatingPage';
import TypeAheadPage from './pages/TypeAheadPage';
import ToDoPage from './pages/ToDoPage';
import DragDropPage from './pages/DragDropPage';
import VirtualListPage from './pages/VirtualListPage';
import UtilsPage from './pages/UtilsPage';
import AccordionPage from './pages/AccordionPage';

const Pages = [
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
  {
    path: '/dragdrop',
    title: 'Drag and Drop',
    component: DragDropPage,
  },
  {
    path: '/virtual-list',
    title: 'Virtual List',
    component: VirtualListPage,
  },
  {
    path: '/utils-page',
    title: 'Utils Page',
    component: UtilsPage,
  },
  {
    path: '/accordion',
    title: 'Accordion Page',
    component: AccordionPage,
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

function ErrorFallback({ error }) {
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