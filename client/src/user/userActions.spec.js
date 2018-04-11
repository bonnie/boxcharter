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
 * Tests for the user actions
 * @module
 * userActions-spec
 */


import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios'

import '../../jest/setupTests'
import * as actions from './userActions'
import { GET_USERCHARTS } from './userActionTypes'
import { chartData } from '../../../shared/test/utilities/test_data/add_chart'

// massage charts data into format that would be received from server for user charts query
const charts = chartData.map(chart => chart.chartMetaData)

// create a mock store for redux testing
const mockStore = configureMockStore([thunk]);

describe('User actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  describe('getUserCharts', () => {
    test('creates GET_USERCHARTS after successfuly fetching charts', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: charts,
        });
      });

      const expectedActions = [
        // { type: actions.GET_POSTS_START }, // TODO: loading!!
        { type: GET_USERCHARTS, data: charts },
      ];

      const store = mockStore({ charts: [] })

      // use "fake" userID 1
      return store.dispatch(actions.getUserCharts(1)).then(() => {
        // return of async actions

        // TODO: why can't I test whole action, like 
        // https://github.com/reactjs/redux/issues/1972
        // https://medium.com/@netxm/test-async-redux-actions-jest-e703add2cf91
        // https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
        const firedActions = store.getActions().map(action => ({ type: action.type, data: action.payload.data }))
        expect(firedActions).toEqual(expectedActions);
      });
    });
  });
});