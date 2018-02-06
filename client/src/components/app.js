import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

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