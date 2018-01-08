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
const { db } = require('../../../server/src/model/utilities/db_connection')
const { addKeys } = require('../../../server/src/model/data/add_keys')
const { addUser } = require('./test_data/add_user')
const { addEntireChart } = require('./test_data/add_chart')

/**
 * Get all the tables in the current db connection.
 * @function
 * @returns {Promise} - Promise resolving to array of objects each representing
 *  a table. Each object has a key 'table_name'.
 */
const getTables = function () {
  return db.query(
    `SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';`)
}

/**
 * Truncate all tables to reset the database.
 * @function
 * @returns {Promise} - Promise whose resolution is unimportant.
 */
const resetDB = async function () {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cowardly refusing to truncate production db.')
  }
  try {
    const tables = await getTables()
    return await Promise.all(tables.map(table =>
      db.none(`TRUNCATE ${table.table_name} RESTART IDENTITY CASCADE`),
    ))
  } catch (err) {
    console.error(err)
    return null
  }
}

/**
 * Seed the database using functions from the db/seed directory.
 * @function
 * @returns {Promise} - resolution unimportant
 */
const seedDB = () => 
  addKeys()
    .then(addUser)
    .then(addEntireChart)
    .catch(console.error)

/**
 * Initialize the db: both reset it, and then seed it.
 * @function
 * @returns {Promise} - resolution unimportant
 */
const initDB = () => resetDB().then(seedDB).catch(console.error)

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
