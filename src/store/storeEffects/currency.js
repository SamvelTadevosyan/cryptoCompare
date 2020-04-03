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
      RequestService.get(`/data/pricemulti?fsyms=${currencyName.toString()}&tsyms=USD`)
        .then(res => {
          const dd = response.Data.map(currency => ({
            id: currency.CoinInfo.Id,
            name: currency.CoinInfo.Name,
            fullName: currency.CoinInfo.FullName,
            toSymbol: currency.CoinInfo.CurrencyTo,
            price: res[currency.CoinInfo.Name].USD,
          }));
          dispatch(setCurrenciesAction(dd));
        });
    })
);

export const getPrice = () => (fsym, tsyms) => (
  RequestService.get(`/data/pricemulti?fsyms=${fsym}&tsyms=${tsyms}`)
);
