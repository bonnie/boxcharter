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
 * SignUp
 */

import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { signUpUser, setAuthError } from './authActions'
import { navActions } from '../nav'
import { tabNames } from '../nav'
import { ClarityFormInput } from '../utils'

class SignUp extends Component {
  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null)

    // set the tab -- in case of loading page in some way other than clicking tab
    this.props.setActiveNavTab(tabNames.SIGN_UP)
  }

  handleFormSubmit(formProps) {
    // call action creator to sign up the user
    this.props.signUpUser(formProps)
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
    const { email, password, passwordConfirm } = this.props.fields
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <ClarityFormInput type="text" label="Email" required={true} field={email}/>
        <ClarityFormInput type="password" label="Password" required={true} field={password}/>
        <ClarityFormInput type="password" label="Confirm Password" required={true} field={passwordConfirm}/>
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

const formOptions = {
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const actions = {
  signUpUser, 
  setAuthError,
  setActiveNavTab: navActions.setActiveNavTab,
}

export default reduxForm(formOptions, mapStateToProps, actions)(SignUp)