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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { signUpUser, setAuthError } from './authActions';
import { navActions, tabNames } from '../nav';
import { ClarityField, ClarityButton } from '../clarity';

const fields = ['email', 'password', 'passwordConfirm'];

/**
 * @class SignUpComponent
*/
export class SignUpComponent extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
  */
  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null);

    // set the tab -- in case of loading page in some way other than clicking tab
    this.props.setActiveNavTab(tabNames.SIGN_UP);
  }

  /**
   * @method handleFormSubmit
   * @param {object} formProps - Form properties.
   * @returns {undefined}
   */
  handleFormSubmit(formProps) {
    // call action creator to sign up the user
    this.props.signUpUser(formProps);
  }

  /**
   * Generate alert JSX if necessary
   * @method renderAlert
   * @returns {any} - JSX alert if there's an error message; undefined otherwise
  */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div data-test="alert" className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
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
      <form data-test="signup-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="text" label="Email" required component={ClarityField} />
        <Field name="password" type="password" label="Password" required component={ClarityField} />
        <Field name="passwordConfirm" type="password" label="Confirm Password" required component={ClarityField} />
        <ClarityButton reduxFormSubmit primary {...buttonLoading} dataTest="signup-submit" buttonText="Sign up" />
        { this.renderAlert() }
      </form>
    );
  }
}

SignUpComponent.defaultProps = {
  errorMessage: '',
};

SignUpComponent.propTypes = {
  setAuthError: PropTypes.func.isRequired,
  setActiveNavTab: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  signUpUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

/**
 * Validate form input
 * @param {object} formProps - form fields and values
 * @returns {object} - object with keys of invalid form fields,
 *                     and values of errors for those fields
 */
const validate = (formProps) => {
  const errors = {};

  fields.forEach((formProp) => {
    if (!formProps[formProp]) {
      errors[formProp] = 'This field can\'t be blank';
    }
  });

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

const formOptions = {
  form: 'signup',
  fields,
  validate,
};

/**
 * @function mapStateToProps
 * @param {object} state - Redux state.
 * @returns {object} - Object containing errorMessage from state.
 */
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    loading: state.loading.signUp,
  };
}

const actions = {
  signUpUser,
  setAuthError,
  setActiveNavTab: navActions.setActiveNavTab,
};

const SignUpForm = reduxForm(formOptions)(SignUpComponent);
export default connect(mapStateToProps, actions)(SignUpForm);
