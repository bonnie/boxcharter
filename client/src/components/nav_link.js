import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <li className="nav-link nav-item">
      <Link key="props.key" to={props.linkRoute}>{props.linkText}</Link>
    </li> 
  ) 
}