import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hoverState: {},
  compareState1: {},
  compareState2: {},
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    updateHover: (state, action) => {
      state.hoverState = { ...state.hoverState };
      state.hoverState = action.payload;
    },
    updateState1: (state, action) => {
      state.compareState1 = { ...state.compareState1 };
      state.compareState1 = action.payload;
    },
    updateState2: (state, action) => {
      state.compareState2 = { ...state.compareState2 };
      state.compareState2 = action.payload;
    },
  },
});

export const { updateHover, updateState1, updateState2 } = stateSlice.actions;

export default stateSlice.reducer;
