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
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { signUpUser, setAuthError } from './authActions'
import { navActions } from '../nav'
import { tabNames } from '../nav'
import { renderClarityField } from '../utils'

const fields = ['email', 'password', 'passwordConfirm']

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
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="text" label="Email" required={true} component={renderClarityField}/>
        <Field name="password" type="password" label="Password" required={true} component={renderClarityField}/>
        <Field name="passwordConfirm" type="password" label="Confirm Password" required={true} component={renderClarityField}/>
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

  fields.forEach(formProp => {
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
  fields,
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

const SignUpForm = reduxForm(formOptions)(SignUp)

export default connect(mapStateToProps, actions)(SignUpForm)
