
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

var model = require('./model')

// order is important for associations / dependencies ( or is it...? )
require('./model_note-key.js')
require('./model_user.js')
require('./model_chart.js')
require('./model_measure.js')
require('./model_section.js')

var sequelize = model.sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// create tables, but only if they don't already exist
// sequelize.sync()
sequelize.sync({force: true}) // force=true creates tables even if they already exist
  .then(() => {
    console.log('Tables created.')
  })
  .catch(error => {
    console.error(`Unable to create tables: ${error}`)
    process.exit()
  })
