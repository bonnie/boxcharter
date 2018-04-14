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
 * Clarity button component
 * @module
 * ClarityButton
 */

import React from 'react';
import PropTypes from 'prop-types';

const ClarityButton = (props) => {
  const potentialClasses = [
    'primary',
    'sm',
    'success',
    'danger',
    'outline',
    'flat',
    'loading',
  ];
  const classes = potentialClasses
    .filter(className => props[className])
    .map(className => `btn-${className}`);

  // every button needs 'btn'
  classes.push('btn');

  const attributes = {};
  if (props.reduxFormSubmit) attributes.action = 'submit';
  if (props.disabled || props.loading) attributes.disabled = 'true';

  const loading = props.loading
    ? <span data-test="clarity-button-loading" className="spinner-spacer spinner spinner-inline" />
    : undefined;

  return (
    <button
      data-test={props.dataTest}
      className={classes.join(' ')}
      {...attributes}
    >
      {loading}
      {props.buttonText}
    </button>
  );
};

ClarityButton.defaultProps = {
  dataTest: 'clarity-button',
  reduxFormSubmit: false,
  primary: false,
  success: false,
  danger: false,
  disabled: false,
  sm: false,
  outline: false,
  flat: false,
  loading: false,
};

ClarityButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  dataTest: PropTypes.string,
  reduxFormSubmit: PropTypes.bool,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  sm: PropTypes.bool,
  outline: PropTypes.bool,
  flat: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ClarityButton;
