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
 * chartReducer-spec
 */

import chartReducer from './chartReducer';
import { GET_CHART } from './chartActionTypes';

describe('chartReducer', () => {
  const chart = { id: 1 };
  test('returns existing state for no action type', () => {
    const currentChart = chartReducer(chart, {});
    expect(currentChart).toEqual(chart);
  });
  test('returns chart payload object for GET_CHART action', () => {
    const currentChart = chartReducer({}, { type: GET_CHART, payload: chart });
    expect(currentChart).toEqual(chart);
  });
});
