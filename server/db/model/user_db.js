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
const { db, pgp } = require('../db_connection')
const { checkPass } = require('../../utilities/password_utils')
const { User } = require('../../../shared/model/user')
// const { Chart } = require('./chart_db.js')

/**
 * Make a user object from database data
 * @function
 * @param {object} dbUserData - Data for one user, as returned from a SELECT * FROM users query
 * @return {User} - user object from data
 */
User.dbDatatoUser = function (dbUserData) {
  // fields get returned lowercased from pg-promise
  return new User(
    dbUserData.userid,
    dbUserData.email,
    dbUserData.firstname,
    dbUserData.lastname,
    dbUserData.passwordsalt,
    dbUserData.passwordhash)
}

/**
 * Return a User object for the given criteria.
 * @function
 * @param {string} lookupColumn - The column for which the given data applies
 * @param {string} userData - The user data for the colum indicated
 * @return {User} - Returns a User object, or null if no user found.
 */
User.getUser = async function (lookupColumn, userData) {
  const query = `SELECT * FROM users WHERE ${lookupColumn}=$1`

  try {
    const dbUser = await db.one(query, [userData])
    const user = User.dbDatatoUser(dbUser)
    user.getCharts()
    return user
  } catch (err) {
    if (err.code === pgp.queryResultErrorCode.noData) {
      return null
    }
    throw err
  }
}

/**
 * Return a User object for a given email.
 * @function
 * @param {string} email - Email for which to find a user.
 * @return {User} - Returns a User object, or null if no user found.
 *
 */
User.getByEmail = async function (email) {
  return User.getUser('email', email)
}


/**
 * Return a User object for a given userId.
 * @function
 * @param {number} id - ID for which to find a user.
 * @return {User} - Returns a User object, or null if no user found.
 */
User.getById = function (id) {
  return User.getUser('userId', id)
}

/**
 * Update a user's metadata
 * @function
 * @param {string} updateColumn - The column for which the given data applies.
 * @param {string} userData - The user data for the colum indicated.
 * @return {undefined} - Changes are made to the User instance; nothing is returned.
 */
User.prototype.update = async function (updateColumn, userData) {
  // update the db
  try {
    await db.query(`UPDATE users SET ${updateColumn}=$1 WHERE userId=$2`, [userData, this.userId])
    this[updateColumn] = userData
  } catch (err) {
    throw err
  }
}

/**
 * Populate a user's charts property.
 * @function
 * @return {undefined} - no return, but the user object has been modified to have
 *                       an array of charts in its charts property.
 */
User.prototype.getCharts = function () {
  // return Chart.getChartsByUser(this.userId)
  //   .then((charts) => { this.charts = charts })
}

/**
 * Add a chart to a user.
 * @function
 * @param {number} chartId - id of the chart to be added. It must already exist in the db.
 * @return {undefined} - no return, but the user object has been modified to have another chart.
 */
// User.prototype.addChart = function (chartId) {
// }

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
