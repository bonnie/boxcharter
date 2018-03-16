/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
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
 * Tests for the SignIn component
 * @module
 * SignIn-spec
 * 
 * Note: Integration test adapted from process laid out in
 * https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
 */

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import authReducer from './authReducer';
import SignInConnected, { SignIn } from './SignIn'
// import configureStore from '../app/configure_store'
// import { setupIntegrationTest } from '../../jest/clientTestUtils'

describe('SignIn', () => {
  // describe('Integration tests')
  // let store
  // let dispatchSpy
  // let router
  // beforeEach(() => {
  //   router = { params: { } };
  //   ({ store, dispatchSpy } = setupIntegrationTest({ authReducer }, router))
  // })
  test('renders', () => {
  })
})