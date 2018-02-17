import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <Link className="nav-link nav-text" key="props.key" to={props.linkRoute}>{props.linkText}</Link>
  ) 
}