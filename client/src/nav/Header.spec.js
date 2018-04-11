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
 * Tests for the Header component
 * @module
 * Header-spec
 */

import React from 'react'
import { shallow } from 'enzyme'
import '../../jest/setupTests'
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils'
import { Header } from './Header'

describe('Header', () => {
  describe('when user is authenticated', () => {
    const header = <Header auth={{ authenticated: true }}/>
    const renderedHeader = shallow(header)
    test('renders the brand', () => {
      const navBrand = findWrapperNodeByTestId(renderedHeader, 'navbrand-component')
      expect(navBrand.length).toBe(1)
    })
    test('renders the tabs', () => {
      const navLinks = findWrapperNodeByTestId(renderedHeader, 'header-nav').children().map(link => link.prop('linkText'))
      expect(navLinks).toEqual(['User Profile', 'Sign Out'])
    })
  })
  describe('when user is not authenticated', () => {
    const header = <Header auth={{ authenticated: false }}/>
    const renderedHeader = shallow(header)
    test('renders the brand', () => {
      const navBrand = findWrapperNodeByTestId(renderedHeader, 'navbrand-component')
      expect(navBrand.length).toBe(1)
    })
    test('renders the tabs', () => {
      // childAt(1) is the div for the navlinks. Its children are the navlink components.
      const navLinks = findWrapperNodeByTestId(renderedHeader, 'header-nav').children().map(link => link.prop('linkText'))
      expect(navLinks).toEqual(['Sign In', 'Sign Up'])
    })  
  })
})