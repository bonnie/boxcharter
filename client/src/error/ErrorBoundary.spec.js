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
 * Tests for the ErrorBoundary component
 * @module
 * ErrorBoundary-spec
 */

import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import { checkProps } from '../../jest/utils';
import ErrorBoundary from './ErrorBoundary';
import SplashPage from '../app/SplashPage'; // for a child component
import Error from './Error';


describe('ErrorBoundary', () => {
  describe('no error thrown', () => {
    test('display children', () => {
      const wrapper = shallow(<ErrorBoundary children={<SplashPage />} route="/" />);
      expect(wrapper.find(SplashPage)).toBeTruthy();
    });
  });
  describe('error thrown', () => {
    const wrapper = shallow(<ErrorBoundary routeName="/bad" />);
    wrapper.setState({ hasError: true });
    test('display Error component', () => {
      expect(wrapper.find(Error)).toBeTruthy();
    });
    test('send error to server', () => {
      // TODO: set up mock to check that function is called
    });
    test('error clears when switching routes', () => {
      wrapper.setProps({ routeName: '/good' });
      expect(wrapper.state('hasError')).toBe(false);
    });
  });
  describe('prop-types', () => {
    test('no error with correct prop-types', () => {
      const props = {
        routeName: 'route',
        children: <SplashPage />,
      };
      const propsError = checkProps(ErrorBoundary, props);
      expect(propsError).toBe(undefined);
    });
  });
});
