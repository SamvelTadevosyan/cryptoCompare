// @flow

import {
  createAction,
  createReducer,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const initialState = {};

export const setDataAction = createAction(
  'data/setDataAction'
);

const reducer = createReducer(initialState, {
  [setDataAction]: (state, action) => (
    {
      ...state,
      data: action.payload,
    }
  ),
});


export const store = configureStore({
  reducer: {
    data: reducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
    thunk,
  ],
  devTools: true,
});
