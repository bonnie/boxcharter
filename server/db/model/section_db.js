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

/**
 * Add section object to the db, and set the object's sectionId to be the
 * resulting sectionId
 * @param {number} sectionId - sectionId for the section
 * @returns {Promise} - Promise resolving to sectionId, or throw an error
 */
Section.prototype.addToDb = async function () {
  try {
    const response = await db.one(
      `INSERT INTO sections (chartId, index, sectionName, sectionDesc,
                             beatsPerMeasure, verseCount, pickupMeasureBeats)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING sectionId`,
      [this.chartId, this.index, this.sectionName, this.sectionDesc,
        this.beatsPerMeasure, this.verseCount, this.pickupMeasureBeats])
    this.sectionId = response.sectionid
    return response.sectionid
  } catch (err) {
    logger.crit(`Failed to add section at index ${this.index} of section ${this.sectionId}`)
    logger.crit(err)
    throw new Error(`Section not added: ${err.message}`)
  }
}

// ///////////
// // methods
//
// Section.setSection = function(sectionData) {
//   // create new section for this chart with sectionData
//
//   const measures = sectionData.measures
//   delete sectionData.measures
//
//   Section.create(sectionData, {
//     options: {
//       logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
//     })
//     .then(newSection => {
//       logger.debug(`created new section ${sectionData}`)
//       measures.forEach(m => {
//         m.sectionId = newSection.sectionId
//         measure.Section.setSection(m)
//       })
//     })
//     .catch(err => {
//       throw (`Could not create section ${sectionData}: ${err}`)
//     })
//
// }
//
// Section.getChartSections = function(chartId) {
//   this.findAll({
//     where: { chartId: chartId },
//     options: { order: ['index'] },
//     attributes: { exclude: ['sectionId'] },
//     raw: true
//   }).then(sections => {
//     sectionsWithSections = sections.map(s => {
//       s.measures = s.getSections()
//       return s
//     })
//     return Promise.resolve(sectionsWithSections)
//   })
// }
//
// Section.getSections = function() {
//   return measure.Section.getSectionSections(this.sectionId)
// }

module.exports = {
  Section,
}
