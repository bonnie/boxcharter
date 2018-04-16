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
 * Clarity alert component
 * @module
 * ClarityAlert
 */

// 2. stub out component for "red" part of red-green testing
// Include mapStateToProps, actions, connect, defaultProps, propTypes, constructor, render, etc.

import React, { Component } from 'react';
import PropTypes from 'prop-types';


// 7. green tests on everything else.
/**
 * @function ClarityAlert
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component.
*/
const ClarityAlert = (props) => {
  // alert class has different name from icon class for danger/error >.<
  const iconClass = props.alertType === 'danger' ? 'error' : props.alertType;

  return (
  // standard clarityUI alert HTML
    <div data-test="clarity-alert-component" className={`alert alert-${props.alertType}`}>
      <div className="alert-items">
        <div className="alert-item static">
          <div className="alert-icon-wrapper">
            <clr-icon
              class={'alert-icon ${iconClass}'}
              shape="exclamation-circle"
            />
          </div>
          <span className="alert-text">
            {props.alertText}
          </span>
        </div>
      </div>
      <button data-test="close-button" type="button" className="close" aria-label="Close" onClick={props.communicateCloseToParent}>
        <clr-icon aria-hidden="true" shape="close" />
      </button>
    </div>
  );
};

// 5. Red test on prop types, then green
ClarityAlert.propTypes = {
  communicateCloseToParent: PropTypes.func.isRequired,
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'danger',
  ]).isRequired,
};

export default ClarityAlert;
