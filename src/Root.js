import React from 'react';
import { Provider } from 'react-redux';

import { injectGlobalStyle } from 'src/styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import defaultTheme from 'src/styles/theme';
import AppProvider from 'src/pages/App';

import { store as storeRedux } from './store';

const GlobalStyle = injectGlobalStyle();

const Root = () => (
  <Provider store={storeRedux}>
    <div>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <>
            <AppProvider />
            <GlobalStyle />
          </>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  </Provider>
);

export default Root;
