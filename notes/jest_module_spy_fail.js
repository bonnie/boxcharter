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
import moxios from 'moxios';

import browserHistory from '../config/history';
// import { authHandler, setAuthError, signInUser, signUpUser } from './authActions'
// import { signInUser, signUpUser } from './authActions'
// import * as actions from './authActions'
// const actions = require('./authActions');
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './authActionTypes';
import { userData } from '../../../shared/test/utilities/test_data/add_user';

function mockFunctions() {
  const original = require.requireActual('./authActions');
  return {
    ...original, // Pass down all the exported objects
    authHandler: jest.fn(() => { console.log('I didnt call the original'); }),
    signInUser: () => { console.log('I will curry the original'); return jest.fn((...args) => original.signInUser(...args)); },
  };
}
jest.mock('./authActions', () => mockFunctions());
const storage = require.requireMock('./authActions');


// create a mock store for redux testing
const mockStore = configureMockStore([thunk]);

// for the nearly identical tests that sign-in / sign-up need
const signInUpTests = [
  { description: 'sign-in', actionFunc: storage.signInUser },
  // { description: 'sign-up', actionFunc: actions.signUpUser },
];

describe('authActions', () => {
  // common to all tests
  const initialStore = { authenticated: false, error: null, user: null };
  const token = 'this is a token';
  let store;
  let dispatchPromise;

  beforeEach(() => {
    localStorage.removeItem('token');
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  // end: common to all tests

  /** ************************************ */
  // START: authHandler
  /** ************************************ */
  // describe('authHandler', () => {

  //   beforeEach(() => {

  //   });

  //   test('dispatches AUTH_USER after successful authentication', () => {
  //     const expectedActions = [
  //       { type: AUTH_USER, payload: { user: userData }}
  //     ]
  //     return dispatchPromise.then(() => {
  //       const firedActions = store.getActions().map(action => ({ type: action.type, payload: action.payload }))
  //       expect(firedActions).toEqual(expectedActions);
  //     });
  //   });
  //   it('updates localStorage after successful authentication', () => {
  //     return dispatchPromise.then(() => {
  //       expect(localStorage.getItem('token')).toBe(token);
  //     });
  //   });
  //   it('redirects to `/user-profile` after successful authentication', () => {
  //     return dispatchPromise.then(() => {
  //       expect(browserHistory.push).toBeCalledWith('/user-profile')
  //     });
  //   });
  // });
  /** ************************************ */
  // END: authHandler
  /** ************************************ */

  /** ************************************ */
  // START: setAuthError
  /** ************************************ */
  // describe('unsuccessful login', () => {
  //   const message = 'bad login'
  //   const failureArgs = { email: userData.email, password: 'bad password' }

  //   beforeEach(() => {
  //     // set up moxios
  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 422,
  //         response: { message },
  //       });
  //     });

  //     // set up mock store
  //     store = mockStore(initialStore);

  //     // store the call as a promise
  //     dispatchPromise = store.dispatch(actions.signInUser(failureArgs));
  //   });
  //   test('dispatches AUTH_ERROR', () => {
  //     const expectedActions = [{
  //       type: AUTH_ERROR,
  //       payload: actions.LOGIN_ERROR,
  //     }]
  //   });
  // });
  /** ************************************ */
  // END: setAuthError
  /** ************************************ */

  /** ************************************* */
  // START: successsful signIn / signUp
  /** ************************************* */
  describe('successful sign-in / sign-up', () => {
    const successArgs = { email: userData.email, password: userData.password };
    const response = { token, user: userData };
    let authHandlerSpy;
    beforeEach(() => {
      // mock the authHandler
      // actions.authHandler = jest.fn();
      // authHandlerSpy = jest.spyOn(actions, 'authHandler');

      browserHistory.push = jest.fn();

      // spy on the authHandler
      // mockAuthHandler = jest.spyOn(actions.authHandler)
      // console.log('************ authHandler:::', actions.authHandler)

      // set up moxios
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response,
        });
      });

      // set up mock store
      store = mockStore(initialStore);
    });

    // run pretty much identical tests for sign-in and sign-up
    signInUpTests.forEach((testSpec) => {
      // console.log('************ testSpec:::', testSpec)

      const { description, actionFunc } = testSpec;
      // console.log('************ actionFunc:::', actionFunc)
      describe(`successful ${description}`, () => {
        beforeEach(() => {
          dispatchPromise = store.dispatch(actionFunc(successArgs));
          // console.log('************ dispatchPromise:::', dispatchPromise)
        });
        test('calls mock authHandler once', () => dispatchPromise.then(() => {
          // console.log(moxios)
          // expect(actions.authHandler).toHaveBeenCalledTimes(1);
          expect(storage.authHandler).toHaveBeenCalledTimes(1);
        }));
        // test('calls mock authHandler with the correct first argument', () => {
        //   return dispatchPromise.then(() => {
        //     expect(authHandler.mock.calls[0][0]).toBe(response);
        //   });
        // });
      });
    });
  });
  /** ************************************* */
  // END: successsful signIn / signUp
  /** ************************************* */

  /** ************************************* */
  // START: unsuccesssful signIn / signUp
  /** ************************************* */
  describe('unsuccessful sign-in / sign-up', () => {
    const failureArgs = { email: userData.email, password: 'bad password' };
    const response = { message: 'nope' };
    let setAuthError;
    beforeEach(() => {
      // mock setAuthError
      setAuthError = jest.fn();

      // set up moxios
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 422,
          response,
        });
      });

      // set up mock store
      store = mockStore(initialStore);
    });

    // run pretty much identical tests for sign-in and sign-up
    signInUpTests.forEach(({ description, actionFunc }) => {
      describe(`failure ${description}`, () => {
        beforeEach(() => {
          dispatchPromise = store.dispatch(actionFunc(failureArgs));
        });
        test('calls mock setAuthError once', () => {
          // return dispatchPromise.then(() => {
          //   expect(setAuthError).toHaveBeenCalledTimes(1);
          // });
        });
        test('calls mock setAuthError with the correct first argument', () => {
          // return dispatchPromise.then(() => {
          //   expect(setAuthError.mock.calls[0][0]).toBe(response);
          // });
        });
      });
    });
  });
  /** ************************************* */
  // END: unsuccesssful signIn / signUp
  /** ************************************* */


  /** ************************************* */
  // START: signOutUser
  /** ************************************* */

  /** ************************************* */
  // END: signOutUser
  /** ************************************* */
});
