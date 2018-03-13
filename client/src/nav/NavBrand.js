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
 * NavBrand component
 * @module
 * NavBrand
 */

import React from 'react'
import { NO_TAB } from './tabNames'
import NavLink from './NavLink'


// brand is just a NavLink with some hard coded properties
export default (props) => {
  const linkDisplay = (
    <span>
      <img src='/public/images/boxcharter-48.png' />
      <span className="title">BoxCharter</span>
    </span>
  )
  return (
    <div className="branding">
      <NavLink linkRoute="/" linkText={NO_TAB} linkDisplay={linkDisplay} brand={true} />
    </div>
  )
}