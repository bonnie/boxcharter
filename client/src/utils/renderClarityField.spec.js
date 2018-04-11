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
 * Tests for the renderClarityField component
 * @module
 * renderClarityField-spec
 */


import React from 'react'
import { mount } from 'enzyme'
import '../../jest/setupTests'
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils'
import renderClarityField from './renderClarityField'

const label = 'Test'
const name = 'test'

describe('renderClarityField', () => {
  describe('renders text field', () => {
    const props = {
      type: 'text',
      label,
      name,
      meta: {},
      input: {},
    }
    const wrapper = mount(renderClarityField(props))
    test('renders the field set', () => {
      expect(wrapper.find('fieldset.form-group').length).toBe(1)
    })
    test('renders the label correctly', () => {
      const labelText = findWrapperNodeByTestId(wrapper, 'field-label').text()
      expect(labelText).toBe(label)
    })
    test('contains no tooltip text', () => {
      const tooltipText = findWrapperNodeByTestId(wrapper, 'tooltip-label').text()
      expect(tooltipText).toBe('')
    })
  })
  describe('renders a required field correctly', () => {
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      required: true,
      meta: {},
      input: {},
    }
    const wrapper = mount(renderClarityField(props))
    test('renders the label with the correct class', () => {
      const label = findWrapperNodeByTestId(wrapper, 'field-label')
      const labelHasRequiredClass = label.hasClass('required')
      expect(labelHasRequiredClass).toBe(true)
    })  
  })
  describe('renders an invalid field correctly', () => {
    const errorText = 'bad field'
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      required: true,
      meta: { touched: true, error: errorText },
      input: {},
    }
    const wrapper = mount(renderClarityField(props))
    test('renders the tooltip label with the correct text', () => {
      const labelText = findWrapperNodeByTestId(wrapper, 'tooltip-label').text()
      expect(labelText).toBe(errorText)
    })  
  })
})