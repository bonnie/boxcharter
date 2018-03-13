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
 * Component for navbar links
 * @module
 * NavLink
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from './navActions'

export class NavLink extends Component {
  clickHandler() {
    this.props.setActiveNavTab(this.props.linkText)
  }
  render() {
    const activeClass = (this.props.activeNavTab === this.props.linkText) ? 'active' : ''
    const classes = this.props.brand ? 'logo-and-title' : `nav-link nav-text ${activeClass}`

    const linkDisplay = this.props.brand 
      ? this.props.linkDisplay
      : this.props.linkText

    return (
      <Link 
        className={classes}
        key="{props.key}"
        onClick={this.clickHandler.bind(this)}
        to={this.props.linkRoute}
      >
        {linkDisplay}
      </Link>
    ) 
  }
}

function mapStateToProps({nav}) {
  return { activeNavTab: nav.activeNavTab }
}

export default connect(mapStateToProps, actions)(NavLink)