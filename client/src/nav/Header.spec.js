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

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { HeaderComponent } from './Header';
import UserDropdown from './UserDropdown';

/**
 * Find the navLinks from a shallow wrapper
 * @function findNavLinks
 * @param {ShallowWrapper} wrapper - Shallow Enzyme wrapper of a header
 * @returns {Array} - Array of strings of the navLinks' linkText props
 */
const findNavLinks = wrapper =>
  findWrapperNodeByTestId(wrapper, 'header-nav')
    .findWhere(link => link.prop('linkText') !== undefined)
    .map(link => link.prop('linkText'));

describe('Header', () => {
  describe('when user is authenticated', () => {
    const header = <HeaderComponent auth={{ authenticated: true, user: { email: 'harry@potter.com' } }} />;
    const wrapper = shallow(header);
    test('renders the brand', () => {
      const navBrand = findWrapperNodeByTestId(wrapper, 'navbrand-component');
      expect(navBrand.length).toBe(1);
    });
    test('renders the tabs', () => {
      const navLinks = findNavLinks(wrapper);
      expect(navLinks).toEqual(['Charts', 'Edit']);
    });
    test('renders the user menu', () => {
      const userMenu = wrapper.find(UserDropdown);
      expect(userMenu.length).toBe(1);
    });
  });
  describe('when user is not authenticated', () => {
    const header = <HeaderComponent auth={{ authenticated: false }} />;
    const wrapper = shallow(header);
    test('renders the brand', () => {
      const navBrand = findWrapperNodeByTestId(wrapper, 'navbrand-component');
      expect(navBrand.length).toBe(1);
    });
    test('renders the tabs', () => {
      // childAt(1) is the div for the navlinks. Its children are the navlink components.
      const navLinks = findNavLinks(wrapper);
      expect(navLinks).toEqual(['Sign In', 'Sign Up']);
    });
    test('does not render the user menu', () => {
      const userMenu = wrapper.find(UserDropdown);
      expect(userMenu.length).toBe(0);
    });
  });
});
