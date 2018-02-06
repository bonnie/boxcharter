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
 * Written with help from Stephen Grider's Advanced React and Redux Udemy Course
 * @module
 * sign_in
 */

import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // TODO: log user in
    console.log(email, password)
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    // const { handleSubmit, fields: { email, password } } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control" type="text"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    )
  }
}

const formOptions = {
  form: 'signin',
  fields: ['email', 'password']
}

export default reduxForm(formOptions)(Signin)