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
 * Component for navbar links
 * @module
 * NavLink
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './navActions';

/**
 * Component for NavLink
 * @class NavLinkComponent
*/
export class NavLinkComponent extends Component {
  /**
   * Constructor method.
   * @method constructor
   * @param {object} props - Component props.
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  /**
   * Click handler for component.
   * @method clickHandler
   * @returns {undefined}
   */
  clickHandler() {
    this.props.setActiveNavTab(this.props.linkText);
  }

  /**
   * Render method for component.
   * @method render
   * @returns {JSX.Element} - JSX for component.
  */
  render() {
    const activeClass = (this.props.activeNavTab === this.props.linkText) ? 'active' : '';
    const classes = this.props.brand ? 'logo-and-title' : `nav-link nav-text ${activeClass}`;
    const dataId = `navlink-${this.props.brand ? 'brand' : this.props.linkText}`;

    const linkDisplay = this.props.brand
      ? this.props.linkDisplay
      : this.props.linkText;

    return (
      <Link
        className={classes}
        key="{props.key}"
        onClick={this.clickHandler}
        to={this.props.linkRoute}
        data-test={dataId}
      >
        {linkDisplay}
      </Link>
    );
  }
}

NavLinkComponent.defaultProps = {
  brand: false,
  activeNavTab: undefined,
  linkText: undefined,
  linkDisplay: undefined,
};

NavLinkComponent.propTypes = {
  linkText(props) {
    if (!props.brand && !props.linkText) {
      const errString = 'If `brand` prop is false, `linkText` is required.';
      return new Error(errString);
    }
  },
  linkDisplay(props) {
    if (props.brand && !props.linkDisplay) {
      const errString = 'If `brand` prop is true, `linkDisplay` is required.';
      return new Error(errString);
    }
  },

  linkRoute: PropTypes.string.isRequired,
  setActiveNavTab: PropTypes.func.isRequired,

  brand: PropTypes.bool,
  activeNavTab: PropTypes.string,
};

/**
 * Map state to props.
 * @function mapStateToProps
 * @param {object} state - State.
 * @param {string} state.nav - nav property of state.
 * @returns {object} - object with activeNavTab from state
 */
function mapStateToProps({ nav }) {
  return { activeNavTab: nav.activeNavTab };
}

export default connect(mapStateToProps, actions)(NavLinkComponent);
