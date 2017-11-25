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
 * DB methods for the measure model.
 * @module measure_db
 */
const { db } = require('../db_connection')
const { logger } = require('../../utilities/log')
const { Measure } = require('../../../shared/model/measure')
const { Chord, Lyric } = require('./chord-lyric_db')
const { getChildren } = require('../utilities/get_children')

/**
 * Add measure object to the db, and set the object's measureId to be the
 * resulting measureId
 * @param {number} sectionId - sectionId for the measure
 * @returns {Promise} - Promise resolving to measureId, or throw an error
 */
Measure.prototype.addToDb = async function (sectionId) {
  if (sectionId) this.sectionId = sectionId
  try {
    const response = await db.one(
      `INSERT INTO measures (sectionId, index, beatsPerMeasure)
        VALUES ($1, $2, $3)
        RETURNING measureId`,
      [this.sectionId, this.index, this.beatsPerMeasure])
    this.measureId = response.measureid
    if (this.chords) {
      await Promise.all(this.chords.map(chord => chord.addToDb(this.measureId)))
    }
    if (this.lyrics) {
      await Promise.all(this.lyrics.map(lyric => lyric.addToDb(this.measureId)))
    }
    return response.measureid
  } catch (err) {
    logger.crit(`Failed to add measure at index ${this.index} of section ${this.sectionId}`)
    logger.crit(err)
    throw new Error(`Measure not added: ${err.message}`)
  }
}

/**
 * Get measure's chords from database and assign to 'chords' property
 * @return {Promise} promise whose resolution is irrelevant
 */
Measure.prototype.getChords = function () {
  return getChildren('chord', 'measure', this.measureId, 'beatIndex', Chord)
    .then((chords) => { this.chords = chords })
    .catch(console.error)
}

/**
 * Get measure's lyrics from database and assign to 'lyrics' property
 * @return {Promise} promise whose resolution is irrelevant
 */
Measure.prototype.getLyrics = function () {
  return getChildren('lyric', 'measure', this.measureId, 'verseIndex', Lyric)
    .then((lyrics) => { this.lyrics = lyrics })
    .catch(console.error)
}

module.exports = {
  Measure,
}
