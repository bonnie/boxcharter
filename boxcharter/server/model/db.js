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

 // use Sequelize ORM to create database model

var Sequelize = require('Sequelize')

// Get this error when running:
// DeprecationWarning: Using the automatically created return value from client.query as an event emitter is deprecated and will be removed in pg@7.0. Please see the upgrade guide at https://node-postgres.com/guides/upgrading
// Executing (default): SELECT 1+1 AS result
// github issue: https://github.com/sequelize/sequelize/issues/7818

// sequelize instance
const sequelize = new Sequelize(
  'postgres:///boxchart_express'
  // { define: { paranoid: true } } // when deleting a record, leave in db and set deletedAt
)

module.exports = { sequelize: sequelize };

//////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////

//////////
// table

////////////////
// associations

///////////
// methods
