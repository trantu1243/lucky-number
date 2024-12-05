import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  screen: 'Dashboard',
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
  },
});

export const {setScreen} = tabSlice.actions;
