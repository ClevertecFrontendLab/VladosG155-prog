import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalLoader: false,
  user: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = globalSlice.actions;

export const { reducer } = globalSlice;
