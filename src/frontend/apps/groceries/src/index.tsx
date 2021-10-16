import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavControl from './components/NavControl';
import { LOCAL_STORAGE_KEY } from './constants';
import { setGroceries, GroceriesState } from './groceriesSlice';
import { useAppDispatch } from './hooks';
import { Shown } from './Shown';
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
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // on page load, get the saved grocery items
    try {
      setLoading(true);
      const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const state = JSON.parse(data);
        dispatch(setGroceries(state || ({} as GroceriesState)));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  return (
    <Router>
      <Shown isVisible={!loading}>
        <NavControl />
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/removed" component={RemovedItemsPage} />
        </Switch>
      </Shown>
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
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
