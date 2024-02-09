import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './reducers/stateReducer';

//redux store setup
export const store = configureStore({
  reducer: {
    states: stateReducer,
  },
});
