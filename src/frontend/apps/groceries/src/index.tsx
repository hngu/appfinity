import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavControl from './components/NavControl';

import { store } from './store';
import HomePage from './pages/HomePage';
import RemovedItemsPage from './pages/RemovedItemsPage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router>
        <NavControl />
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/removed" component={RemovedItemsPage} />
        </Switch>
      </Router>
    </Provider>
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
