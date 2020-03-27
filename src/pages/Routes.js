// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';

export const publicRoutes = () => (
  <Route path="/" component={Home} />
);
