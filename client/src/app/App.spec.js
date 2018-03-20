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
 * Tests for the App component
 *  Including integration tests for the application as a whole
 * @module
 * App-spec
 */


import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

// from https://github.com/jacek-rzrz/react-integration-tests-enzyme/blob/master/src/shopping_list/shoppingListMiddleware.test.js
import mockStore from 'redux-mock-store'
// import {shoppingListMiddleware} from "./shoppingListMiddleware";
import {appendItem, createItem, replaceItems} from './actions'
import {asyncFlush, mockApi} from '../jest/testSupport'
import {push} from 'react-router-redux'
import {locationChange} from '../utils/locationChange'
// end: from 


// from http://engineering.pivotal.io/post/react-integration-tests-with-enzyme/
const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

describe('App', () => {
  test('renders', () => {
  })
})

describe('App integration', () => {
  let wrapper
  beforeEach(async () => {
    wrapper = mount(<App />);
  })
  describe('store', () => {

  })
  describe('router', () => {

  })
})


 // import { renderComponent , expect } from '../test_helper'

// describe('App' , () => {
//   let component

//   beforeEach(() => {
//     component = renderComponent(App)
//   })

//   it('renders something', () => {
//     expect(component).to.exist
//   })
// })
