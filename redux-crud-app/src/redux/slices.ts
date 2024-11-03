import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Item } from '../types';
import { fetchItems, addItem, updateItem, deleteItem } from './thunks';

const initialState: AppState = {
  items: [],
  theme: 'light',
  status: 'idle',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.items = action.payload;
        state.status = 'idle';
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
