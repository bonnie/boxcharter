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
 * ANY WARRANTY without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * adapted from https://github.com/LearnersGuild/talent/blob/master/src/client/components/errorBoundary/index.jsx
 * @module
 * ErrorBoundary
 */

import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      hasError: false,
    })
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    })

    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <img src="https://c1.staticflickr.com/8/7001/6509400855_aaaf915871_b.jpg" />
      )
    }

    return this.props.children
  }
}