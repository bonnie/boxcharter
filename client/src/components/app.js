import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserDetail from './user_detail'
import ChartDetail from './chart_detail'
import SplashPage from './splash_page'
import Header from './header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}          
      </div>
    )
  }
}


/* 
<BrowserRouter>
  <Switch>
    <Route path="/users/:id" component={UserDetail} />
    <Route path="/charts/:id" component={ChartDetail} />
    <Route path="/" component={SplashPage} />
  </Switch> 
</BrowserRouter>
*/