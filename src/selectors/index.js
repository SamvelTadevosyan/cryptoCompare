import { useSelector } from 'react-redux';

export const getCurrencies = () => useSelector(state => state.currencies);
