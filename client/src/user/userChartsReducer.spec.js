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
 * Tests for the user reducers
 * @module
 * userChartsReducer-spec
 */

import '../../jest/setupTests'
import userChartsReducer from './userChartsReducer'
import { GET_USERCHARTS } from './userActionTypes'
import { chartData } from '../../../shared/test/utilities/test_data/add_chart'
 
// massage charts data into format that would be received from server for user charts query
const charts = chartData.map(chart => chart.chartMetaData)

describe('userChartsReducer', () => {
  const userChartsAction = {
    type: GET_USERCHARTS,
    payload: { data: { charts } },
  }
  test('return the initial state', () => {
    expect(userChartsReducer(undefined, {})).toEqual([])
  })
 
  test('handle GET_USERCHARTS when state is empty', () => {
    const reducerOutput = userChartsReducer([], userChartsAction)
    expect(reducerOutput).toEqual(charts)
   })

  test('handle GET_USERCHARTS when state is not empty', () => {
    const reducerOutput = userChartsReducer(['before'], userChartsAction)
    expect(reducerOutput).toEqual(charts)
  })
})