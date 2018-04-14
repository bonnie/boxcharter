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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signInUser, setAuthError } from './authActions';
import { navActions, tabNames } from '../nav';
import { ClarityField, ClarityButton } from '../clarity';

const fields = ['email', 'password'];

/**
 * @class SignInComponent
*/
export class SignInComponent extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
  */
  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null);

    // set the tab
    this.props.setActiveNavTab(tabNames.SIGN_IN);
  }

  /**
   * @method handleFormSubmit
   * @param {object} formFields - Form fields.
   * @param {string} formFields.email - Email field.
   * @param {string} formFields.password - Password field.
   * @returns {undefined}
   */
  handleFormSubmit({ email, password }) {
    // log user in
    this.props.signInUser({ email, password });
  }

  /**
   * Generate alert JSX if needed.
   * @method renderAlert
   * @returns {any} - Alert JSX (or undefined if no error).
  */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div data-test="alert" className="alert alert-danger">
          <div className="alert-items">
            <div className="alert-item static">
              <div className="alert-icon-wrapper">
                <clr-icon className="alert-icon" shape="exclamation-circle" />
              </div>
              <span className="alert-text">
                {this.props.errorMessage}
              </span>
            </div>
          </div>
          <button type="button" className="close" aria-label="Close">
            <clr-icon aria-hidden="true" shape="close" />
          </button>
        </div>
      );
    }
  }

  /**
   * @method render
   * @returns {JSX.Element} - Rendered component.
  */
  render() {
    const { handleSubmit, loading } = this.props;
    const buttonLoading = loading.isLoading ? { loading: true } : {};

    return (
      <div>
        <form data-test="signin-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" type="text" label="Email" required component={ClarityField} />
          <Field name="password" type="password" label="Password" required component={ClarityField} />
          <ClarityButton ReduxFormSubmit primary {...buttonLoading} dataTest="signin-submit" buttonText="Sign In" />
        </form>
        {this.renderAlert()}
      </div>
    );
  }
}

SignInComponent.defaultProps = {
  errorMessage: '',
};

SignInComponent.propTypes = {
  setAuthError: PropTypes.func.isRequired,
  setActiveNavTab: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

const formOptions = {
  form: 'signin',
  fields,
};

/**
 * @function mapStateToProps
 * @param {object} state - Redux state.
 * @returns {object} - Object containing errorMessage from state.
 */
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    loading: state.loading.signIn,
  };
}

const actions = {
  signInUser,
  setAuthError,
  setActiveNavTab: navActions.setActiveNavTab,
};

const SignInForm = reduxForm(formOptions)(SignInComponent);
export default connect(mapStateToProps, actions)(SignInForm);
