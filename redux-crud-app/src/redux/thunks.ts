import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item } from '../types';

export const fetchItems = createAsyncThunk<Item[]>('app/fetchItems', async () => {
  const response = await axios.get('/api/items');
  return response.data;
});

export const addItem = createAsyncThunk<Item, Omit<Item, 'id'>>('app/addItem', async (newItem) => {
  const response = await axios.post('/api/items', newItem);
  return response.data;
});

export const updateItem = createAsyncThunk<Item, Item>('app/updateItem', async (updatedItem) => {
  const response = await axios.put(`/api/items/${updatedItem.id}`, updatedItem);
  return response.data;
});

export const deleteItem = createAsyncThunk<number, number>('app/deleteItem', async (id) => {
  await axios.delete(`/api/items/${id}`);
  return id;
});
