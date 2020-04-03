import { connect } from 'react-redux';

import {
  getPrice,
  getCurrencies,
  setUpdatedCurrencies,
} from 'src/store/storeEffects/currency';

import Home from './Home';

const mapDispatchToProps = dispatch => ({
  getPrice: getPrice(),
  initialCurrencies: getCurrencies(dispatch),
  setUpdatedCurrencies: setUpdatedCurrencies(dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
