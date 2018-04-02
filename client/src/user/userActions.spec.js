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

// adapted from https://medium.com/the-andela-way/async-actions-and-tests-with-redux-promise-middleware-3b6bda8aa83d

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from './userActions';
import { GET_USERCHARTS } from './userActionTypes';
// import instance from '../config/axiosConfig'

import { chartData } from '../../../shared/test/utilities/test_data/add_chart';
import { userData } from '../../../shared/test/utilities/test_data/add_user';

describe('userActions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('getUserCharts', () => {
    const charts = [chartData[0].chartMetaData]
    it('it dispatches GET_USERCHARTS', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: charts,
        });
      });
      const expectedActions = [GET_USERCHARTS];

      // configure Mock store
      const store = mockStore({ charts });
      
      // call the getUserCharts async action creator
      return store.dispatch(actions.getUserCharts(1)).then(() => {
        
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        
        expect(actionTypes).toEqual(expectedActions);
      });
    });   
  });
});
