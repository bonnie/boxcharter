import React, { Component } from 'react';

import Header from '../../nav/header'
import Router from '../router'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router />
      </div>
    )
  }
}