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
 * Tests for parent component for editing charts.
 * @module EditChart.spec
 */

import React from 'react';
import { shallow } from 'enzyme';

import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { EditChartComponent } from './EditChart';
import { chartData } from '../../../shared/test/utilities/test_data/add_chart';

const defaultProps = {
  urlParams: { id: '1' },
  currentChart: chartData,
  auth: { authenticated: true, user: { userId: 1 } },
  getChart: () => {},
};

describe('EditChart', () => {
  describe('render', () => {
    const wrapper = shallow(<EditChartComponent {...defaultProps} />);
    test('render component', () => {
      expect(findWrapperNodeByTestId(wrapper, 'component-edit-chart').length).toBe(1);
    });
  });
  describe('prop-types', () => {
    test('no error with correct props', () => {
      const propTypesError = checkProps(EditChartComponent, defaultProps);
      expect(propTypesError).toBeUndefined();
    });
  });
});
