// @flow
import React, { PureComponent } from 'react';

import { withRouter } from 'react-router';

import { FlexBox } from 'src/styles/styled-components';

import { publicRoutes } from './Routes';

type AppProps = {};

type AppState = {};

class App extends PureComponent<AppProps, AppState> {
  render() {
    return (
      <FlexBox
        vertical
        minHeight="100vh"
        alignItems="stretch"
      >
        {publicRoutes()}
      </FlexBox>
    );
  }
}

export default withRouter(App);
