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
 * Parent component for editing charts.
 * @module EditChart
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import ChartDetail from './ChartDetail';
import { setActiveNavTab } from '../nav/navActions'
import { EDIT_CHART } from '../nav/tabNames'
import ClarityLoading from '../clarity/ClarityLoading';
import { getChart } from './chartActions';

// model for how to display / receive data
// https://redux-form.com/7.4.2/examples/fieldarrays/
// --> spread across components...?


/**
 * @class EditChartComponent
*/
export class EditChartComponent extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.setActiveNavTab(EDIT_CHART)

    // get component details from API server
    this.props.getChart(this.props.urlParams.id);
  }

  /**
   * @method render
   * @returns {JSX.Element} - Rendered component
  */
  render() {
    if(this.props.loading) {
      return <ClarityLoading loadingTarget="chart" />
    }
    return (
    <div data-test='component-edit-chart'>
      <h1>Edit Chart</h1>
      <h2>{this.props.currentChart.title}</h2>
      
    </div>
    );
  }
}

EditChartComponent.propTypes = {
  urlParams: PropTypes.shape({
    id: PropTypes.string
  }),
};

/**
 * @function mapStateToProps
 *
 * @param {object} state - Redux state.
 * @param {object} state.auth - Authentication state.
 * @param {object} state.currentChart - Current working chart.
 * @param {object} state.loading - Whether or not the app is in a loading state.
 * @returns {object} - auth and charts properties of state.
 */
const mapStateToProps = ({ currentChart, auth, loading }) => {
  return { currentChart, auth, loading: loading['currentChart'] };
}

export default connect(mapStateToProps, { setActiveNavTab, getChart })(EditChartComponent);
