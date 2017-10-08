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
 * User model.
 * @module user
 */
const { db, pgp } = require('../../server/db/db_connection')
const { checkPass } = require('../../server/utilities/password_utils')

/**
 * User object.
 * @class
 */
class User {
  /**
   * User constructor
   * @constructor
   * @param {string} id - user_id
   * @param {string} email - email
   * @param {string} firstName - first name
   * @param {string} lastName - last name
   * @param {string} salt - password salt
   * @param {string} hash - password hash
   */
  constructor(id, email, firstName, lastName, salt, hash) {
    this.id = id
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.salt = salt
    this.hash = hash
  }
}

/**
 * Return a User object for the given criteria.
 * @function
 * @param {string} lookupColumn - The column for which the given data applies
 * @param {string} userData - The user data for the colum indicated
 * @return {Promise} - Returns a Promise which resolves to a User object,
 *                     or null if no user found.
 */
User.get = function (lookupColumn, userData) {
  const query = `SELECT * FROM users WHERE ${lookupColumn}=$1`
  return db.one(query, [userData])
    .then(u =>
      new User(
        u.user_id,
        u.email,
        u.first_name,
        u.last_name,
        u.password_salt,
        u.password_hash)
    )
    .catch((err) => {
      if (err.code === pgp.queryResultErrorCode.noData) {
        return null
      }
      throw err
    })
}

/**
 * Return a User object for a given email.
 * @function
 * @param {string} email - Email for which to find a user.
 * @return {Promise} - Returns a Promise which resolves to a User object,
 *                     or null if no user found.
 */
User.getByEmail = function (email) {
  return User.get('email', email)
}

/**
 * Return a User object for a given user_id.
 * @function
 * @param {number} id - ID for which to find a user.
 * @return {Promise} - Returns a Promise which resolves to a User object,
 *                     or null if no user found.
 */
User.getById = function (id) {
  return User.get('user_id', id)
}

/**
 * Check password against entered password.
 * @method
 * @param {string} enteredPass - Password entered.
 * @returns {boolean} - Whether or not the password matched.
 */
User.prototype.checkPassword = function (enteredPass) {
  return checkPass(this, enteredPass)
}

//  var Sequelize = require('Sequelize')
//  var db = require('./db')
//  var procError = require('../utilities/err')
//
//  //////////////////////////////////////////////////////////////////////////////
//  // User
//  //////////////////////////////////////////////////////////////////////////////
//
//  //////////
//  // table
//  const User = db.sequelize.define('user', {
//    userId: {
//      type: Sequelize.INTEGER,
//      autoIncrement: true,
//      primaryKey: true,
//    },
//    email: {
//      type: Sequelize.STRING,
//      allowNull: false,
//      unique: true,
//    },
//    passwordHash: {
//      type: Sequelize.STRING,
//      allowNull: false,
//    },
//    passwordSalt: {
//      type: Sequelize.STRING,
//      allowNull: false,
//    },
//    firstName: {
//      type: Sequelize.STRING,
//    },
//    lastName: {
//      type: Sequelize.STRING,
//    },
//    // don't need joinedAt, since timestamps is true by default, and
//    // createdAt, updatedAt will automatically be populated
// })
//
//
//  ///////////
//  // methods
//  // // Adding a class level method
//  // User.classLevelMethod = function() {
//  //   return 'foo';
//  // };
//
// User.getUser = function(whereClause) {
//   return this.find({
//     where: whereClause,
//     attributes: {
//       exclude: [
//         'passwordHash',
//         'passwordSalt',
//       ]
//     },
//     raw: true
//    })
//    .then(u => {
//
//      // TODO: actually make list of charts here, not just dummy!
//      u.charts = []
//
//      return Promise.resolve(u)
//
//    })
// }
//
// User.getByEmail = function(targetEmail) {
//   return this.getUser({email: targetEmail})
// }
//
// User.getById = function(targetId) {
//   return this.getUser({userId: targetId})
// }
//
//  // // Adding an instance level method
//  // User.prototype.instanceLevelMethod = function() {
//  //   return 'bar';
//  // };
//
//  // def get_data(self):
//  //    """Return a dict of user details."""
//  //
//  //    charts = [
//  //            { 'title': chart.title,
//  //              'chartId': chart.chart_id,
//  //              'createdAt': chart.created_at,
//  //              'updatedAt': chart.modified_at }
//  //            for chart in self.charts
//  //           ]
//  //
//  //    return {
//  //                'charts': charts,
//  //                'userId': self.user_id,
//  //                'email': self.email,
//  //                'firstName': self.first_name,
//  //                'lastName': self.last_name
//  //            }

module.exports = {
  User,
}
