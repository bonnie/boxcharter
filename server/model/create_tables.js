
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

//////////////////////////////////////////////////////////////////////////////
// Database connection and creation
//////////////////////////////////////////////////////////////////////////////

var db = require('./db')
require('./user')
require('./note-key')
require('./chord-lyric')
require('./measure')
require('./section')
require('./chart')
require('./chartuser')
require('./associations')

// for seeding notes and keys
const addUser = require('../seed/add_user')
const addNotesAndScales = require('../seed/add_scales')

var sequelize = db.sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
    process.exit()
  })

// create tables, but only if they don't already exist
// sequelize.sync()
sequelize.sync({force: true}) // force=true creates tables even if they already exist
  .then(() => {
    console.log('Tables created.')

    // seed data
    console.log('**Adding notes and scales.')
    addNotesAndScales()

    // DANGER: *****remove this when deploying!
    console.log('**Adding user.')
    addUser()
  })
  .catch(error => {
    console.error(`Unable to create tables: ${error}`)
  })
