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
 * Written with help from Stephen Grider's Advanced React and Redux Udemy Course
 * @module
 * header
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import NavLink from './nav_link'
import boxcharter48 from '../../public/images/boxcharter-48.png'

class Header extends Component {
  render() {

    const renderLinks = () => {
      if (this.props.auth.authenticated) {
        return [
          <NavLink linkRoute="/user-profile" linkText="User Profile" />,
          <NavLink linkRoute="/sign-out" linkText="Sign Out" />
        ]
      } else {
        return [
            <NavLink key="1" linkRoute="/sign-in" linkText="Sign In" />,
            <NavLink key="2" linkRoute="/sign-up" linkText="Sign Up" />
          ]
      }
    }

    return (
      <header className="header header-6">
        <div className="branding">
          <Link to="/" className="logo-and-title">
            <img src={boxcharter48} />
            <span className="title">BoxCharter</span>
          </Link>
        </div>
        <div className="header-nav">
          {renderLinks()}
        </div>
      </header>
    )
  }
}


function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header);