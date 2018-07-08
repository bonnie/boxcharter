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
 * Actions for the chart feature
 * @module
 * chartActions
 */

import axiosInstance from '../config/axiosInstance';

import { ROOT_URL } from '../../config';
import { GET_CHART } from './chartActionTypes';
import { START_FETCHING, END_FETCHING, FETCH_ERROR } from '../loading/loadingActionTypes';

/**
 * Get chart from chartId
 * @param {number} chartId - chart ID for which to retrieve details
 * @returns {function} - function that processes axios and dispatches an action
 */
const getChart = chartId => (dispatch) => {
  const fetchId = 'currentCharts';
  dispatch({ type: START_FETCHING, payload: { fetchId } });
  return axiosInstance.get(`/charts/${chartId}`)
    .then((response) => {
      dispatch({ type: END_FETCHING, payload: { fetchId } });
      dispatch({
        type: GET_CHART,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_ERROR, payload: { fetchId, error: 'Could not retrieve details for this chart.' } });
      console.error(error);
    });
};

module.exports = {
  getChart,
};
