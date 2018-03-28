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

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ChartRow from './ChartRow'
import { getUserCharts } from './userActions'

export class UserCharts extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // TODO: put loading message until this is finished
    if (this.props.auth && this.props.auth.user && this.props.auth.user.userId) {
      this.props.getUserCharts(this.props.auth.user.userId)
    }
  }
  render() {
    if (this.props.charts.length === 0) {
      return (
        <div data-test="no-charts-message">No charts saved</div>
      )
    }

    const chartRows = this.props.charts.map((chart) => {
      return (<ChartRow key={chart.chartId} chart={chart} />)
    })

    return (
      <div className="user-charts" data-test="user-charts-table">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody data-test='charts-container'>
            {chartRows}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps({ auth, charts }) {
  return { auth, charts }
}

export default connect(mapStateToProps, { getUserCharts })(UserCharts);