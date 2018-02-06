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
 * actions
 */

import axios from 'axios'
import { browserHistory } from 'react-router'
// import Chart from '../../../shared/src/model/chart'

import { 
  GET_USERCHARTS, 
  GET_CHART,
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  NO_ACTION,
} from './types'

const serverHost = 'localhost'
const serverPort = '3090'
const ROOT_URL = `http://${serverHost}:${serverPort}/api`

const signinUser = ({ email, password }) => {
  // because we have redux-thunk middleware, 
  // instead of returning an object, we can return a function
  // redux-thunk gives arbitrary access to dispatch method
  return function(dispatch) {
    // submit email/password to api server
    axios.post(`${ROOT_URL}/auth/sign-in`, { email, password })
      .then((response) => {
        // if request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER, payload: { userId: response.data.userId } })

        // - save the JWT in browser "local storage" 
        // (available even after navigating away and coming back)
        localStorage.setItem('token', response.data.token)

        // - redirect to the route "/users/{user_id}" (programmatic navigation)
        browserHistory.push(`/users/${response.data.userId}`)
      })
      .catch((error) => {
        // if request is bad...
        // - Show an error to the user
        dispatch(authError('Bad login info'))
      })
  }
}

const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
} 

const getUserCharts = (userId) => {
  return function(dispatch) {
    if (!userId) {
      // for initial load (necessary?)
      return
    }
    axios.get(`${ROOT_URL}/users/${userId}/charts`)
    .then(response => {
      dispatch({
        type: GET_USERCHARTS,
        payload: response
      })
    })
    .catch(error => {
      dispatch(authError('Bad login info'))
    })
  }
}

const getChart = (chartId) => {
  if (!chartId) {
    return { type: GET_CHART }    
  }
  const request = axios.get(`${ROOT_URL}/charts/${chartId}`)
  return {
    type: GET_CHART,
    payload: request
  }
}

module.exports = {
  signinUser,
  getUserCharts,
  getChart,
  authError,
}