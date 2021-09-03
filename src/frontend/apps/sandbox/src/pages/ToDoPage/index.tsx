import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const ToDoPage: FC = () => {
  return (
    <Provider store={store}>
      <h1>TODO page</h1>
      <TodoList />
      <TodoForm />
    </Provider>
  );
};

export default ToDoPage;
