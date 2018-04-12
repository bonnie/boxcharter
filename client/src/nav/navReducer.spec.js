/*
 * Copyright (c) 2018 Bonnie Schulkin. All Rights Reserved.
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
 * Tests for the chart reducers
 * @module
 * navReducer-spec
 */

import navReducer from './navReducer';
import { NAV_TAB } from './navActionTypes';
import { SIGN_UP } from './tabNames';

describe('navReducer', () => {
  test('return empty object for undefined initial state', () => {
    expect(navReducer(undefined, {})).toEqual({});
  });
  test('handle NAV_TAB action', () => {
    const action = {
      type: NAV_TAB,
      payload: SIGN_UP,
    };
    const expectedResult = { activeNavTab: SIGN_UP };
    const result = navReducer({}, action);
    expect(result).toMatchObject(expectedResult);
  });
});
