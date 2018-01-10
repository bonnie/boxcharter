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
 * DB methods for the chart model.
 * @module chart_db
 */
const { db } = require('./utilities/db_connection')
const { logError } = require('../utilities/log')
const Chart = require('../../../shared/src/model/chart')
const Section = require('./db_section')
const User = require('./db_user')
const getChildren = require('./utilities/get_children')

/**
 * Add chart object to the db, and set the object's chartId to be the
 * resulting chartId
 * @param {number} chartId - chartId for the chart
 * @returns {Promise} - Promise resolving to chartId, or throw an error
 */

Chart.prototype.addToDb = async function () {
  try {
    const response = await db.one(
      `INSERT INTO charts (
          title,
          author,
          composer,
          lyricist,
          lyricistSame,
          originalKeyCode,
          printKeyCode,
          maxPages,
          minFontsize,
          pageWidth,
          pageHeight,
          pageUnits)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING chartId`,
      [
        this.title,
        this.author,
        this.composer,
        this.lyricist,
        this.lyricistSame,
        this.originalKeyCode,
        this.printKeyCode,
        this.maxPages,
        this.minFontsize,
        this.pageWidth,
        this.pageHeight,
        this.pageUnits,
      ])
    this.chartId = response.chartid
    if (this.sections) {
      await Promise.all(this.sections.map(section => section.addToDb(this.chartId)))
    }
    // users don't need to be added to the db here
    return response.chartid
  } catch (e) {
    const errMsg = `Failed to add chart "${this.title}"`
    throw logError(errMsg, e)
  }
}

/**
 * Get a chart by chartId
 * @param  {number} chartId  id of the chart to be gotten
 * @return {Promise}         resolves to Chart object
 */
Chart.getById = async function (chartId) {
  try {
    const chartQuery = 'SELECT * FROM charts WHERE chartID = $1'
    const chartData = await db.one(chartQuery, chartId)
    const chart = new Chart(chartData)
    chart.sections = await chart.getSections()
    chart.users = await chart.getUsers()
    return chart
  } catch (e) {
    const errMsg = `Could not get chartId ${chartId}`
    throw logError(errMsg, e)
  }
}

/**
 * Get chart's sections from database
 * @return {Promise} promise resolving to array of objects, each object containing section data
 */
Chart.prototype.getSections = function () {
  return getChildren('section', 'chart', this.chartId, 'index', Section)
    .catch((e) => {
      const errMsg = `Failed to get sections for chart id "${this.chartId}"`
      throw logError(errMsg, e)
    })
}

/**
 * Get users associated with chart
 * @return {Promise} promise resolving to array of objects, each object containing user data
 */
Chart.prototype.getUsers = async function () {
  const userchartsQuery = `
    SELECT u.userId, u.email, u.firstName, u.lastName
    FROM usercharts AS uc
      JOIN users AS u
        ON uc.userid = u.userid
    WHERE uc.chartid = $1
  `
    return db.any(userchartsQuery, this.chartId)
     .catch ((e) => {
        const errMsg = `Failed to get users for chart id "${this.chartId}"`
        throw logError(errMsg, e)
      })
}

// /**
//  * Remove all children from the database (in preparation to update chart)
//  * @return {Promise} resolution unimportant
//  */
// Chart.prototype.clear = () => Promise.all(this.sections.map(section => section.clear()))

module.exports = Chart