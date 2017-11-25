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
 * DB methods for the section model.
 * @module section_db
 */
const { db } = require('../db_connection')
const { logger } = require('../../utilities/log')
const { Section } = require('../../../shared/model/section.js')
const { Measure } = require('./measure_db')
const { getChildren } = require('../utilities/get_children')

/**
 * Add section object to the db, and set the object's sectionId to be the
 * resulting sectionId
 * @param {number} chartId - chartId for the section
 *                         if this argument is not included, will use section object's chartId
 * @returns {Promise} - Promise resolving to sectionId, or throw an error
 */
Section.prototype.addToDb = async function (chartId) {
  if (chartId) this.chartId = chartId
  try {
    const response = await db.one(
      `INSERT INTO sections (
        chartId,
        index,
        sectionName,
        sectionDesc,
        beatsPerMeasure,
        verseCount,
        pickupMeasureBeats)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING sectionId`,
      [
        this.chartId,
        this.index,
        this.sectionName,
        this.sectionDesc,
        this.beatsPerMeasure,
        this.verseCount,
        this.pickupMeasureBeats,
      ])
    this.sectionId = response.sectionid
    if (this.measures) {
      await Promise.all(this.measures.map(measure => measure.addToDb(this.sectionId)))
    }
    return response.sectionid
  } catch (err) {
    logger.crit(`Failed to add section at index ${this.index} of chart ${this.chatId}`)
    logger.crit(err)
    throw new Error(`Section not added: ${err.message}`)
  }
}

/**
 * Get section's measures from database and assign to 'measures' property
 * @return {Promise} promise whose resolution is irrelevant
 */
Section.prototype.getMeasures = function () {
  return getChildren('measure', 'section', this.sectionId, 'index', Measure)
    .then((measures) => { this.measures = measures })
    .catch(console.error)
}

module.exports = {
  Section,
}
