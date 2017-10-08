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
const db = require('../db_connection').db
const saltHashPassword = require('../../utilities/password_utils').saltHashPassword

const VERBOSE = process.env.NODE_ENV === 'production'

/**
 * Add seed user to db
 * @function
 * @return {undefined}
 */
const addUser = () => {
  const email = 'bonnie@bonnie'
  const firstName = 'Bonnie'
  const lastName = 'BoBonnie'
  const password = 'bonnie'
  const { hash, salt } = saltHashPassword(password)
  const query = `INSERT INTO users
                  (email, first_name, last_name, password_hash, password_salt)
                  VALUES ($1, $2, $3, $4, $5)`
  return db.query(query, [email, firstName, lastName, hash, salt])
    .then(() => { if (VERBOSE) console.log('Added seed user') })
    .catch(err => console.log(`FAILED TO ADD USER: ${err}`))
}

module.exports = {
  addUser,
}
