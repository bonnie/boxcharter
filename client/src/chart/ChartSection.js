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
 * Section of a chart for BoxCharter
 * @module
 * ChartSection
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * @function ChartDetail
 * @returns {JSX.Element} - Rendered component.
 */
export const ChartSectionComponent = () =>
  (
    <div data-test="component-chart-section">
      <h1>Chart Section</h1>
    </div>
  );

export default connect()(ChartSectionComponent);
