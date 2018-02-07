import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <li className="nav-item">
      <Link to={props.linkRoute}>{props.linkText}</Link>
    </li> 
  ) 
}