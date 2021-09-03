import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import styled from 'styled-components/macro';
import { setTodos, removeTodo, updateTodo, Todo, getTotalTodos } from './todoListSlice';

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.todos);
  const totalTodos = useAppSelector(getTotalTodos);
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

  const handleRemoveTodoClick = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodoActive = (todo: Todo) => {
    dispatch(
      updateTodo({
        ...todo,
        isActive: !todo.isActive,
      }),
    );
  };

  return totalTodos > 0 ? (
    <>
      <p>You have {totalTodos} todos </p>
      <ul>
        {todoList.map((todo) => (
          <StyledListItem
            key={todo.id}
            onClick={() => {
              handleToggleTodoActive(todo);
            }}
            isActive={todo.isActive}
          >
            {todo.name}
            <button
              onClick={() => {
                handleRemoveTodoClick(todo.id);
              }}
            >
              x
            </button>
          </StyledListItem>
        ))}
      </ul>
    </>
  ) : !loading ? (
    <p>Please enter a todo</p>
  ) : null;
};

export default TodoList;

type StyledListItemProps = {
  isActive: boolean;
};

const StyledListItem = styled.li<StyledListItemProps>`
  text-decoration: ${(props) => (props.isActive ? 'none' : 'line-through')};
`;
