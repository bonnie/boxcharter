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

import axios from 'axios';
import { ROOT_URL } from '../../config';

import { GET_CHART } from './chartActionTypes';

/**
 * Get chart from API server
 * @param {Number} chartId 
 */
const getChart = (chartId) => {
  if (!chartId) {
    return { type: GET_CHART };
  }
  const request = axios.get(`${ROOT_URL}/charts/${chartId}`);
  return {
    type: GET_CHART,
    payload: request,
  };
};

module.exports = {
  getChart,
};
