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
import { checkProps } from '../../jest/utils';
import { NO_TAB, SIGN_IN, SIGN_UP } from './tabNames';
import { NavLinkComponent } from './NavLink';

const activeLinkRoute = '/sign-in';
const inactiveLinkRoute = '/sign-up';
const activeLinkText = SIGN_IN;
const inactiveLinkText = SIGN_UP;

describe('NavLink component', () => {
  describe('active NavLink', () => {
    describe('renders correctly', () => {
      const activeNav =
        (<NavLinkComponent
          linkRoute={activeLinkRoute}
          linkText={activeLinkText}
          linkDisplay=""
          activeNavTab={activeLinkText}
          setActiveNavTab={() => {}}
        />);
      const renderedNav = shallow(activeNav);
      test('component includes a Link', () => {
        expect(renderedNav.find('Link').length).toBe(1);
      });
      test('component Link should include the correct "to" prop', () => {
        expect(renderedNav.find('Link').prop('to')).toBe(activeLinkRoute);
      });
      test('component Link should include the correct text', () => {
        // Don't think there's any way around childAt(0) here...
        expect(renderedNav.find('Link').childAt(0).text()).toBe(activeLinkText);
      });
      test('component includes active class', () => {
        expect(renderedNav.hasClass('active')).toBe(true);
      });
    });
  });

  describe('inactive NavLink', () => {
    describe('renders correctly', () => {
      let renderedNav;
      beforeEach(() => {
        const inactiveNav =
          (<NavLinkComponent
            linkRoute={inactiveLinkRoute}
            linkText={inactiveLinkText}
            activeNavTab={activeLinkText}
            setActiveNavTab={() => {}}
          />);
        renderedNav = shallow(inactiveNav);
      });
      // no need to re-test stuff that was tested with the active link
      test('component does not include active class', () => {
        expect(renderedNav.hasClass('active')).toBe(false);
      });
    });
  });

  describe('brand NavLink', () => {
    describe('renders correctly', () => {
      let renderedNav;
      const linkDisplay = <span className="linkDisplay">Brand</span>;
      beforeEach(() => {
        const brandNav =
          (<NavLinkComponent
            linkRoute="/"
            linkText={NO_TAB}
            linkDisplay={linkDisplay}
            brand
            setActiveNavTab={() => {}}
          />);
        renderedNav = shallow(brandNav);
      });
      test('component includes a Link', () => {
        expect(renderedNav.find('Link').length).toBe(1);
      });
      test('expect link html to be display prop', () => {
        // If you try to look at the renderedNav.find('Link').html(), you get this error:
        //     Invariant Violation: You should not use <Link> outside a <Router>

        const renderedLinkHtml = renderedNav.find('Link').find('.linkDisplay').html();
        const expectedLinkHtml = shallow(linkDisplay).html();
        expect(renderedLinkHtml).toBe(expectedLinkHtml);
      });
    });
    test('dispatch action upon click with the correct arg', () => {
      const setActiveNavTabMock = jest.fn();
      const brandNav =
        (<NavLinkComponent
          linkRoute="/"
          linkText={NO_TAB}
          linkDisplay={<span>Brand</span>}
          brand
          setActiveNavTab={setActiveNavTabMock}
        />);
      const renderedNav = shallow(brandNav);
      renderedNav.simulate('click');
      expect(setActiveNavTabMock).toHaveBeenCalledWith('');
    });
  });
  describe('prop-types', () => {
    test('no error for correct non-brand props', () => {
      const props = {
        linkRoute: '/route',
        linkText: 'text',
        setActiveNavTab: () => {},
      };
      const propTypesError = checkProps(NavLinkComponent, props);
      expect(propTypesError).toBeUndefined();
    });
    test('no error for correct brand props', () => {
      const props = {
        linkRoute: '/route',
        linkDisplay: <div>Display</div>,
        brand: true,
        setActiveNavTab: () => {},
      };
      const propTypesError = checkProps(NavLinkComponent, props);
      expect(propTypesError).toBeUndefined();
    });
  });
});
