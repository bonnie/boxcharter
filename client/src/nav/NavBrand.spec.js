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
import { shallow, mount } from 'enzyme'
import '../../jest/setupTests'
import { NO_TAB, SIGN_UP } from './tabNames'
import { NAV_TAB } from './navActionTypes'
import NavBrand from './NavBrand'

describe('NavBrand', () => {
  test('renders correctly', () => {
    const renderedNav = shallow(<NavBrand />)
    expect(renderedNav).toMatchSnapshot()
  })
  // test('dispatch action upon click with the correct arg', () => {
  //   const setActiveNavTabMock = jest.fn()
  //   const renderedNav = mount(<NavBrand />)
  //   renderedNav.simulate('click')
  //   expect(setActiveNavTabMock).toHaveBeenCalledWith(NO_TAB)
  // })
})