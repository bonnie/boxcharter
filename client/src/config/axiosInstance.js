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
 * Configure an axios instance to be used across all action creators.
 * @module
 * axiosInstance
 */

import axios from 'axios';
import { ROOT_URL } from '../../config';

export default axios.create({
  baseURL: ROOT_URL,
  timeout: 1000,
});

/**
 * Set authentication header for given Axios instance.
 * @function setAuthHeader
 * @param {object} instance - Axios instance.
 * @param {string} token - Authentication token.
 * @returns {undefined}
 */
export const setAuthHeader = (instance, token) => {
  // instance.defaults.headers.common.authorization = token;
};

/**
 * Remove authentication header for given Axios instance.
 * @function removeAuthHeader
 * @param {object} instance - Axios instance.
 * @returns {undefined}
 */
export const removeAuthHeader = (instance) => {
  // delete instance.defaults.headers.common.authorization;
};
