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
  * Chord and Lyric db methods.
  * @module chord-lyric_db
  */
const { db, pgp } = require('../db_connection')
const { logger } = require('../../utilities/log')
const { Chord, Lyric } = require('../../../shared/model/chord-lyric')

/**
 * Add chord object to the db with the specified sectionId, and set the object's
 * chordId to be the resulting chordId
 * @param {number} measureId - measureId for the chord
 * @returns {Promise} - Promise resolving to chordId, or resolving to null if error
 */
Chord.prototype.addToDb = async function (measureId) {
  try {
    const response = await db.one(
      `INSERT INTO chords (measureId, beatIndex, noteCode, bassNoteCode, suffix)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING chordId`,
      [measureId, this.beatIndex, this.noteCode, this.bassNoteCode, this.suffix])
    this.chordId = response.chordid
    return response.chordid
  } catch (err) {
    logger.crit(`Failed to add chord ${this.noteCode}${this.suffix} at index ${this.beatIndex} of measure ${measureId}`)
    logger.crit(err)
    return Promise.resolve(null)
  }
}

module.exports = {
  Chord,
  Lyric,
}
