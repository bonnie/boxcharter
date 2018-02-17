import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './header'
import UserProfile from './user_profile'
import ChartDetail from './chart_detail'
import SplashPage from './splash_page'
import SignIn from './auth/sign_in'
import SignOut from './auth/sign_out'
import SignUp from './auth/sign_up'
import RequireAuth from './auth/require_auth'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content-container">
          <Switch>
            <Route path="/user-profile" component={RequireAuth(UserProfile)} />
            <Route path="/charts/:id" component={RequireAuth(ChartDetail)} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-out" component={SignOut} />
            <Route path="/" component={SplashPage} />
          </Switch> 
        </div>
      </div>
    )
  }
}