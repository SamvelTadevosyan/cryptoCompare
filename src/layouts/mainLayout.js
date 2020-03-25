// @flow
import '@babel/polyfill';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { FlexBox } from 'src/styles/styled-components';

type AppProps = {};

type AppState = {};

class MainLayout extends React.PureComponent<AppProps, AppState> {
  render() {
    return (
      <FlexBox>
        CryptoCompare
      </FlexBox>
    );
  }
}

export default withRouter(connect(null, null)(MainLayout));
