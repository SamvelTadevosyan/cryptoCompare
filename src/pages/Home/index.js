import { connect } from 'react-redux';

import {
  getCurrencies,
  setUpdatedCurrencies,
} from 'src/store/storeEffects/currency';

import Home from './Home';

const mapDispatchToProps = dispatch => ({
  initialCurrencies: getCurrencies(dispatch),
  setUpdatedCurrencies: setUpdatedCurrencies(dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
