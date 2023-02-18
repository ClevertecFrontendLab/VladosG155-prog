import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalLoader: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

export const { setGlobalLoader } = globalSlice.actions;

export const { reducer } = globalSlice;
