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
 * ANY WARRANTY without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Error boundary component for error handling.
 * @module ErrorBoundary
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoxCharterError from '../error/Error';

/**
 * @class ErrorBoundary
*/
export default class ErrorBoundary extends Component {
  /**
   * Constructor method to initialize hasError component state.
   * @method constructor
   * @param {object} props - Props.
   */
  constructor(props) {
    super(props);

    this.state = ({
      hasError: false,
    });
  }

  /**
   * @method componentDidCatch
   * @param {Error} error - Caught error.
   * @param {array} errorInfo - Additional information.
   * @returns {undefined}
   */
  componentDidCatch(error, errorInfo) {
    console.log('We found ourselves an error!!!!!!!!!!', error.toString());
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });

    // TODO: send error back to server
    // console.error(error, info);
  }

  /**
   * @method render
   * @returns {any} - Array of children components, or error component
  */
  render() {
    console.log('do we have an error folks???????????', this.state.hasError);
    if (this.state.hasError) {
      return <BoxCharterError error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  children: [],
};

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
