// @flow
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


export const publicRoutes = () => (
  <Switch>
    <Redirect from="*" to="/" />
    <Route
      path="/"
      component={
        () => (
          <div>
            Installed
          </div>
        )
      }
    />
  </Switch>
);
