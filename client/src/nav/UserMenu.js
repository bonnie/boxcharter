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
 * Menu for User dropdown component for nav bar
 * (uses Clarity UI styling)
 * @module UserMenu
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// TODO: close dropdown on blur (it's not as easy as you'd think!!)
/**
 * Functional React component for UserDropdown menu.
 * @function UserMenu
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered element.
 */
const UserMenu = props => (
  <clr-dropdown-menu data-test="user-menu-component" clrPosition="bottom-right" class="dropdown-menu">
    <Link data-test="sign-out-link" onClick={props.toggleState} to="/sign-out" className="dropdown-item">Log out</Link>
  </clr-dropdown-menu>
);

UserMenu.propTypes = {
  toggleState: PropTypes.func.isRequired,
};

export default UserMenu;
