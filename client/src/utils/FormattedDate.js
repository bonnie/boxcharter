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
 * Component to take a js moment date and format it (custom or default)
 * Custom format is MMM D, [YYYY, ]h:mm a (year only displayed if it's not the current year)
 * @module
 * FormattedDate
 */

import React from 'react'
import moment from 'moment'

/**
 * Simple functional react component to format a date
 */
export default (props) => {
  let format
  if (props.format) {
    format = props.format
  } else {
    // leave off year if it's this year
    const currentYear = new Date().getFullYear().toString()
    const dateYear = moment(props.date).format('YYYY')
    const year = (dateYear === currentYear) ? '' : 'YYYY, '
    format = `MMM D, ${year}h:mm a`
  }
  const formattedDate = moment(props.date).format(format)
  return (<span className="formatted-date">{formattedDate}</span>)
}