import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BoxcharterNavbar from '../../containers/boxcharterNavbar';
import NotFound from '../notFound';
// import ScrollToTop from '../scrollToTop';
import ProfilePage from '../../containers/profile';
import ErrorBoundary from '../errorBoundary';
import ChartsPage from '../../containers/charts';
import LandingPage from '../landingPage';
import LogoutPage from '../../containers/logoutPage';
import Loading from '../../containers/loading';

export default class App extends Component {
  render() {
    return (
      <div>
        <BoxcharterNavbar />
        <ErrorBoundary>
          <Loading>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/charts" component={ChartsPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/logout" render={LogoutPage} />
              <Route component={NotFound} />
            </Switch>
          </Loading>
        </ErrorBoundary>
      </div>
    );
  }
}