import React from 'react'
import FormattedDate from '../../utils/formatted_date'

export default (props) => {
  const { chart } = props
  return (
    <tr className="chart-row">
      <td>{chart.title}</td>
      <td><FormattedDate date={chart.modifiedAt} /></td>
    </tr>
  )
}
