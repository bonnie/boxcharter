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
 * React client for BoxCharter
 * @module
 * client
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// TODO: figure out why the next line causes
// "Uncaught TypeError: Super expression must either be null or a function, not undefined"
// import { PersistGate } from 'redux-persist/integration/react'
// import { PersistGate } from 'redux-persist/lib/integration/react'
// import { PersistGate } from 'redux-persist/es/integration/react'
// ^ this one causes "Uncaught SyntaxError: Unexpected identifier"

import browserHistory from './config/history';
import configureStore from './config/configureStore';
import App from './app/App';

const { store, persistor } = configureStore();

// TODO: persist state upon refresh

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <Router history={browserHistory}>
      <App />
    </Router>
    {/* </PersistGate> */}
  </Provider>
  , document.querySelector('.main-container')
);

