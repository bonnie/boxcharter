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
 * Tests for the SignIn component
 * @module
 * signin-spec
 *
 * Note: Integration test adapted from process laid out in
 * https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
 */

import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { SignInComponent } from './SignIn';
import { ClarityButton } from '../clarity';

// for prop types requirements
const defaultProps = {
  loading: {},
  setAuthError: () => {},
  setActiveNavTab: () => {},
  signInUser: () => {},
  handleSubmit: () => {},
};

describe('SignIn', () => {
  const handleSubmitMock = jest.fn();
  describe('SignIn Component non-error rendering', () => {
    let wrapper;
    beforeEach(() => {
      handleSubmitMock.mockClear();
      const props = {
        ...defaultProps,
        handleSubmit: handleSubmitMock,
      };
      wrapper = shallow(<SignInComponent {...props} />);
    });
    test('renders a form', () => {
      expect(findWrapperNodeByTestId(wrapper, 'signin-form')).toHaveLength(1);
    });
    test('renders the correct fields', () => {
      const renderedFields = wrapper.find('Field').map(field => field.prop('name'));
      expect(renderedFields).toEqual(['email', 'password']);
    });
    test('displays no error if there is no error', () => {
      expect(findWrapperNodeByTestId(wrapper, 'alert')).toHaveLength(0);
    });
  });
  describe('SignIn Component error rendering', () => {
    test('displays an error if there is an error', () => {
      handleSubmitMock.mockClear();
      const props = {
        ...defaultProps,
        handleSubmit: handleSubmitMock,
        errorMessage: 'not good',
      };
      const wrapper = shallow(<SignInComponent {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'alert')).toHaveLength(1);
    });
  });
  describe('SignIn component functionality', () => {
    test('calls SignInUser on submit', () => {
      handleSubmitMock.mockClear();
      const props = {
        ...defaultProps,
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignInComponent {...props} />);
      const clarityButtonNode = wrapper.find(ClarityButton).dive();
      const submitButton = findWrapperNodeByTestId(clarityButtonNode, 'signin-submit');

      submitButton.simulate('click');
      expect(handleSubmitMock.mock.calls.length).toBe(1);
    });
  });
  describe('prop-types', () => {
    test('no error with correct props', () => {
      const propError = checkProps(SignInComponent, defaultProps);
      expect(propError).toBeUndefined();
    });
  });
});
