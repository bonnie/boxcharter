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
 * Clarity form input component
 * @module
 * ClarityField
 */

import React from 'react';
import PropTypes from 'prop-types';

// Note: this needs to be invoked as the component for a redux-form Field component
const ClarityField = (props) => {
  const { input, type, label, required }  = props
  const { touched, error, warning } = props.meta

  const requiredClass = required ? 'required' : ''
  const invalidClass = touched && error ? 'invalid' : ''
  return (
    <fieldset key={input.name} className="form-group">
        <label className={requiredClass} data-test="field-label">{label}</label>
        <label className={`tooltip tooltip-validation ${invalidClass}`} data-test="tooltip-label">
          <input className="form-control" type={type} {...input} />
          <span className="tooltip-content">{error}</span>
        </label>
    </fieldset>
  )
}

ClarityField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

export default ClarityField
