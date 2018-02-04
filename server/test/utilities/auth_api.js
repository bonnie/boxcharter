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
 * Utilities for auth API tests
 * @module
 * auth
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')

chai.use(chaiHttp)

/**
 * Send email and password to a route
 * @function
 * @param {string} route - route to which to send email and password (no leading /)
 * @param {string} email - email for new account
 * @param {string} password - password for the new account
 * @returns {promise} - Promise that resolves to the response of the http request 
 */
const sendCredentials = (route, email, password) => {
  return chai.request(app)
    .post(`/api/auth/${route}`)
    .send({ email, password })
}

module.exports = {
  sendCredentials
}