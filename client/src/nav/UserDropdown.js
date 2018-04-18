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
 * User dropdown component for nav bar
 * (uses Clarity UI styling)
 * @module UserDropdown
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @class UserDropdown
*/
export default class UserDropdown extends Component {
  /**
   * @method constructor
   * @param {object} props - React props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleState = this.toggleState.bind(this);
    this.displayDropdown = this.displayDropdown.bind(this);
  }

  /**
   * Toggle state indicating whether dropdown is open
   * @method toggleState
   * @returns {undefined}
   */
  toggleState() {
    this.setState({
      open: !this.state.open,
    });
  }


  // TODO: close dropdown on blur (it's not as easy as you'd think!!)
  /**
   * Conditionally display dropdown depending on state
   * @method displayDropdown
   * @returns {JSX.Element} - Dropdown items (or null), if state is closed)
  */
  displayDropdown() {
    if (this.state.open) {
      return (
        <clr-dropdown-menu clrPosition="bottom-right" class="dropdown-menu">
          <Link onClick={this.toggleState} to="/user-profile" className="dropdown-item">Profile</Link>
          <Link onClick={this.toggleState} to="/sign-out" className="dropdown-item">Log out</Link>
        </clr-dropdown-menu>
      );
    }
    return null;
  }

  /**
   * @method render
   * @returns {JSX.Element} - Rendered component (or null if username isn't defined).
  */
  render() {
    const activeClass = this.state.open ? 'active' : '';
    const openClass = this.state.open ? 'open' : '';
    return (
      <div data-test="user-dropdown-component" className="header-actions">
        <clr-dropdown class={`dropdown ${openClass}`}>
          <button className={`nav-text dropdown-toggle ${activeClass}`} onClick={this.toggleState}>
            { this.props.username }
            <clr-icon shape="caret down" />
          </button>
          { this.displayDropdown() }
        </clr-dropdown>
      </div>
    );
  }
}

UserDropdown.defaultProps = {
  username: 'User',
};

UserDropdown.propTypes = {
  username: PropTypes.string,
};
