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
 * Tests for the auth actions
 * @module
 * authActions-spec
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios'

import '../../jest/setupTests'
import * as actions from './authActions'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './authActionTypes'
import { userData } from '../../../shared/test/utilities/test_data/add_user'

// create a mock store for redux testing
const mockStore = configureMockStore([thunk]);

describe('authActions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  describe('signInUser', () => {
    describe('successful login', () => {
      const successArgs = { email: userData.email, password: userData.password }
      const moxiosCall = () => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { user: userData },
        });
      }

      test('dispatches AUTH_USER after successful authentication', () => {
        moxios.wait(moxiosCall);
        const expectedActions = { type: AUTH_USER, payload: { user: userData }}
        const store = mockStore()


        return store.dispatch(actions.signInUser(successArgs)).then(() => {
          const firedActions = store.getActions().map(action => ({ type: action.type, data: action.payload.data }))
          expect(firedActions).toEqual(expectedActions);

        });
      });
      it('updates localStorage after successful authentication', () => {

      });
      it('redirects to `/user-profile` after successful authentication', () => {

      });
    });
  });
});
  //     const expectedActions = [
  //       // { type: actions.GET_POSTS_START }, // TODO: loading!!
  //       { type: GET_USERCHARTS, data: charts },
  //     ];

  //     const store = mockStore({ charts: [] })

  //     // use "fake" userID 1
  //     return store.dispatch(actions.getUserCharts(1)).then(() => {
  //       // return of async actions

  //       // TODO: why can't I test whole action, like 
  //       // https://github.com/reactjs/redux/issues/1972
  //       // https://medium.com/@netxm/test-async-redux-actions-jest-e703add2cf91
  //       const firedActions = store.getActions().map(action => ({ type: action.type, data: action.payload.data }))
  //       expect(firedActions).toEqual(expectedActions);
  //     });
  //   });
  // });
