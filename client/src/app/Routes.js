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
 * Routes component for BoxCharter
 * @module
 * Routes
 */

import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserProfile from '../../user/user_profile'
import ChartDetail from '../../chart/chart_detail'
import SplashPage from '../../top_level/splash_page'
import SignIn from '../../auth/sign_in'
import SignOut from '../../auth/sign_out'
import SignUp from '../../auth/sign_up'
import RequireAuth from '../../auth/require_auth'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user_profile" component={RequireAuth(UserProfile)} />
        <Route path="/charts/:id" component={RequireAuth(ChartDetail)} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-out" component={SignOut} />
        <Route path="/" component={SplashPage} />
      </Switch> 
    )
  }
}
