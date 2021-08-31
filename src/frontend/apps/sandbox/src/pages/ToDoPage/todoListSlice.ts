import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. setup the type definition of the state
type Todo = {
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
  },
});

// export action creators
export const { setTodos } = todoListSlice.actions;

// 4. export the slice reducer
export default todoListSlice.reducer;
