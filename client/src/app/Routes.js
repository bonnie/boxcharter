/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Routes component for BoxCharter
 * @module
 * Routes
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserProfile from '../user/UserProfile';
import ChartDetail from '../chart/ChartDetail';
import SplashPage from '../app/SplashPage';
import SignIn from '../auth/SignIn';
import SignOut from '../auth/SignOut';
import SignUp from '../auth/SignUp';
import RequireAuth from '../auth/RequireAuth';
import ErrorBoundary from '../error/ErrorBoundary';
import NotFound from '../error/NotFound';

// TODO: jsdoc
// TODO: isolate error to the component / route / tab that threw the error
// (as it is, error persists when switching tabs)
const addErrorBoundary = (Component, route) => () => (
  <ErrorBoundary routeName={route}>
    <Component />
  </ErrorBoundary>
);

/**
 * @function Routes
 * @returns {JSX.Element} - Rendered component.
*/
const Routes = () => (
  <div className="content-container">
    <Switch>
      <Route exact path="/user-profile" render={addErrorBoundary(RequireAuth(UserProfile), 'user-profile')} />
      <Route exact path="/charts/:id" render={addErrorBoundary(RequireAuth(ChartDetail), 'chart-detail')} />
      <Route exact path="/sign-in" render={addErrorBoundary(SignIn, 'sign-in')} />
      <Route exact path="/sign-up" render={addErrorBoundary(SignUp, 'sign-up')} />
      <Route exact path="/sign-out" render={addErrorBoundary(SignOut, 'sign-out')} />
      <Route exact path="/" render={addErrorBoundary(SplashPage, 'splash-page')} />
      <Route path="/" render={addErrorBoundary(NotFound, 'not-found')} />
    </Switch>
  </div>
);

export default Routes;
