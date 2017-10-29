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
const { db, pgp } = require('../../db/db_connection')

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
    await db.query(query, ['Blackbird', 'bds', 'Paul McCartney', null, true, 'G', 'A'])
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
  const section3 = [1, 2, 'Outtro', null, 4, 1]
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
  const measures = [
    { section_id: 1, chords: { 1: 'G' }, lyrics: { 1: 'Blackbird' } },
    { section_id: 1, chords: { 1: 'Am7', 3: 'G/B' }, lyrics: { 1: 'singing in the dead of' } },
    { section_id: 1, chords: { 1: 'G' }, lyrics: { 1: 'night' } },
    { section_id: 1, chords: { 1: '%' } },
    { section_id: 1, chords: { 1: 'C', 3: 'C#dim' }, lyrics: { 1: 'Take these broken', 2: 'Take these sunken', 3: 'Take these broken' } },
    { section_id: 1, chords: { 1: 'D', 3: 'D#dim' }, lyrics: { 1: 'wings and learn to', 2: 'eyes and learn to', 3: 'wings and learn to' } },
    { section_id: 1, chords: { 1: 'E' }, lyrics: { 1: 'fly', 2: 'see', 3: 'fly' } },
    { section_id: 1, chords: { 1: 'Em/Eb' } },
    { section_id: 1, chords: { 1: 'D', 2: 'C#dim' }, lyrics: { 1: 'all your', 2: 'all your', 3: 'all your' } },
    { section_id: 1, chords: { 1: 'C' }, lyrics: { 1: 'life', 2: 'life', 3: 'life' } },
    { section_id: 1, chords: { 1: 'Cm' }, lyrics: { 1: '', 2: '', 3: '(to outtro)' } },
    { section_id: 1, chords: { 1: 'G/B' }, lyrics: { 1: 'you were only', 2: 'you were only' } },
    { section_id: 1, chords: { 1: 'A7' }, lyrics: { 1: 'waiting for this', 2: 'waiting for this' } },
    { section_id: 1, chords: { 1: 'D7' }, lyrics: { 1: 'moment to a-', 2: 'moment to be' } },
    { section_id: 1, chords: { 1: 'G' }, lyrics: { 1: 'rise', 2: 'free' } },
    { section_id: 1, chords: { 1: '%' }, lyrics: { 1: '', 2: '(to bridge)' } },
    { section_id: 1, chords: { 1: 'C' } },
    { section_id: 1, chords: { 1: 'G/B' } },
    { section_id: 1, chords: { 1: 'A7', 2: 'D7sus4' } },
    { section_id: 1, chords: { 1: 'G' } },

    { section_id: 2, chords: { 1: 'F', 2: 'C/E' }, lyrics: { 1: 'Black-' } },
    { section_id: 2, chords: { 1: 'Dm', 2: 'C' }, lyrics: { 1: 'bird' } },
    { section_id: 2, chords: { 1: 'Bb6' }, lyrics: { 1: 'fly' } },
    { section_id: 2, chords: { 1: 'C' } },
    { section_id: 2, chords: { 1: 'F', 2: 'C/E' }, lyrics: { 1: 'Black-' } },
    { section_id: 2, chords: { 1: 'Dm', 2: 'C' }, lyrics: { 1: 'bird' } },
    { section_id: 2, chords: { 1: 'Bb6' }, lyrics: { 1: 'fly' } },
    { section_id: 2, chords: { 1: 'A' }, lyrics: { 1: 'into the' } },
    { section_id: 2, chords: { 1: 'D7sus4' }, lyrics: { 1: 'light of a dark black' } },
    { section_id: 2, chords: { 1: 'G' }, lyrics: { 1: 'night' } },
    { section_id: 2, chords: { 1: 'Am7', 2: 'G/B' } },
    { section_id: 2, chords: { 1: 'G' } },

    { section_id: 3, chords: { 1: 'C', 2: 'G/B' }, lyrics: { 1: 'you were only' } },
    { section_id: 3, chords: { 1: 'A7' }, lyrics: { 1: 'waiting for this' } },
    { section_id: 3, chords: { 1: 'D7' }, lyrics: { 1: 'moment to a-' } },
    { section_id: 3, chords: { 1: 'G' }, lyrics: { 1: 'rise' } },

  ]
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

const addEntireChart = async () => {
  await addChart()
  await addSections()
  await addMeasures()
}

if (!module.parent) {
  addEntireChart().then(pgp.end)
}

module.exports = {
  addEntireChart,
}
