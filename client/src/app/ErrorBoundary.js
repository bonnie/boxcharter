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
 * adapted from https://github.com/LearnersGuild/talent/blob/master/src/client/components/errorBoundary/index.jsx
 * @module
 * ErrorBoundary
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
   * @param {any} info - Additional information.
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });

    // TODO: send error back to server
    console.error(error, info);
  }

  /**
   * @method render
   * @returns {any} - Array of children components, or error component
  */
  render() {
    if (this.state.hasError) {
      return (
        <img alt="error" src="https://c1.staticflickr.com/8/7001/6509400855_aaaf915871_b.jpg" />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  children: [],
};

ErrorBoundary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
