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
 * Actions for loading state.
 * @module
 * loadingActions
 */

import { INITIATE_LOADING, COMPLETE_LOADING } from './loadingActionTypes';

/**
 * @function initiateLoading
 * @returns {object} - Action with type INITIATE_LOADING.
*/
export const initiateLoading = () => ({ type: INITIATE_LOADING });

/**
 * @function completeLoading
 * @returns {object} - Action with type COMPLETE_LOADING.
*/
export const completeLoading = () => ({ type: COMPLETE_LOADING });
