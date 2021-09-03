import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// 1. setup the type definition of the state
export type Todo = {
  id: string;
  name: string;
  isActive: boolean;
};

type TodoListState = {
  todos: Todo[];
};

// 2. setup the initial state
const initialState: TodoListState = {
  todos: [],
};

// 3. create the slice
const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id != id);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const updatedTodo = action.payload;
      const currentTodoIndex = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (currentTodoIndex === -1) {
        return;
      }
      state.todos[currentTodoIndex] = updatedTodo;
    },
    /**
     * if you want to separate reducers from actions, just provide a extraReducers() function
     * like this:
     * extraReducers: (builder) {
     *  builder.addCase('ACTION', (state, action) => {
     * });
     * }
     */
  },
});

// export action creators
export const { setTodos, addTodo, removeTodo, updateTodo } = todoListSlice.actions;

// 4. export the slice reducer
export default todoListSlice.reducer;

// create reusable, memoized selectors here
/**
 * NOTE: createSelector allows you to aggregate multiple slices
 * as long as the last param is a function that does something with those slices.
 *
 * EX:
 *
 * export const foo = createSelector(
  (state: RootState) => state.a.b,
  (state: RootState) => state.c.d,
  (b,d) => return b + d,
);
 */
export const getTotalTodos = createSelector(
  (state: RootState) => state.todoList.todos,
  (todos) => todos.length,
);
