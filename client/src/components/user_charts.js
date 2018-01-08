import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      return (
        <tr key={chart.chartId}>
          <td>{chart.title}</td>
          <td>{chart.createdAt.toLocaleString()}</td>
          <td>{chart.modifiedAt.toLocaleString()}</td>
        </tr>
      )
    })
    return (
      <div className="user-charts">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
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