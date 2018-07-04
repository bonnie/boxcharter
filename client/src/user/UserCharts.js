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
 * Component for displaying a table of a user's charts
 * @module
 * UserCharts
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChartRow from './ChartRow';
import { getUserCharts } from './userActions';
import { setActiveNavTab } from '../nav/navActions';
import { tabNames } from '../nav';
import { ClarityLoading } from '../clarity';

/**
 * @class UserChartsComponent
*/
export class UserChartsComponent extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
  */
  componentDidMount() {
    this.props.setActiveNavTab(tabNames.USER_PROFILE);
    this.props.getUserCharts(this.props.auth.user.userId);
    this.props.setActiveNavTab(tabNames.USER_CHARTS);
  }

  /**
   * @method render
   * @returns {JSX.Element} - Rendered component.
  */
  render() {
    if (this.props.loading.isLoading && this.props.userCharts.length === 0) {
      return (
        <ClarityLoading loadingTarget="list of charts" />
      );
    }

    if (this.props.userCharts.length === 0) {
      return (
        <h1 data-test="no-charts-message">No charts saved</h1>
      );
    }

    const chartRows = this.props.userCharts.map(chart =>
      (<ChartRow key={chart.chartId} chart={chart} />));

    return (
      <div data-test="user-charts-component" className="user-charts">
        <h1>Saved Charts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody data-test="charts-container">
            {chartRows}
          </tbody>
        </table>
      </div>
    );
  }
}

UserChartsComponent.defaultProps = {
  loading: {},
};

UserChartsComponent.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.shape({
      userId: PropTypes.number,
    }),
  }).isRequired,
  userCharts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserCharts: PropTypes.func.isRequired,
  loading: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.string,
  }),
  setActiveNavTab: PropTypes.func.isRequired,
};

/**
 * @function mapStateToProps
 *
 * @param {object} state - Redux state.
 * @param {object} state.auth - Authentication state.
 * @param {object} state.charts - Metadata for charts for current user.
 * @param {object} state.loading - Whether or not the app is in a loading state.
 * @returns {object} - auth and charts properties of state.
 */
function mapStateToProps({ auth, userCharts, loading }) {
  return { auth, userCharts, loading: loading['user-charts'] };
}

export default connect(mapStateToProps, { getUserCharts, setActiveNavTab })(UserChartsComponent);
