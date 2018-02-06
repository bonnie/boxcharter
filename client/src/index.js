import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import App from './components/app'
import Signin from './components/auth/sign_in'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="sign-in" component={Signin} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
