import React, { Component } from 'react';
import { connect } from 'react-redux'

const SplashPage = (props) => {
  return (
    <div className="splash-page">
      <h1>Splash Page!</h1>
    </div>
  )
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps)(SplashPage)