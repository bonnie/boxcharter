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
 * Tests for the ClarityAlert component
 * @module
 * ClarityAlert-spec
 */

// 1. outline tests
// basic render test, using standard component testID

// props tests: how does it render based on certain props?

// internal state tests (no redux state tests here -- leave for reducer or integration tests)

// functionality test: component unmounts when close button clicked

// propTypes test (determine needed props here)

// 3. Write failing tests

import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { checkProps } from '../../jest/utils';
import ClarityAlert from './ClarityAlert';

const alertText = 'alert text';
const alertType = 'danger';
const defaultProps = {
  communicateCloseToParent: () => {},
  alertText,
  alertType,
};

describe('ClarityAlert', () => {
  describe('renders', () => {
    const wrapper = shallow(<ClarityAlert {...defaultProps} />);
    test('basic render', () => {
      const alertComponent = findWrapperNodeByTestId(wrapper, 'clarity-alert-component');
      expect(alertComponent.length).toBe(1);
    });
    test('renders alert text', () => {
      expect(wrapper.text()).toBe(alertText);
    });
    test('applies correct class', () => {
      expect(wrapper.hasClass(`alert-${alertType}`)).toBe(true);
    });
  });
  describe('close button', () => {
    const communicateCloseToParentMock = jest.fn();
    const props = { ...defaultProps, communicateCloseToParent: communicateCloseToParentMock };
    const wrapper = shallow(<ClarityAlert {...props} />);
    const closeButton = findWrapperNodeByTestId(wrapper, 'close-button');
    test('renders', () => {
      expect(closeButton.length).toBe(1);
    });
    test('calls `communicateCloseToParent`', () => {
      closeButton.simulate('click');
      expect(communicateCloseToParentMock.mock.calls.length).toBe(1);
    });
  });
  describe('prop-types', () => {
    test('no error on correct prop types', () => {
      const propError = checkProps(ClarityAlert, defaultProps);
      expect(propError).toBeUndefined();
    });
  });
});

// 4. Make a note of where integration tests are necessary:

// TODO in integration tests: test that communicateCloseToParent actually
// causes parent to unmount component
