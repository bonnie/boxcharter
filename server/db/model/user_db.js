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
const { logError } = require('../../utilities/log')
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
 * @return {Promise} - Returns a promise resolving to a User object, or null if
 *                     no user found.
 */
User.getUser = async function (lookupColumn, userData) {
  const query = `SELECT * FROM users WHERE ${lookupColumn}=$1`

  try {
    const dbUser = await db.one(query, [userData])
    const user = User.dbDatatoUser(dbUser)
    user.getCharts()
    return user
  } catch (e) {
    if (e.code === pgp.queryResultErrorCode.noData) {
      return null
    }
    const errMsg = `Failed to get user by ${lookupColumn} for data ${userData}`
    throw logError(errMsg, e)
  }
}

/**
 * Return a User object for a given email.
 * @function
 * @param {string} email - Email for which to find a user.
 * @return {Promise} - Returns a promise resolving to a User object, or null if
 *                     no user found.
 */
User.getByEmail = async function (email) {
  return User.getUser('email', email)
}


/**
 * Return a User object for a given userId.
 * @function
 * @param {number} id - ID for which to find a user.
 * @return {Promise} - Returns a promise resolving to a User object, or null if
 *                     no user found.
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
  } catch (e) {
    const errMsg = `Failed to update column ${updateColumn} for userid ${this.userId}`
    throw logError(errMsg, e)
  }
}

/**
 * Populate a user's charts property with an array if chart IDs
 * charts property will be an array of objects, each with a key 'chartId' and 'permissions'
 * @function
 * @return {Promise} - Promise whose resolution is unimportant
 */
User.prototype.getCharts = async function () {
  const userchartsQuery = `
    SELECT c.chartid, uc.permissions
    FROM charts AS c
      JOIN usercharts AS uc
        ON c.chartid = uc.chartid
    WHERE uc.userid = $1
  `
  try {
    const charts = await db.any(userchartsQuery, this.userId)
    this.charts = charts.map(chartData =>
      Object({ chartId: chartData.chartid, permissions: chartData.permissions }))
  } catch (e) {
    const errMsg = `Failed to get charts for userId ${this.userId}`
    throw logError(errMsg, e)
  }
}

/**
 * Associate chart with user
 * @param {Chart} chart - chart object
 * @param {number} permissions - 0 for owner, 1 for non-owner editor, 2 for non-owner viewer
 * @returns {Promise} - Promise resolving to chartuserid of association record
 */
User.prototype.addChart = async function (chart, permissions) {
  try {
    const errMsg = 'Chart not added to user.'
    if (!this.userId) throw new Error(`User has no user id. ${errMsg}`)
    if (!chart.chartId) throw new Error(`Chart has no chart id. ${errMsg}`)
    const response = await db.one(
      'INSERT INTO usercharts (chartId, userId, permissions) VALUES ($1, $2, $3) returning userChartId',
      [chart.chartId, this.userId, permissions]
    )
    // update object properties
    await this.getCharts()
    await chart.getUsers()

    // probably never used but seems a decent thing to return
    return response.userchartid
  } catch (e) {
    const errMsg = `Failed to add chartId ${chart.chartId} to userId ${this.userId}`
    throw logError(errMsg, e)
  }
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
