// @flow
import React, { PureComponent } from 'react';

import { withRouter } from 'react-router';

import { FlexBox } from 'src/styles/styled-components';

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
        Installed
      </FlexBox>
    );
  }
}

export default withRouter(App);
