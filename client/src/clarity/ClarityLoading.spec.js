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
 * Tests for the ClarityLoading component
 * @module
 * ClarityLoading-spec
 */


import React from 'react';
import { shallow } from 'enzyme';

import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { ClarityLoading } from './';

const loadingTarget = 'target';

describe('ClarityLoading', () => {
  const wrapper = shallow(<ClarityLoading loadingTarget={loadingTarget} />);
  test('renders component', () => {
    const motherNode = findWrapperNodeByTestId(wrapper, 'clarity-loading');
    expect(motherNode.length).toBe(1);
  });
  test('renders loading graphic', () => {
    const loadingGraphic = findWrapperNodeByTestId(wrapper, 'loading-graphic');
    expect(loadingGraphic.length).toBe(1);
  });
  test('renders correct text', () => {
    expect(wrapper.text()).toContain(loadingTarget);
  });
  test('no error with correct prop types', () => {
    const propError = checkProps(ClarityLoading, { loadingTarget });
    expect(propError).toBeUndefined();
  });
});

