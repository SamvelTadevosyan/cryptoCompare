// @flow

import RequestService from 'src/services/RequestService';
import { currencyName } from 'src/constants/currencies';

import {
  setCurrenciesAction,
  setUpdatedCurrenciesAction,
} from '../actions/currencyActions';

export const setUpdatedCurrencies = dispatch => (data: Object) => {
  dispatch(setUpdatedCurrenciesAction({
    name: data.FROMSYMBOL,
    price: data.PRICE,
  }));
};

export const getCurrencies = dispatch => () => (
  RequestService.get(`/data/coin/generalinfo?fsyms=${currencyName.toString()}&tsym=USD`)
    .then(response => {
      const dd = response.Data.map(currency => ({
        id: currency.CoinInfo.Id,
        name: currency.CoinInfo.Name,
        fullName: currency.CoinInfo.FullName,
        toSymbol: currency.CoinInfo.CurrencyTo,
        price: null,
      }));

      dispatch(setCurrenciesAction(dd));
    })
);
