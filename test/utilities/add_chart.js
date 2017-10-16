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


/**
 * Add sections to db for chart ID 1
 * @function
 * @return {undefined}
 */
const addSections = async () => {
  const section1 = [1, 0, null, null, 4, 3]
  const section2 = [1, 1, 'Bridge', 'between verses 2 and 3', 4, 1]
  const query = `
    INSERT INTO sections
      (chartId,
      index,
      sectionName,
      sectionDesc,
      beatsPerMeasure,
      verseCount)
    VALUES ($1, $2, $3, $4, $5, $6)`

  try {
    if (VERBOSE) console.log('adding sections')
    const sections = [section1, section2]
    for (const section of sections) {
      await db.query(query, section)
      if (VERBOSE) console.log(`added section ${section[2]}`)
    }
  } catch (err) {
    throw err
  }
}

/**
 * Add measures to db for section IDs 1 and 2
 * @function
 * @return {undefined}
 */
const addMeasures = async () => {
  const section1 = [1, 0, null, null, 4, 3]
  const section2 = [1, 1, 'Bridge', 'between verses 2 and 3', 4, 1]
  const query = `
    INSERT INTO sections
      (chartId,
      index,
      sectionName,
      sectionDesc,
      beatsPerMeasure,
      verseCount)
    VALUES ($1, $2, $3, $4, $5, $6)`

  try {
    if (VERBOSE) console.log('adding sections')
    const sections = [section1, section2]
    for (let section of sections) {
      await db.query(query, section)
      if (VERBOSE) console.log(`added section ${section[2]}`)
    }
  } catch (err) {
    throw err
  }
}

const addEntireChart = async () => {
  await addChart()
  await addSections()
}

if (!module.parent) {
  addEntireChart().then(pgp.end)
}

module.exports = {
  addEntireChart,
}
