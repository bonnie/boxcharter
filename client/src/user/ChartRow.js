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
 * Component for displaying a row in a user's charts table
 * @module
 * ChartRow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedDate } from '../utils';
import { Link } from 'react-router-dom';
import { setActiveNavTab } from '../nav/navActions';
import { tabNames } from '../nav';

/**
 * @class ChartRowComponent
*/
export class ChartRowComponent extends Component {

  /**
   * @method render
   * @returns {JSX.Element} - Rendered component.
   */
  render() {
    const { chart, setActiveNavTab } = this.props;
    return (
      <tr className="chart-row">
        <td data-test="chart-title">
          <Link to={`/charts/${chart.chartId}`} onClick={() => setActiveNavTab(tabNames.EDIT_CHART)}>
            {chart.title}
          </Link>
        </td>
        <td><FormattedDate date={chart.modifiedAt} /></td>
      </tr>
    );
  };
};

ChartRowComponent.propTypes = {
  chart: PropTypes.shape({
    title: PropTypes.string.isRequired,
    modifiedAt: PropTypes.string.isRequired,
  }).isRequired,
};

/**
 * @function mapStateToProps
 *
 * @param {object} state - Redux state.
 * @param {object} state.auth - Authentication state.
 * @param {object} ownProps - Props passed in by parent.
 * @param {object} ownProps.chart - Chart metadata passed in by parent.
 * @returns {object} - auth and charts properties of state.
 */
function mapStateToProps({ auth }, { chart }) {
  return { auth, chart };
}

export default connect(mapStateToProps, { setActiveNavTab })(ChartRowComponent);

