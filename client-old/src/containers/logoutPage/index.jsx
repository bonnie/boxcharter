import React, { Component } from 'react';
import { connect } from 'react-redux';

class LogoutPage extends Component {
  render() {
    return (
      <div>
       Some logout message here, plus a way to log back out
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(LogoutPage);