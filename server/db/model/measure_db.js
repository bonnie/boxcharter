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
Measure.prototype.addToDb = async function () {
  try {
    const response = await db.one(
      `INSERT INTO measures (sectionId, index, beatsPerMeasure)
        VALUES ($1, $2, $3)
        RETURNING measureId`,
      [this.sectionId, this.index, this.beatsPerMeasure])
    this.measureId = response.measureid
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

// /**
//  * Return a measure object from a measureId, including chords and lyrics
//  * properties, getting data from the db.
//  * @param {number} id - Measure id.
//  * @return {Promise} - Promise resolving to a measure object.
// */
// Measure.getById = function (id) {
//
// }
//
// /**
//  * Add Chord objects to Measure's chords property array by retrieving chords
//  * from the database.
//  * @return {undefined}
// */
// Measure.prototype.retrieveChords = async function () {
//   const chordQuery = `
//     SELECT chordId, beatIndex, noteCode, suffix
//     FROM chords
//     WHERE measureId = $1`
//   // const chords = await db.query(chordQuery, [this.measureId])
// }
//
// /**
//  * Add chords to the database from the Measure's chord property array.
//  * @param {array} chords - Array of Chord objects.
//  * @return {undefined}
// */
// Measure.prototype.recordChords = async function (chords) {
//   // const chordQuery = `
//   //   SELECT chordId, beatIndex, noteCode, suffix
//   //   FROM chords
//   //   WHERE measureId = $1`
//   // const chords = await db.query(chordQuery, [this.measureId])
// }
//
// /**
//  * Add Lyric objects to Measure's lyrics property array by retrieving lyrics
//  * from the database.
//  * @return {undefined}
// */
// Measure.prototype.retrieveLyrics = async function () {
//   const lyricQuery = `
//     SELECT lyricId, beatIndex, noteCode, suffix
//     FROM lyrics
//     WHERE measureId = $1`
//   // const lyrics = await db.query(lyricQuery, [this.measureId])
// }
//
// /**
//  * Add lyrics to the database from the Measure's lyric property array.
//  * @param {array} lyrics - array of Lyric objects.
//  * @return {undefined}
// */
// Measure.prototype.recordLyrics = async function (lyrics) {
//   // const lyricQuery = `
//   //   SELECT lyricId, beatIndex, noteCode, suffix
//   //   FROM lyrics
//   //   WHERE measureId = $1`
//   // const lyrics = await db.query(lyricQuery, [this.measureId])
// }

module.exports = {
  Measure,
}
