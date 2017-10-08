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
const { Chart } = require('./chart.js')

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
    this.charts = [] // array of Chart objects
  }
}

/**
 * Make a user object from database data
 * @function
 * @param {object} dbUserData - Data for one user, as returned from a SELECT * FROM users query
 * @return {User} - user object from data
 */
User.dbDatatoUser = function (dbUserData) {
  return new User(
    dbUserData.user_id,
    dbUserData.email,
    dbUserData.first_name,
    dbUserData.last_name,
    dbUserData.password_salt,
    dbUserData.password_hash)
}

/**
 * Update a user's metadata
 * @function
 * @param {string} updateColumn - The column for which the given data applies
 * @param {string} userData - The user data for the colum indicated
 * @return {Promise} - Returns a Promise which resolves to a User object,
 *                     or null if no user found.
 */
User.addToDb = function() {

}

/**
 * Return a User object for the given criteria.
 * @function
 * @param {string} lookupColumn - The column for which the given data applies
 * @param {string} userData - The user data for the colum indicated
 * @return {Promise} - Returns a Promise which resolves to a User object,
 *                     or null if no user found.
 */
User.getUser = function (lookupColumn, userData) {
  const query = `SELECT * FROM users WHERE ${lookupColumn}=$1`
  return db.one(query, [userData])
    .then(User.dbDatatoUser)
    .then(function (user) {
      // TODO: get charts here)
      return user.getCharts()
    }
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
  return User.getUser('email', email)
}

/**
 * Return a User object for a given user_id.
 * @function
 * @param {number} id - ID for which to find a user.
 * @return {Promise} - Returns a Promise which resolves to a User object,
 *                     or null if no user found.
 */
User.getById = function (id) {
  return User.getUser('user_id', id)
}

/**
 * Update a user's metadata
 * @function
 * @param {string} updateColumn - The column for which the given data applies
 * @param {string} userData - The user data for the colum indicated
 * @return {Promise} - Returns a Promise which resolves to a User object,
 */
User.prototype.update = function () {

}

/**
 * Populate a user's charts property
 * @function
 * @return {Promise} - Returns a Promise which resolves to a User object,
 */
User.prototype.getCharts = function () {
  this.charts = Chart.getCharts(this)
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

module.exports = {
  User,
}
