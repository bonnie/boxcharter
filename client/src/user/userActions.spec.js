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
// import axios from 'axios'

import '../../jest/setupTests'
import * as actions from './userActions'
import { GET_USERCHARTS } from './userActionTypes'
import { chartData } from '../../../shared/test/utilities/test_data/add_chart'
import { userData } from '../../../shared/test/utilities/test_data/add_user'

const charts = chartData.map(chart => chart.chartMetaData)

// var instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

// const axiosMock = new MockAdapter(instance);

const mockStore = configureMockStore([thunk]);
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe('User actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  describe('getUserCharts', () => {
    it('creates GET_USERCHARTS after successfuly fetching charts', () => {
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
        const firedActions = store.getActions().map(action => ({ type: action.type, data: action.payload.data }))
        // const firedActions = store.getActions()
        // const expectedActions = [GET_USERCHARTS]
        expect(firedActions).toEqual(expectedActions);
      });
    });
  });
});