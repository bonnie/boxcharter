import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCharts from './user_charts'

class UserPage extends Component {
  render() {
    return (
      <div className="user-page">
        <h3>Charts</h3>
        <UserCharts />
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(UserPage);