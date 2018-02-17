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
 * sign_up
 */

import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { SIGN_UP } from '../header/tab_names'
import * as actions from '../../actions'

class SignUp extends Component {
  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null)

    // set the tab
    this.props.setActiveNavTab(SIGN_UP)
  }

  handleFormSubmit(formProps) {
    // call action creator to sign up the user
    this.props.signupUser(formProps)
  }

  generateFields() {
    const { fields } = this.props 
    const fieldElements = []   
    for (let fieldName in fields) {
      const label = fieldName[0].toUpperCase() + fieldName.slice(1)
      const field = fields[fieldName]
      const type = (fieldName.startsWith('password')) ? 'password' : 'text'
      fieldElements.push(
        <fieldset key={fieldName} className="form-group">
          <label>{label}</label>
          <input className="form-control" type={type} {...field} />
          {field.touched 
            && field.error 
            && <div className="error">{field.error}</div>}
        </fieldset>
      )
    }
    return fieldElements
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        { this.generateFields() }
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

/**
 * Validate form input
 * @param {object} formProps - form fields and values
 * @returns {object} - object with keys of invalid form fields, and values of errors for those fields
 */
const validate = (formProps) => {
  const errors = {}

  Object.keys(formProps).forEach(formProp => {
    if (!formProps[formProp]) {
      errors[formProp] = 'This field can\'t be blank'
    }
  })

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const formOptions = {
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
}
export default reduxForm(formOptions, mapStateToProps, actions)(SignUp)