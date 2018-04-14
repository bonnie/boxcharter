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

import axiosInstance from '../config/axiosInstance';
import { GET_USERCHARTS } from './userActionTypes';
import { START_FETCHING, END_FETCHING, FETCH_ERROR } from '../loading/loadingActionTypes';

/**
 * Get charts for user
 * @param {number} userId - user ID for which to retrieve charts
 * @returns {function} - function that processes axios and dispatches an action
 */
const getUserCharts = userId => (dispatch) => {
  dispatch({ type: START_FETCHING });
  axiosInstance.get(`/users/${userId}/charts`)
    .then((response) => {
      dispatch({ type: END_FETCHING });
      dispatch({
        type: GET_USERCHARTS,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_ERROR, payload: 'Could not retrieve charts for this user.' });
      console.error(error);
    });
};

module.exports = {
  getUserCharts,
};
