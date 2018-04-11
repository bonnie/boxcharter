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
 * Tests for the ChartRow component
 * @module
 * ChartRow-spec
 */

import React from 'react'

import '../../jest/setupTests'
import { shallow } from 'enzyme'
import { checkProps, generateRequiredError } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils'
import ChartRow from './ChartRow'
import { chartData } from '../../../shared/test/utilities/test_data/add_chart'

// TODO: enhance tests as component grows

// required chart properties
const requiredChartProps = [
  'title',
  'modifiedAt',
];

describe('ChartRow', () => {
  let wrapper

  // the ChartRow only receives the metadata in props
  const chart = chartData[0].chartMetaData 
  
  beforeEach(() => {
    wrapper = shallow(<ChartRow chart={chart} />)
  })
  describe('render', () => {
    test('renders the correct number of cells', () => {
      expect(wrapper.find('td').length).toBe(2)
    })
    test('renders the chart title', () => {
      const foundTitle = findWrapperNodeByTestId(wrapper, 'chart-title').text()    
      expect(foundTitle).toBe(chart.title)
    })
  });
  describe('prop-types', () => {
    test('no error for correct props', () => {
      const propTypesError = checkProps(ChartRow, { chart });
      expect(propTypesError).toBeFalsy();
    });
    test('error when chart is not included', () => {
      const propTypesError = checkProps(ChartRow, {});
      expect(propTypesError).toBe(generateRequiredError('chart', ChartRow));
    });
    describe('error when chart does not have the correct shape', () => {
      requiredChartProps.forEach(propName => {
        const missingChart = { ...chart }
        delete missingChart[propName]
        const propTypesError = checkProps(ChartRow, { chart: missingChart });
        test(`error when chart does not contain ${propName}`, () => {
          expect(propTypesError).toBe(generateRequiredError(`chart.${propName}`, ChartRow))
        });
      });
    });
  });
});
