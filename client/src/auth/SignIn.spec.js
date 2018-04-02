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
 * SignIn-spec
 * 
 * Note: Integration test adapted from process laid out in
 * https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
 */

import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { SignIn } from './SignIn'

describe('SignIn', () => {
  describe('SignIn Component rendering', () => {
    const handleSubmitMock = jest.fn();
    test('renders a form', () => {
      const props = {
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignIn {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'signin-form').length).toBe(1);
    });
    test('displays no error if there is no error', () => {
      const props = {
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignIn {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'alert').length).toBe(0);
    });
    test('displays an error if there is an error', () => {
      const props = {
        handleSubmit: handleSubmitMock,
        errorMessage: 'not good',
      };
      const wrapper = shallow(<SignIn {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'alert').length).toBe(1);
    });
  });
  describe('SignIn component functionality', () => {
    test('calls SignInUser on submit', () => {
      const handleSubmitMock = jest.fn();
      const props = {
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignIn {...props} />);
      const submitButton = findWrapperNodeByTestId(wrapper, 'signin-submit');

      submitButton.simulate('click')
      expect(handleSubmitMock.mock.calls.length).toBe(1)
    });
  });
});