import { createReducer } from '@reduxjs/toolkit';

import {
  setCurrenciesAction,
  setUpdatedCurrenciesAction,
} from '../actions/currencyActions';

const initialState = {
  items: [],
};

const currencyReducer = createReducer(initialState, {
  [setUpdatedCurrenciesAction]: (state, action) => (
    {
      ...state,
      items: state.items.map(item => item.name === action.payload.name
        ? {
          ...item,
          price: action.payload.price ? action.payload.price : item.price,
          prevPrice: action.payload.price ? item.price : item.prevPrice,
        }
        : item
      ),
    }
  ),
  [setCurrenciesAction]: (state, action) => (
    {
      ...state,
      items: action.payload,
    }
  ),
});

export default currencyReducer;
