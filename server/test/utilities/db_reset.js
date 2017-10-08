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

const { db } = require('../../db/db_connection.js')
const { addKeys } = require('../../db/seed/add_keys')
const { addUser } = require('../../db/seed/add_user')

const getTables = () =>
  // get all tables in current db
  db.query(`SELECT table_name
              FROM information_schema.tables
              WHERE table_schema = 'public';`)

const resetDB = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cowardly refusing to truncate production db.')
  }
  getTables()
    .then((tables) => {
      Promise.all(tables.map(table =>
        db.none(`TRUNCATE ${table.table_name} RESTART IDENTITY CASCADE`),
      ))
        .catch(console.error)
    })
    .catch(console.error)
}

const seedDB = () =>
  addKeys()
    .then(() => addUser())
    .catch(console.error)

const initDB = () => {
  resetDB()
    .then(() => seedDB())
    .catch(console.error)
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
