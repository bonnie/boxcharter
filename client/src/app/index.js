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
import { Router, Route, Switch } from 'react-router-dom'
import browserHistory from './history'
import { Provider } from 'react-redux';
// TODO: figure out why the next line causes "Uncaught TypeError: Super expression must either be null or a function, not undefined"
// import { PersistGate } from 'redux-persist/integration/react'
// import { PersistGate } from 'redux-persist/lib/integration/react'
// import { PersistGate } from 'redux-persist/es/integration/react' // this one causes "Uncaught SyntaxError: Unexpected identifier"

import configureStore from './configure_store'

import App from './components/app'
import Signin from './components/auth/sign_in'
import reducers from './reducers'

import { AUTH_USER } from './actions/types'

const { store, persistor } = configureStore()

// // check for authentication before any rendering
// const token = localStorage.getItem('token')

// if (token) {
//   // update application state
//   store.dispatch({ type: AUTH_USER })
// }

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router history={browserHistory}>
        <App />
      </Router>
    {/* </PersistGate> */}
  </Provider>
  , document.querySelector('.container'));

  /* 
<BrowserRouter>
  <Switch>
    <Route path="/users/:id" component={UserDetail} />
    <Route path="/charts/:id" component={ChartDetail} />
    <Route path="/" component={SplashPage} />
  </Switch> 
</BrowserRouter>
*/

/*
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={history}>
      <Route path="/" component={App}>
        <Route path="sign-in" component={Signin} />
        <Route path="/users/:id" component={UserDetail} />
      </Route>
    </BrowserRouter>
  </Provider>
*/

