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
 * Adapted from Stephen Grider's Advanced React and Redux Udemy Course
 * @module
 * require_auth
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import browserHistory from '../config/history';


// TODO: understand HOC better.
/**
 * @function
 * @param {React.Component} ComposedComponent - Composed component.
 * @returns {JSX.Element} - Composed component.
 */
export default function (ComposedComponent) {
  /**
   * @class Authentication
  */
  class Authentication extends Component {
    /**
     * @method componentWillMount
     * @returns {undefined}
    */
    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/sign-in');
      }
    }

    /**
     * @method componentWillUpdate
     * @param {object} nextProps - Next props
     * @returns {undefined}
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/sign-in');
      }
    }

    /**
     * @method render
     * @returns {JSX.Element} - Composed component.
    */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.defaultProps = {
    authenticated: false,
  };

  Authentication.propTypes = {
    authenticated: PropTypes.bool,
  };

  Authentication.contextTypes = {
    router: PropTypes.object,
  };

  /**
   * @function mapStateToProps
   * @param {object} state - Redux state.
   * @returns {object} - Object containing "authenticated" piece of state.
   */
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
