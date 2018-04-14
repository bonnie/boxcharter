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
 * Tests for the ClarityField component
 * @module
 * ClarityField-spec
 */


import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { ClarityButton } from './';

const buttonText = 'button text';

describe('ClarityButton', () => {
  describe('renders default button', () => {
    const props = {
      buttonText,
    };
    const wrapper = shallow(<ClarityButton {...props} />);
    test('renders the button', () => {
      expect(findWrapperNodeByTestId(wrapper, 'clarity-button').length).toBe(1);
    });
    test('renders button text', () => {
      expect(wrapper.text()).toBe(buttonText);
    });
    test('button is not loading', () => {
      const loadingSpan = findWrapperNodeByTestId(wrapper, 'clarity-button-loading');
      expect(loadingSpan.length).toBe(0);
    });
    test('button is not disabled', () => {
      expect(wrapper.find('button[disabled]').length).toBe(0);
    });
  });
  describe('renders button styles', () => {
    const styles = [
      'primary',
      'flat',
      'success',
      'danger',
      'outline',
      'sm',
    ];
    styles.forEach((style) => {
      test(`renders ${style} button`, () => {
        const props = { buttonText };
        props[style] = true;

        const wrapper = shallow(<ClarityButton {...props} />);
        expect(wrapper.hasClass(`btn-${style}`)).toBe(true);
      });
    });
    test('renders disabled button', () => {
      const props = {
        buttonText,
        disabled: true,
      };
      const wrapper = shallow(<ClarityButton {...props} />);
      expect(wrapper.find('button[disabled]').length).toBe(1);
    });
    test('renders submit button', () => {
      const props = {
        buttonText,
        reduxFormSubmit: true,
      };
      const wrapper = shallow(<ClarityButton {...props} />);
      expect(wrapper.find('button[action="submit"]').length).toBe(1);
    });
  });
  describe('renders loading button', () => {
    const props = {
      buttonText,
      loading: true,
    };
    const wrapper = shallow(<ClarityButton {...props} />);
    test('renders loading span', () => {
      const loadingSpan = findWrapperNodeByTestId(wrapper, 'clarity-button-loading');
      expect(loadingSpan.length).toBe(1);
    });
    test('button is disabled', () => {
      expect(wrapper.find('button[disabled]').length).toBe(1);
    });
  });
  describe('prop-types', () => {
    test('no error for correct propTypes', () => {
      const props = {
        buttonText,
      };
      const propError = checkProps(ClarityButton, props);
      expect(propError).toBeUndefined();
    });
  });
});
