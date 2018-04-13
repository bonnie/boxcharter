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

import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import NavBrand from './NavBrand';

describe('NavBrand', () => {
  describe('renders correctly', () => {
    const renderedNav = shallow(<NavBrand />);
    test('component includes a div with class "branding"', () => {
      expect(renderedNav.find('.branding').length).toBe(1);
    });
    describe('brand NavLink', () => {
      const navLink = renderedNav.childAt(0);
      test('has the correct link', () => {
        expect(navLink.prop('linkRoute')).toBe('/');
      });
      test('sets "brand" to true', () => {
        expect(navLink.prop('brand')).toBe(true);
      });
      describe('link display', () => {
        // linkDisplay is raw jsx; need to render it in order to test
        const linkDisplay = shallow(navLink.prop('linkDisplay'));
        test('has image', () => {
          expect(linkDisplay.find('img').length).toBe(1);
        });
        test('has brand name', () => {
          expect(linkDisplay.find('span.title').text()).toBe('BoxCharter');
        });
      });
    });
  });
});
