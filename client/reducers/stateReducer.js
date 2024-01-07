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
    //update state info on hover
    updateHover: (state, action) => {
      state.hoverState = { ...state.hoverState };
      state.hoverState = action.payload;
    },
    //update state info on select #1
    updateState1: (state, action) => {
      state.compareState1 = { ...state.compareState1 };
      state.compareState1 = action.payload;
    },
    //update state info on select #2
    updateState2: (state, action) => {
      state.compareState2 = { ...state.compareState2 };
      state.compareState2 = action.payload;
    },
  },
});

export const { updateHover, updateState1, updateState2 } = stateSlice.actions;

export default stateSlice.reducer;
