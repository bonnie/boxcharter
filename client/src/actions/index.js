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
// import Chart from '../../../shared/src/model/chart'

import { 
  GET_USERCHARTS, 
  GET_CHART,
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
      .then()


    // if request is good...
    // - update state to indicate user is authenticated
    // - save the JWT token
    // - redirect to the route "/users/{user_id}"
    
    // if request is bad...
    // - Show an error to the user
    
  }
}

const getUserCharts = (userId) => {
  if (!userId) {
    return { type: GET_USERCHARTS }
  }
  const request = axios.get(`${ROOT_URL}/users/${userId}/charts`)
  return {
    type: GET_USERCHARTS,
    payload: request
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
}