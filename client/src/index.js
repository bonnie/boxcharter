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

import UserDetail from './components/user_detail'
import ChartDetail from './components/chart_detail'
import SplashPage from './components/splash_page'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="sign-in" component={Signin} />
        <Route path="/users/:id" component={UserDetail} />
      </Route>
    </Router>
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