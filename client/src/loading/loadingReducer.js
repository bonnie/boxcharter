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
 * Reducer for loading state.
 * @module
 * loadingReducer
 */

import { START_FETCHING, END_FETCHING, FETCH_ERROR } from './loadingActionTypes';

export default (state = {}, action) => {
  if (!action.payload || !action.payload.fetchId) {
    return state;
  }
  const id = action.payload.fetchId;
  switch (action.type) {
    case START_FETCHING:
      return { ...state, [id]: { isLoading: true, error: null } };
    case END_FETCHING:
      return { ...state, [id]: { isLoading: false, error: null } };
    case FETCH_ERROR:
      return { ...state, [id]: { isLoading: false, error: action.payload.error } };
    default:
      return state;
  }
};

