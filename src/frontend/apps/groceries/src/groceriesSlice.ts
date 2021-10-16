import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroceryItem } from './types';

// 1. Setup type definitions for the redux state
export type GroceriesState = {
  groceries: GroceryItem[];
  pastGroceries: GroceryItem[];
};

// 2. Create the initial state
const initialState: GroceriesState = {
  groceries: [],
  pastGroceries: [],
};

// 3. Create the slice
const groceriesSlice = createSlice({
  name: 'groceries',
  initialState,
  reducers: {
    setGroceries(state, action: PayloadAction<GroceriesState>) {
      state.groceries = action.payload.groceries;
      state.pastGroceries = action.payload.pastGroceries;
    },
    addGroceryItem(state, action: PayloadAction<GroceryItem>) {
      state.groceries = [...state.groceries, action.payload];
    },
    updateGroceryItem(state, action: PayloadAction<GroceryItem>) {
      const index = state.groceries.findIndex((item) => item.id === action.payload.id);
      if (index < 0) {
        return;
      }
      const groceryItem = state.groceries[index];
      const updatedGroceryItem = {
        ...groceryItem,
        ...action.payload,
      };

      state.groceries[index] = updatedGroceryItem;
    },
    removeGroceryItem(state, action: PayloadAction<string>) {
      const index = state.groceries.findIndex((item) => item.id === action.payload);
      if (index < 0) {
        return;
      }
      const item = state.groceries[index];
      state.groceries = [...state.groceries.slice(0, index), ...state.groceries.slice(index + 1)];
      const isFoundInDeleted = state.pastGroceries.find((deleted) => deleted.name === item.name);
      if (!isFoundInDeleted) {
        state.pastGroceries = [
          ...state.pastGroceries,
          {
            id: item.id,
            name: item.name,
            isCompleted: false,
            isDeleted: true,
          },
        ];
      }
    },
  },
});

// 4. export the action creators
export const { setGroceries, updateGroceryItem, removeGroceryItem, addGroceryItem } = groceriesSlice.actions;

// 5. export the slice reducer
export default groceriesSlice.reducer;
