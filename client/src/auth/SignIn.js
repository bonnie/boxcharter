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
 * SignIn
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { signInUser, setAuthError } from './authActions'
import { navActions } from '../nav'
import { tabNames } from '../nav'
import ClarityField from '../clarity/ClarityField'

const fields = ['email', 'password']

class SignIn extends Component {
  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null)

    // set the tab
    this.props.setActiveNavTab(tabNames.SIGN_IN)
  }

  handleFormSubmit({ email, password }) {
    // log user in
    this.props.signInUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div data-test="alert" className="alert alert-danger">
          <div className="alert-items">
              <div className="alert-item static">
                  <div className="alert-icon-wrapper">
                      <clr-icon className="alert-icon" shape="exclamation-circle"></clr-icon>
                  </div>
                  <span className="alert-text">
                    {this.props.errorMessage}
                  </span>
              </div>
          </div>
          <button type="button" className="close" aria-label="Close">
              <clr-icon aria-hidden="true" shape="close"></clr-icon>
          </button>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form data-test="signin-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" type="text" label="Email" required={true} component={ClarityField} />
          <Field name="password" type="password" label="Password" required={true} component={ClarityField} />
          <button data-test="signin-submit" action="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
        {this.renderAlert()}
      </div>
    )
  }
}

const formOptions = {
  form: 'signin',
  fields,
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const actions = {
  signInUser, 
  setAuthError,
  setActiveNavTab: navActions.setActiveNavTab,
}

const SignInForm = reduxForm(formOptions)(SignIn)
export default connect(mapStateToProps, actions)(SignInForm)
export { SignIn } // for unit testing