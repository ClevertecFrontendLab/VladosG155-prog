import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const { reducer } = productSlice;
