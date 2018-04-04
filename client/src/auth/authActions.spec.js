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
    describe('successful login', () => {
      const successArgs = { email: userData.email, password: userData.password }
      const moxiosCall = () => {
        // const request = moxios.requests.mostRecent();
        const request = moxios.requests.first();
        request.respondWith({
          status: 200,
          response: { token, user: userData },
        });
      }

      test('dispatches AUTH_USER after successful authentication', () => {

        // mock browserHistory.push to avoid error due to lack of router
        browserHistory.push = jest.fn()

        moxios.wait(moxiosCall);
        const expectedActions = [
          { type: AUTH_USER, payload: { user: userData }}
        ]
        const store = mockStore(initialStore)

        return store.dispatch(actions.signInUser(successArgs)).then(() => {
          const firedActions = store.getActions().map(action => ({ type: action.type, payload: action.payload }))
          expect(firedActions).toEqual(expectedActions);

        });
      });
      it('updates localStorage after successful authentication', () => {
        moxios.wait(moxiosCall);
        const store = mockStore(initialStore)

        return store.dispatch(actions.signInUser(successArgs)).then(() => {
          expect(localStorage.getItem('token')).toBe(token);
        });
      });
      it('redirects to `/user-profile` after successful authentication', () => {
        
      });
    });
  });
});