// @flow

import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import currencyReducer from './reducers/currency-reducer';

export const store = configureStore({
  reducer: {
    currencies: currencyReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
    thunk,
  ],
  devTools: true,
});
