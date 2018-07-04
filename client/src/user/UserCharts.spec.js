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
 * Tests for the UserCharts component
 * @module
 * UserCharts-spec
 */

import React from 'react';
import { shallow } from 'enzyme';

import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { UserChartsComponent } from './UserCharts';
import { chartData } from '../../../shared/test/utilities/test_data/add_chart';
import { ClarityLoading } from '../clarity';

const defaultProps = {
  userCharts: [],
  auth: { authenticated: true, user: { userId: 1 } },
  getUserCharts: () => {},
  setActiveNavTab: () => {},
};

describe('UserCharts', () => {
  // make three charts for the user; these would ordinarily be stored in state
  const chart = { ...chartData[0].chartMetaData, chartId: 1 };
  describe('loading', () => {
    const loading = {
      isLoading: true,
      error: null,
    };
    describe('nonzero charts in state', () => {
      const props = {
        ...defaultProps,
        userCharts: [chart],
        loading,
      };
      const wrapper = shallow(<UserChartsComponent {...props} />);
      test('do not display loading when there are charts to show', () => {
        const loadingNode = wrapper.find(ClarityLoading);
        expect(loadingNode.length).toBe(0);
      });
      test('display charts while loading', () => {
        const chartsContainer = findWrapperNodeByTestId(wrapper, 'charts-container');
        expect(chartsContainer.length).toBe(1);
      });
    });
    describe('zero charts in state', () => {
      const props = {
        ...defaultProps,
        loading,
      };
      const wrapper = shallow(<UserChartsComponent {...props} />);
      test('display loading when there are no charts and state indicates', () => {
        const loadingNode = wrapper.find(ClarityLoading);
        expect(loadingNode.length).toBe(1);
      });
      test('do not display "no charts" text while loading', () => {
        const noChartsMessage = findWrapperNodeByTestId(wrapper, 'no-charts-message');
        expect(noChartsMessage.length).toBe(0);
      });
    });
  });
  describe('non-empty charts list', () => {
    test('table should have non-zero rows', () => {
      const chartCount = 3;
      const userCharts = [];
      let newChart;
      for (let i = 0; i < chartCount; i += 1) {
        newChart = { ...chart };
        newChart.chartId = i;
        userCharts.push(newChart);
      }
      const props = { ...defaultProps, userCharts };
      const component =
        (<UserChartsComponent
          {...props}
        />);
      const wrapper = shallow(component);
      const tbody = findWrapperNodeByTestId(wrapper, 'charts-container');
      expect(tbody.children().length).toBe(chartCount);
    });
  });

  describe('empty charts list', () => {
    const component =
    (<UserChartsComponent
      {...defaultProps}
    />);
    const wrapper = shallow(component);
    const tbody = findWrapperNodeByTestId(wrapper, 'user-charts-table');
    const noChartsMessage = findWrapperNodeByTestId(wrapper, 'no-charts-message');
    test('zero rows should not render charts table', () => {
      expect(tbody.length).toBe(0);
    });
    test('zero rows should display statement about "no charts"', () => {
      expect(noChartsMessage.length).toBe(1);
    });
  });
  describe('prop-types', () => {
    test('no error with correct props', () => {
      const propTypesError = checkProps(UserChartsComponent, defaultProps);
      expect(propTypesError).toBeUndefined();
    });
  });
});
