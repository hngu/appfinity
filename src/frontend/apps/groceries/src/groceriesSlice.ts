import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroceryItem } from './types';

// 1. Setup type definitions for the redux state
type GroceriesState = {
  groceries: GroceryItem[];
};

// 2. Create the initial state
const initialState: GroceriesState = {
  groceries: [],
};

// 3. Create the slice
const groceriesSlice = createSlice({
  name: 'groceries',
  initialState,
  reducers: {
    setGroceries(state, action: PayloadAction<GroceryItem[]>) {
      state.groceries = action.payload;
    },
    addGroceryItem(state, action: PayloadAction<GroceryItem>) {
      state.groceries = [...state.groceries, action.payload];
    },
  },
});

// 4. export the action creators
export const { setGroceries } = groceriesSlice.actions;

// 5. export the slice reducer
export default groceriesSlice.reducer;
