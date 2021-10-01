import { configureStore } from '@reduxjs/toolkit';
import groceriesReducer from './groceriesSlice';
import { LOCAL_STORAGE_KEY } from './constants';

export const store = configureStore({
  reducer: groceriesReducer,
});

store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
