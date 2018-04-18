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
 * Tests for user menu component for user dropdown in nav bar.
 * @module UserMenu.spec
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { checkProps } from '../../jest/utils';
import UserMenu from './UserMenu';

const defaultProps = {
  toggleState: jest.fn(),
};

describe('UserMenu', () => {
  describe('render', () => {
    const wrapper = shallow(<UserMenu {...defaultProps} />);
    test('renders component', () => {
      expect(findWrapperNodeByTestId(wrapper, 'user-menu-component').length).toBe(1);
    });
    test('renders menu items', () => {
      const menuItems = wrapper.children(Link).map(link => link.prop('data-test'));
      expect(menuItems).toEqual(['sign-out-link']);
    });
  });
  describe('onClick', () => {
    const toggleStateMock = jest.fn();
    const wrapper = shallow(<UserMenu toggleState={toggleStateMock} />);

    test('calls toggleState on click', () => {
      const firstMenuItem = wrapper.children(Link).first();
      firstMenuItem.simulate('click');
      expect(toggleStateMock.mock.calls.length).toBe(1);
    });
  });
  describe('prop-types', () => {
    test('no error for correct prop types', () => {
      const propErrors = checkProps(UserMenu, defaultProps);
      expect(propErrors).toBeUndefined();
    });
  });
});

