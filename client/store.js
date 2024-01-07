import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './reducers/stateReducer.js';

//redux store setup
const store = configureStore({
  reducer: {
    states: stateReducer,
  },
});

export default store;
