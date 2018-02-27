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
import { shallow } from 'enzyme'
import '../../jest/setupTests'
import renderClarityField from './renderClarityField'

// const { input, type, label, required }  = props
// const { touched, error, warning } = props.meta

describe('renderClarityField', () => {
  test('renders a text field correctly', () => {
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      meta: {},
      input: {},
    }
    const renderedField = shallow(renderClarityField(props))
    expect(renderedField).toMatchSnapshot()
  })
  test('renders a required field correctly', () => {
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      required: true,
      meta: {},
      input: {},
    }
    const renderedField = shallow(renderClarityField(props))
    expect(renderedField).toMatchSnapshot()
  })
  test('renders an invalid field correctly', () => {
    const props = {
      type: 'text',
      label: 'Test',
      name: 'test',
      required: true,
      meta: { touched: true, error: 'bad field' },
      input: {},
    }
    const renderedField = shallow(renderClarityField(props))
    expect(renderedField).toMatchSnapshot()
  })
})