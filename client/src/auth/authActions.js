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
 * authActions
 */

import axiosInstance from '../config/axiosInstance';
import browserHistory from '../config/history';

import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
} from './authActionTypes';

import {
  START_FETCHING,
  END_FETCHING,
} from '../loading/loadingActionTypes';


/**
 * Return an action representing an authentication error.
 * @function setAuthError
 * @param {string} error - Authentication error.
 * @returns {object} - Action representing authentication error.
 */
const setAuthError = error => ({
  type: AUTH_ERROR,
  payload: error,
});

/**
 * Handler to authenticate a user based on axios response
 *    - dispatch action
 *    - add token to localStorage
 *    - redirect user to profile page
 * @function authHandler
 * @param {object} response - Response object from axios.
 * @param {object} dispatch - Redux dispatch object.
 * @returns {undefined}
 */
const authHandler = (response, dispatch) => {
  // if request is good...
  // - update state to indicate user is authenticated
  dispatch({ type: AUTH_USER, payload: { user: response.data.user } });

  // - save the JWT in browser "local storage"
  // (available even after navigating away and coming back)
  localStorage.setItem('token', response.data.token);

  // add the response token to the authorization headers for the axios instance
  axiosInstance.defaults.headers.common.authorization = response.data.token;

  // - redirect to the route "/user-profile" (programmatic navigation)
  browserHistory.push('/user-profile');
};

/**
 * Action creator to sign in a user
 * @function signInUser
 * @param {object} formValues - Values from form.
 * @param {string} formValues.email - Value for email input.
 * @param {string} formValues.password - Value for password input.
 * @returns {function} - Function that takes dispatch, contacts the server,
 *                        and dispatches actions depending on response
 */
const signInUser = ({ email, password }) =>
  // because we have redux-thunk middleware,
  // instead of returning an object, we can return a function
  // redux-thunk gives arbitrary access to dispatch method
  (dispatch) => {
    // indicate loading start
    dispatch({ type: START_FETCHING });

    // submit email/password to api server
    return axiosInstance.post('/auth/sign-in', { email, password })
      .then((response) => {
        dispatch({ type: END_FETCHING });
        authHandler(response, dispatch);
      })
      .catch(() => {
      // if request is bad...
        dispatch({ type: END_FETCHING });

        // - Show an error to the user
        dispatch(setAuthError('Bad login info'));
      });
  };

/**
 * Action creator to sign up a user
 * @function signUpUser
 * @param {object} formValues - Values from form.
 * @param {string} formValues.email - Value for email input.
 * @param {string} formValues.password - Value for password input.
 * @returns {function} - Function that takes dispatch, contacts the server,
 *                        and dispatches actions depending on response
 */
const signUpUser = ({ email, password }) => (dispatch) => {
  // indicate loading start
  dispatch({ type: START_FETCHING });

  axiosInstance.post('/auth/sign-up', { email, password })
    .then((response) => {
      dispatch({ type: END_FETCHING });
      authHandler(response, dispatch);
    })
    .catch((error) => {
      dispatch({ type: END_FETCHING });
      dispatch(setAuthError(error.response.data.error));
    });
};

/**
 * Action creator to sign out a user.
 * @function signOutUser
 * @returns {object} - Action representing user logout.
 */
const signOutUser = () => {
  // remove token from localStorage and instance headers
  localStorage.removeItem('token');
  delete axiosInstance.defaults.headers.common.authorization;

  return { type: UNAUTH_USER };
};

module.exports = {
  signInUser,
  signUpUser,
  signOutUser,
  setAuthError,
};
