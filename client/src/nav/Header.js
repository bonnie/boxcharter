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
 * Header component
 * @module
 * Header
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { NO_TAB, SIGN_IN, SIGN_UP, SIGN_OUT, USER_PROFILE, } from './tabNames'
import NavLink from './NavLink'
import { setActiveNavTab } from './navActions'

export class Header extends Component {
  renderLinks() {
    if (this.props.auth.authenticated) {
      return [
        <NavLink key="1" linkRoute="/user-profile" linkText={USER_PROFILE} />,
        <NavLink key="2" linkRoute="/sign-out" linkText={SIGN_OUT} />
      ]
    } else {
      return [
          <NavLink key="1" linkRoute="/sign-in" linkText={SIGN_IN} />,
          <NavLink key="2" linkRoute="/sign-up" linkText={SIGN_UP} />
        ]
    }
  }

  brandClickHandler() {
    // clear active nav tab
    this.props.setActiveNavTab('')
  }

  render() {  
    return (
      <header className="header header-5">
        <div className="branding">
          <NavLink linkRoute="/" brand={true} />
        </div>
        <div className="header-nav">
          {this.renderLinks()}
        </div>
      </header>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { setActiveNavTab })(Header);