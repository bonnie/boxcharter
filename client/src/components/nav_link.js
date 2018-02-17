import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'

class NavLink extends Component {
  render() {
    const activeClass = (this.props.activeNavTab === this.props.linkText) ? 'active' : ''
    return (
      <Link 
        className={`nav-link nav-text ${activeClass}`}
        key="{props.key}"
        onClick={this.clickHandler}
        to={this.props.linkRoute}
      >
        {this.props.linkText}
      </Link>
    ) 
  }
}

function mapStateToProps({nav}) {
  return { activeNavTab: nav.activeNavTab }
}

export default connect(mapStateToProps, actions)(NavLink);