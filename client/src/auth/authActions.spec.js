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
import browserHistory from '../app/history'
import * as actions from './authActions'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './authActionTypes'
import { userData } from '../../../shared/test/utilities/test_data/add_user'

// create a mock store for redux testing
const mockStore = configureMockStore([thunk]);

describe('authActions', () => {

  beforeEach(function () {
    localStorage.removeItem('token');
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  describe('signInUser', () => {
    const initialStore = { authenticated: {}, error: null, user: null }
    const token = 'this is a token'
    let store
    let dispatchPromise

    describe('successful login', () => {
      const successArgs = { email: userData.email, password: userData.password }
      
      beforeEach(() => {
        // mock browserHistory.push to test routing and avoid errors due to lack of router
        // Do this before every test for a clean mock function for each test
        browserHistory.push = jest.fn()

        // set up moxios
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          // const request = moxios.requests.first();
          request.respondWith({
            status: 200,
            response: { token, user: userData },
          });
        });

        // set up mock store
        store = mockStore(initialStore);

        // store the call as a promise
        dispatchPromise = store.dispatch(actions.signInUser(successArgs))
      });

      test('dispatches AUTH_USER after successful authentication', () => {

        const expectedActions = [
          { type: AUTH_USER, payload: { user: userData }}
        ]

        return dispatchPromise.then(() => {
          const firedActions = store.getActions().map(action => ({ type: action.type, payload: action.payload }))
          expect(firedActions).toEqual(expectedActions);

        });
      });
      it('updates localStorage after successful authentication', () => {

        return dispatchPromise.then(() => {
          expect(localStorage.getItem('token')).toBe(token);
        });
      });
      it('redirects to `/user-profile` after successful authentication', () => {
        return dispatchPromise.then(() => {
          expect(browserHistory.push).toBeCalledWith('/user-profile')
        });
      });
    });
  });
});