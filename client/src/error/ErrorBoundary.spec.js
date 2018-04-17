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
import { shallow, mount } from 'enzyme';

import { checkProps } from '../../jest/utils';
import ErrorBoundary from './ErrorBoundary';
import SplashPage from '../app/SplashPage'; // for a child component
import Error from './Error';
import { reportErrorToBugsnag } from './bugsnagClient';

// Mock bugsnagClient.reportErrorToBugsnag
jest.mock('./bugsnagClient', () => ({
  reportErrorToBugsnag: jest.fn(),
}));

describe('ErrorBoundary', () => {
  describe('no error thrown', () => {
    test('display children', () => {
      const wrapper = shallow(<ErrorBoundary children={<SplashPage />} routeName="/" />);
      expect(wrapper.find(SplashPage)).toBeTruthy();
    });
  });
  describe('state with error thrown', () => {
    const wrapper = shallow(<ErrorBoundary routeName="/bad" />);
    wrapper.setState({ hasError: true });
    test('display Error component', () => {
      expect(wrapper.find(Error)).toBeTruthy();
    });
    test('error clears when switching routes', () => {
      wrapper.setProps({ routeName: '/good' });
      expect(wrapper.state('hasError')).toBe(false);
    });
  });
  // TODO: figure out why the following tests pass, but give this error in the virtual console:
  //     Error: Uncaught [TypeError: Cannot read property 'componentStack' of undefined]
  // describe('componentDidCatch', () => {
  //   // here, we need to have a component that actually throws an error
  //   // so that componentDidCatch will run
  //   const BadComponent = () => { throw Error('not good'); };
  //   const BoundedBadComponent = (<ErrorBoundary routeName="/bad" children={<BadComponent />} />);
  //   const wrapper = mount(BoundedBadComponent);
  //   test('state.hasError set to true', () => {
  //     expect(wrapper.state('hasError')).toBe(true);
  //   });
  //   test('error reported to bugsnag', () => {
  //     expect(reportErrorToBugsnag).toBeCalled();
  //   });
  // });
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
