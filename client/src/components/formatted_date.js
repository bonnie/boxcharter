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
    const year = (dateYear === currentYear) ? '' : 'YYYY '
    format = `MMM D, ${year}h:mm a`
  }
  const formattedDate = moment(props.date).format(format)
  return (<span className="formatted-date">{formattedDate}</span>)
}