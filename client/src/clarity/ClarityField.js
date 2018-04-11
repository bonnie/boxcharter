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

import React from 'react'

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

  // <div>
  //   <label>{label}</label>
  //   <div>
  //     <input {...input} placeholder={label} type={type} />
  //     {touched &&
  //       ((error && <span>{error}</span>) ||
  //         (warning && <span>{warning}</span>))}
  //   </div>
  // </div>
}

export default ClarityField

//  (props) => {
//   const { type, label, required, field }  = props
//   const requiredClass = required ? 'required' : ''
//   const invalidClass = field.touched && field.error ? 'invalid' : ''
//   return (
//     <fieldset key={field.name} className="form-group">
//         <label className={requiredClass}>{label}</label>
//         <label className={`tooltip tooltip-validation ${invalidClass}`}>
//           <input className="form-control" type={type} {...field} />
//           <span className="tooltip-content">{field.error}</span>
//         </label>
//     </fieldset>
//   )
// }
