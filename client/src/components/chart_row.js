import React from 'react'
import FormattedDate from './formatted_date'

export default ({ chart }) => {
  return (
    <tr className="chart-row">
      <td>{chart.title}</td>
      <td><FormattedDate date={chart.modifiedAt} /></td>
    </tr>
  )
}
