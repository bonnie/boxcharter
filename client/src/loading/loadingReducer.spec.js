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
 * Tests for loading state reducer.
 * @module
 * loadingReducer.spec
 */

import { START_FETCHING, END_FETCHING, FETCH_ERROR, CANCEL_ALL_LOADING } from './loadingActionTypes';
import loadingReducer from './loadingReducer';

const fetchId = 'signIn';
const error = 'not good';
const loadingState = { [fetchId]: { isLoading: true, error: null } };
const endState = { [fetchId]: { isLoading: false, error: null } };
const errorState = { [fetchId]: { isLoading: false, error } };

describe('loading reducer', () => {
  test('return empty object when no action or state provided', () => {
    const loading = loadingReducer(undefined, {});
    expect(loading).toEqual({});
  });
  test('set loading to true upon START_FETCHING action', () => {
    const payload = { fetchId };
    const loading = loadingReducer({}, { type: START_FETCHING, payload });
    expect(loading).toEqual(loadingState);
  });
  test('set loading to false upon END_FETCHING action', () => {
    const payload = { fetchId };
    const loading = loadingReducer(loadingState, { type: END_FETCHING, payload });
    expect(loading).toEqual(endState);
  });
  test('set loading to false and set error upon FETCH_ERROR action', () => {
    const payload = { fetchId, error };
    const loading = loadingReducer(loadingState, { type: FETCH_ERROR, payload });
    expect(loading).toEqual(errorState);
  });
  test('reset loading state upon CANCEL_ALL_LOADING', () => {
    const loading = loadingReducer(loadingState, { type: CANCEL_ALL_LOADING });
    expect(loading).toEqual({});
  });
});

