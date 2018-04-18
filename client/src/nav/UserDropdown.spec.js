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
 * Tests for user dropdown component for nav bar.
 * @module UserDropdown.spec
 */

import React from 'react';
import { shallow } from 'enzyme';

import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import UserDropdown from './UserDropdown';
import UserMenu from './UserMenu';

const email = 'harry@potter.com';

describe('UserDropdown', () => {
  describe('renders', () => {
    const wrapper = shallow(<UserDropdown username={email} />);
    test('renders expected component', () => {
      expect(findWrapperNodeByTestId(wrapper, 'user-dropdown-component').length).toBe(1);
    });
    test('renders username text', () => {
      expect(wrapper.text()).toBe(email);
    });
  });
  describe('state', () => {
    const wrapper = shallow(<UserDropdown username={email} />);
    describe('closed state', () => {
      beforeEach(() => {
        wrapper.setState({ open: false });
      });
      test('changes state to open when clicked', () => {
        findWrapperNodeByTestId(wrapper, 'user-dropdown-button').simulate('click');
        expect(wrapper.state('open')).toBe(true);
      });
      test('does not render menu when closed', () => {
        expect(wrapper.find(UserMenu).length).toBe(0);
      });
    });
    describe('open state', () => {
      const wrapper = shallow(<UserDropdown username={email} />);
      beforeEach(() => {
        wrapper.setState({ open: true });
      });
      test('renders menu when open', () => {
        expect(wrapper.find(UserMenu).length).toBe(1);
      });
      test('changes state to closed when clicked', () => {
        findWrapperNodeByTestId(wrapper, 'user-dropdown-button').simulate('click');
        expect(wrapper.state('open')).toBe(false);
      });
    });
  });
});

