import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const ToDoPage: FC = () => {
  return (
    <Provider store={store}>
      <h1>TODO page</h1>
    </Provider>
  );
};

export default ToDoPage;
