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
import { reduxForm } from 'redux-form'
import { signInUser, setAuthError } from './authActions'
import { navActions } from '../nav'
import { tabNames } from '../nav'
import { ClarityFormInput } from '../utils'

class Signin extends Component {
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
        <div className="alert alert-danger">
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
    const { handleSubmit, fields: { email, password }} = this.props;

    // const { handleSubmit, fields: { email, password } } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <ClarityFormInput type="text" label="Email" required={true} field={email}/>
          <ClarityFormInput type="password" label="Password" required={true} field={password}/>
          <button action="submit" className="btn btn-primary">
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
  fields: ['email', 'password']
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const actions = {
  signInUser, 
  setAuthError,
  setActiveNavTab: navActions.setActiveNavTab,
}

export default reduxForm(formOptions, mapStateToProps, actions)(Signin)