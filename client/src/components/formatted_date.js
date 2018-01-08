import React from 'react'
import moment from 'moment'

/**
 * Simple functional react component to format a date
 */
export default (props) => {
  const format = props.format || 'MMM D, YYYY h:mm a'
  const formattedDate = moment(props.date).format(format)
  return (<span className="formatted-date">{formattedDate}</span>)
}