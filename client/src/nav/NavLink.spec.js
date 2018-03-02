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
 * Tests for the NavLink component
 * @module
 * NavLink-spec
 */

import React from 'react'
import { shallow } from 'enzyme'
import '../../jest/setupTests'
import { NO_TAB, SIGN_IN, SIGN_UP, SIGN_OUT, USER_PROFILE } from './tabNames'
import { NavLink } from './NavLink'

describe('NavLink', () => {
  const linkRoute = "/sign-in"
  const linkText = SIGN_IN
  let renderedNav
  beforeEach('render component', () => {
    // const navJSX = <NavLink linkRoute={linkRoute} linkText={linkText} />
    // renderedNav = shallow(navJSX)
  })
  test('renders correctly', () => {
    // expect(renderedNav).toMatchSnapshot()
  })
  describe('after click', () => {
    // beforeEach('click the tab', () => {
    //   renderedNav.simulate('click')
    // })
    // test('links correctly when clicked', () => {
    //   console.log('renderedNavAfterClick', renderedNav)
    // })
    // test('becomes active when clicked', () => {
    //   // expect(renderedNav).toMatchSnapshot()
    // })
    // test('becomes inactive when another tab is clicked', () => {
  
    // })
  })
})