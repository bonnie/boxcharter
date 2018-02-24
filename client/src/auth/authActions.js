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

import axios from 'axios'
import browserHistory from '../app/history'
import { ROOT_URL } from '../../config'

import { 
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
} from './authActionTypes'

const authHandler = (response, dispatch) => {
  // if request is good...
  // - update state to indicate user is authenticated
  dispatch({ type: AUTH_USER, payload: { user: response.data.user } })

  // - save the JWT in browser "local storage" 
  // (available even after navigating away and coming back)
  localStorage.setItem('token', response.data.token)

  // - redirect to the route "/user-profile" (programmatic navigation)
  browserHistory.push(`/user-profile`)
}

const signInUser = ({ email, password }) => {
  // because we have redux-thunk middleware, 
  // instead of returning an object, we can return a function
  // redux-thunk gives arbitrary access to dispatch method
  return function(dispatch) {
    // submit email/password to api server
    axios.post(`${ROOT_URL}/auth/sign-in`, { email, password })
      .then((response) => authHandler(response, dispatch))
      .catch((error) => {
        // if request is bad...
        // - Show an error to the user
        dispatch(setAuthError('Bad login info'))
      })
  }
}

const signUpUser = ({ email, password }) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/auth/sign-up`, { email, password })
      .then((response) => authHandler(response, dispatch))
      .catch((response) => dispatch(setAuthError(response.data.error)))
  }
}

/**
 * 
 */
const signOutUser = () => {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

const setAuthError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
} 

module.exports = {
  signInUser,
  signUpUser,
  signOutUser,
  setAuthError,
}