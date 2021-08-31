import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { setTodos } from './todoListSlice';

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.todos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const jsonString = localStorage.getItem('todos');
    if (jsonString != null) {
      const todos = JSON.parse(jsonString);
      if (isMounted) {
        dispatch(setTodos(todos));
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return todoList.length > 0 ? (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  ) : !loading ? (
    <p>Please enter a todo</p>
  ) : null;
};

export default TodoList;
