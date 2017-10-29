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
 * Utilities to reset the database in between tests.
 * @module db_reset
 */
const { db } = require('../../db/db_connection.js')
const { addKeys } = require('../../db/seed/add_keys')
const { addUser } = require('../../db/seed/add_user')

/**
 * Get all the tables in the current db connection.
 * @function
 * @returns {array} - Array of objects each representing a table. Each object
 *    has a key 'table_name'
 */
const getTables = () =>
  db.query(`SELECT table_name
              FROM information_schema.tables
              WHERE table_schema = 'public';`)

/**
 * Truncate all tables to reset the database.
 * @function
 * @returns {undefined}
 */
const resetDB = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cowardly refusing to truncate production db.')
  }
  return getTables()
    .then(async tables =>
      Promise.all(tables.map(table =>
        db.none(`TRUNCATE ${table.table_name} RESTART IDENTITY CASCADE`),
      ))
        .catch(console.error)
    )
    .catch(console.error)
}

/**
 * Seed the database using functions from the db/seed directory.
 * @function
 * @returns {Promise} - resolution unimportant
 */
const seedDB = async () => {
  try {
    await addKeys()
    await addUser()
  } catch (err) { console.error(err) }
}

/**
 * Initialize the db: both reset it, and then seed it.
 * @function
 * @returns {Promise} - resolution unimportant
 */
const initDB = async () => {
  try {
    await resetDB()
    await seedDB()
  } catch (err) { console.error(err) }
}

// if the file is run as a command (used in npm scripts)
if (!module.parent) {
  const command = process.argv[2]
  switch (command) {
    case 'seed':
      seedDB()
      break
    case 'reset':
      resetDB()
      break
    default:
      console.error(`${command} is not a valid command`)
  }
}

module.exports = { initDB }
