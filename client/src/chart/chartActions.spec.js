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
 * Tests for the chart actions
 * @module
 * chartActions-spec
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import axiosInstance from '../config/axiosInstance';
import { getChart } from './chartActions';
import { GET_CHART } from './chartActionTypes';
import { chartData } from '../../../shared/test/utilities/test_data/add_chart';

const mockStore = configureMockStore([thunk]);

describe('chartActions', () => {
  beforeEach(() => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  test('adds response chart to state', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: chartData },
      });
    });

    const expectedActions = [
      // { type: actions.GET_POSTS_START }, // TODO: loading!!
      { type: 'start fetching', data: undefined },
      { type: 'end fetching', data: undefined },
      { type: GET_CHART, data: chartData },
    ];

    const store = mockStore({ currentChart: {} });

    // use "fake" chartID 1
    return store.dispatch(getChart(1)).then(() => {
      // return of async actions

      // TODO: why can't I test whole action, like
      // https://github.com/reactjs/redux/issues/1972
      // https://medium.com/@netxm/test-async-redux-actions-jest-e703add2cf91
      // https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
      const firedActions = store.getActions().map(action =>
        ({ type: action.type, data: action.payload.data }));
      expect(firedActions).toEqual(expectedActions);
    });
  });
});
