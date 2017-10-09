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
// const { db, pgp } = require('../../server/db/db_connection')

import PgAsync from 'pg-async';
import { Measure } from '../../shared/model/measure.js'
import { Chord, Lyric } from '../../shared/model/measure.js'

const pgAsync = new PgAsync(process.env.DB_URL);


/**
 * Return a measure object from a measure ID.
 * @param {number} id - Measure id.
 * @return {Promise} - Promise resolving to a measure object.
*/
Measure.getById = function (id) {

}

Measure.prototype.getChords = function () {
  const chordQuery = `
    SELECT chordId, beatIndex, noteCode, suffix
    FROM chords
    WHERE measureId = $1`
  const chords = async pgAsync.rows(chordQuery, [this.measureId])

}
