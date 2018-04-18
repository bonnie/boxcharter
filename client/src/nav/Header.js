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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SIGN_IN, SIGN_UP, SIGN_OUT, USER_CHARTS, USER_PROFILE } from './tabNames';
import NavLink from './NavLink';
import NavBrand from './NavBrand';
import UserDropdown from './UserDropdown';
import { setActiveNavTab } from './navActions';

/**
 * HeaderComponent to be connected to Redux
 * @class HeaderComponent
*/
export class HeaderComponent extends Component {
  /**
   * Render links according to auth state
   * @method renderLinks
   * @returns {array} - Array of NavLink elements
  */
  renderLinks() {
    if (this.props.auth.authenticated) {
      return [
        <NavLink key="1" linkRoute="/user-charts" linkText={USER_CHARTS} />,
        <NavLink key="2" linkRoute="/user-profile" linkText={USER_PROFILE} />,
        <NavLink key="3" linkRoute="/sign-out" linkText={SIGN_OUT} />,
        <UserDropdown key="4" username={this.props.auth.user.email} />,
      ];
    }
    return [
      <NavLink key="1" linkRoute="/sign-in" linkText={SIGN_IN} />,
      <NavLink key="2" linkRoute="/sign-up" linkText={SIGN_UP} />,
    ];
  }

  // brandClickHandler() {
  //   // clear active nav tab
  //   this.props.setActiveNavTab('')
  // }

  /**
   * Render component
   * @method render
   * @returns {JSX.Element} - JSX for component
   */
  render() {
    return (
      <header className="header header-5">
        <NavBrand data-test="navbrand-component" />
        <div className="header-nav" data-test="header-nav">
          {this.renderLinks()}
        </div>
      </header>
    );
  }
}

HeaderComponent.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.shape({
      email: PropTypes.string,
      userId: PropTypes.number,
    }),
  }).isRequired,
};

/**
 * Map state to props for redux
 * @function mapStateToProps
 * @returns {object} - object containing auth state
 */
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { setActiveNavTab })(HeaderComponent);
