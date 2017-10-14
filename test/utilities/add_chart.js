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
 * Add a chart with metadata, sections, chords, and measures.
 * For testing DB only; not needed for production database.
 * @module add_chart
 */
const { db, pgp } = require('../../server/db/db_connection')

const VERBOSE = true

/**
 * Add chart to db
 * @function
 * @return {undefined}
 */
const addChart = async () => {
  const query = `
    INSERT INTO charts
      (title,
      author,
      composer,
      lyricist,
      lyricistSame,
      originalKeyCode,
      printKeyCode)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`
  try {
    await db.query(query, ['Blackbird', 'btron', 'Paul McCartney', null, true, 'G', 'A'])
    if (VERBOSE) console.log('Added chart')
  } catch (err) {
    console.log(`FAILED TO ADD CHART: ${err}`)
  }
}

const addEntireChart = async () => {
  await addChart()
}

if (!module.parent) {
  addEntireChart()
  pgp.end()
}

module.exports = {
  addEntireChart,
}
