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

import { EDIT_CHART } from '../nav/tabNames'
import { setActiveNavTab } from '../nav/navActions';
import { getChart } from './chartActions';
import ChartDetail from './ChartDetail';

/**
 * @class EditChartComponent
*/
export class EditChartComponent extends Component {

  /**
   * @method componentDidMount
  */
  componentDidMount() {
    console.log('props: ', this.props)
    const { setActiveNavTab, getChart, chartId } = this.props;
    setActiveNavTab(EDIT_CHART);

    // if we got here in a way that gave a chartId, get the chart
    if(chartId) getChart(chartId);
  }
  
  /**
   * @method render
   * @returns {JSX.Element} - Rendered component
  */
  render() {
    return (<div>
      <h1>Edit Chart</h1>
    </div>);
  }
}

EditChartComponent.propTypes = {

};

/**
 * @function mapStateToProps
 *
 * @param {object} state - Redux state.
 * @param {object} state.chart - Current chart.
 * @returns {object} - auth and charts properties of state.
 */
const mapStateToProps = ({ chart }, { urlParams }) => {
  return { chart, chartId: urlParams.chartId };
};

export default connect(mapStateToProps, { setActiveNavTab, getChart })(EditChartComponent);
