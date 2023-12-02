import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './reducers/stateReducer.js';

const store = configureStore({
  reducer: {
    states: stateReducer,
  },
});

export default store;
