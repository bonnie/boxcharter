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
 * Function to add a seed user.
 * @module add_user
 */
const { db } = require('../../../../server/src/model/utilities/db_connection')
const { saltHashPassword } = require('../../../../server/src/utilities/password_utils')

const VERBOSE = process.env.NODE_ENV === 'production'
const userData = {
  email: 'bonnie@bonnie',
  firstName: 'Bonnie',
  lastName: 'BoBonnie',
  password: 'bonnie',
}

const userData2 = {
  email: 'no@no.com',
  firstName: 'no',
  lastName: 'way',
  password: 'jose',
}

/**
 * Add seed user to db
 * @function
 * @param {object} data - Data for user to add
 * @returns {Promise} - Resolution unimportant.
 */
const addUser = (data) => {
  const { hash, salt } = saltHashPassword(data.password)
  const query = `INSERT INTO users
                  (email, firstName, lastName, passwordHash, passwordSalt)
                  VALUES ($1, $2, $3, $4, $5)`
  return db.query(query, [data.email, data.firstName, data.lastName, hash, salt])
    .then(() => { if (VERBOSE) console.log('Added seed user') })
    .catch(err => console.log(`FAILED TO ADD USER: ${err}`))
}

/**
 * Add seed users to the database
 * @function
 * @returns {Promise} - Resolution unimportant
 */
const addUsers = async () => {
  await addUser(userData)
  await addUser(userData2)
}

module.exports = {
  addUsers,
  userData,
}
