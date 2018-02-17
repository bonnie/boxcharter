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
  * Lyric db methods.
  * @module db_lyric
  */
const { db } = require('./utilities/db_connection')
const { logError } = require('../utilities/log')
const Lyric = require('../../../shared/src/model/lyric')

/**
 * Add lyric object to the db with the specified measureId, and set the object's
 * lyricId to be the resulting lyricId
 * @param {number} measureId - measureId for the lyric
 * @returns {Promise} - Promise resolving to lyricId, or throw an error
 */
Lyric.prototype.addToDb = async function (measureId) {
  if (measureId) this.measureId = measureId
  try {
    const response = await db.one(
      `INSERT INTO lyrics (measureId, verseIndex, lyricText)
        VALUES ($1, $2, $3)
        RETURNING lyricId`,
      [this.measureId, this.verseIndex, this.lyricText])
    this.lyricId = response.lyricid
    return response.lyricid
  } catch (e) {
    const errMsg = `Failed to add lyric ${this.lyricText} at index ${this.verseIndex} of measure ${this.measureId}`
    throw logError(errMsg, e)
  }
}

module.exports = Lyric
