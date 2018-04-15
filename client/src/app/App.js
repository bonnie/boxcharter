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
 * Main component for BoxCharter
 * @module
 * App
 */

import React, { Component } from 'react';

import Header from '../nav/Header';
import Routes from './Routes';
import ErrorBoundary from '../error/ErrorBoundary';
import axiosInstance from '../config/axiosInstance';
// import { clearLoadingEvents } from '../loading/loadingActions';

/**
 * @class AppComponent
 */
export default class App extends Component {
  /**
   * Initialize axios auth header and reset loading states.
   * @method constructor
   * @param {object} props - Props.
   * @returns {undefined}
  */
  constructor(props) {
    super(props);

    // restore axios header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common.authorization = token;
    }
  }

  /**
   * @method render
   * @returns {JSX.Element} - Rendered component.
  */
  render() {
    return (
      <div className="full-page">
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <Routes />
      </div>
    );
  }
}

