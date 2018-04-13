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
 * Tests for the auth reducers
 * @module
 * authReducers-spec
 */


import '../../jest/setupTests';
import authReducer from './authReducer';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './authActionTypes';
import { userData } from '../../../shared/test/utilities/test_data/add_user';

describe('authReducer', () => {
  const errString = 'not looking good';
  const actions = {
    authUser: {
      type: AUTH_USER,
      payload: { user: userData },
    },
    unAuthUser: {
      type: UNAUTH_USER,
    },
    authError: {
      type: AUTH_ERROR,
      payload: errString,
    },

  };
  test('return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({});
  });

  test('handle AUTH_USER when state is empty', () => {
    const reducerOutput = authReducer({}, actions.authUser);
    expect(reducerOutput).toEqual({ user: userData, authenticated: true, error: null });
  });

  test('handle UNAUTH_USER with empty state', () => {
    const reducerOutput = authReducer({}, actions.unAuthUser);
    expect(reducerOutput).toEqual({ authenticated: false, user: null });
  });

  describe('handle UNAUTH_USER with authenticated state', () => {
    const authenticatedState = { user: userData, authenticated: true, error: null };
    const reducerOutput = authReducer(authenticatedState, actions.unAuthUser);
    test('authenticated state is false', () => {
      expect(reducerOutput.authenticated).toEqual(false);
    });
    test('user state is null', () => {
      expect(reducerOutput.user).toBeNull();
    });
    test('error state is falsy', () => {
      expect(reducerOutput.error).toBeFalsy();
    });
  });

  test('handle error', () => {
    const reducerOutput = authReducer({}, actions.authError);
    expect(reducerOutput).toEqual({ error: errString });
  });
});
