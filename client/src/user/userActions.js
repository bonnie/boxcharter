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
 * Actions for the user feature
 * @module
 * userActions
 */

import axios from 'axios';
import { ROOT_URL } from '../../config';

import { GET_USERCHARTS } from './userActionTypes';

/**
 * Get charts for user
 * @param {number} userId - user ID for which to retrieve charts
 * @returns {function} - function that processes axios and dispatches an action
 */
const getUserCharts = userId => dispatch =>
  axios.get(`${ROOT_URL}/users/${userId}/charts`, {
    headers: { authorization: localStorage.getItem('token') },
  })
    .then((response) => {
      dispatch({
        type: GET_USERCHARTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.error(error);
    });

module.exports = {
  getUserCharts,
};
