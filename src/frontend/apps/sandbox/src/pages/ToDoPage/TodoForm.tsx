import React, { FC, useState } from 'react';
import { useAppDispatch } from './hooks';
import { addTodo } from './todoListSlice';

const TodoForm: FC = () => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addTodo({
        id: new Date().getTime().toString(),
        name: todo,
        isActive: true,
      }),
    );
    setTodo('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTodo(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
