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
import ClarityField from './ClarityField';

const label = 'Test';
const name = 'test';

describe('ClarityField', () => {
  describe('renders text field', () => {
    const props = {
      type: 'text',
      label,
      name,
      meta: { touched: false, error: '' },
      input: { name: 'fieldname' },
    };
    const wrapper = shallow(<ClarityField {...props} />);
    test('renders the field set', () => {
      expect(wrapper.find('fieldset.form-group').length).toBe(1);
    });
    test('renders the label correctly', () => {
      const labelText = findWrapperNodeByTestId(wrapper, 'field-label').text();
      expect(labelText).toBe(label);
    });
    test('contains no tooltip text', () => {
      const tooltipText = findWrapperNodeByTestId(wrapper, 'tooltip-label').text();
      expect(tooltipText).toBe('');
    });
  });
  describe('renders a required field correctly', () => {
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      required: true,
      meta: { touched: false, error: '' },
      input: { name: 'fieldname' },
    };
    const wrapper = shallow(<ClarityField {...props} />);
    test('renders the label with the correct class', () => {
      const labelNode = findWrapperNodeByTestId(wrapper, 'field-label');
      const labelHasRequiredClass = labelNode.hasClass('required');
      expect(labelHasRequiredClass).toBe(true);
    });
  });
  describe('renders an invalid field correctly', () => {
    const errorText = 'bad field';
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      required: true,
      meta: { touched: true, error: errorText },
      input: { name: 'fieldname' },
    };
    const wrapper = shallow(<ClarityField {...props} />);
    test('renders the tooltip label with the correct text', () => {
      const labelText = findWrapperNodeByTestId(wrapper, 'tooltip-label').text();
      expect(labelText).toBe(errorText);
    });
  });
  describe('prop-types', () => {
    const goodProps = {
      input: { name: 'fieldname' },
      type: '',
      label: '',
      required: true,
      meta: {
        touched: false,
        error: '',
        warning: '',
      },
    };
    test('no error for correct props', () => {
      const propTypesError = checkProps(ClarityField, goodProps);
      expect(propTypesError).toBeUndefined();
    });
  });
});
