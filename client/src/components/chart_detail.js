import React, { Component } from 'react';
import { connect } from 'react-redux'

class ChartDetail extends Component {
  render() {
    return (
      <div className="chart-detail">
        <h1>Chart Detail</h1>
      </div>
    )
  }
}

export default connect()(ChartDetail)