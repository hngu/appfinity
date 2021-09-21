import { configureStore } from '@reduxjs/toolkit';
import groceriesReducer from './groceriesSlice';

export const store = configureStore({
  reducer: groceriesReducer,
});

store.subscribe(() => {
  console.log(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
