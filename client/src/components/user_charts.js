import React, { Component } from 'react'
import { connect } from 'react-redux'

import ChartRow from './chart_row'
import { getUserCharts } from '../actions'

class UserCharts extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getUserCharts(this.props.user.userId)
  }
  render() {
    const chartRows = this.props.charts.map((chart) => {
      return (<ChartRow key={chart.chartId} chart={chart} />)
    })

    return (
      <div className="user-charts">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {chartRows}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps({ user, charts }) {
  return { user, charts }
}

export default connect(mapStateToProps, { getUserCharts })(UserCharts);