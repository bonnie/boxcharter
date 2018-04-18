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
 * SignOut
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ClarityAlert } from '../clarity';
import SignIn from './SignIn';
import * as actions from './authActions';

/**
 * @class SignOut
*/
export class SignOutComponent extends Component {
  /**
   * Set alert state to true by default.
   * @method constructor
   * @param {object} props - React props.
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      alertOpen: true,
    };

    this.closeAlert = this.closeAlert.bind(this);
  }

  /**
   * @method componentWillMont
   * @returns {undefined}
  */
  componentWillMount() {
    this.props.signOutUser();
  }

  /**
   * Set alertOpen state to false.
   * @method closeAlert
   * @returns {undefined}
   */
  closeAlert() {
    this.setState({ alertOpen: false });
  }


  /**
   * @method render
   * @returns {JSX.Element} - Rendered component.
  */
  render() {
    return (
      <div data-test="sign-out-component">
        { this.state.alertOpen ? <ClarityAlert
          communicateCloseToParent={this.closeAlert}
          alertType="success"
          alertText="You have been logged out."
        /> : null }
        <SignIn />
      </div>);
  }
}

SignOutComponent.propTypes = {
  signOutUser: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignOutComponent);
