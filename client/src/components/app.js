import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './header'
import UserDetail from './user_detail'
import ChartDetail from './chart_detail'
import SplashPage from './splash_page'
import SignIn from './auth/sign_in'


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/users/:id" component={UserDetail} />
          <Route path="/charts/:id" component={ChartDetail} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={SplashPage} />
        </Switch> 
      </div>
    )
  }
}