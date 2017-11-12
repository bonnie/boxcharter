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

const VERBOSE = process.env.NODE_ENV === 'production'

const chartMetaData = {
  title: 'Blackbird',
  author: 'bds',
  composer: 'Paul McCartney',
  lyricistSame: true,
  originalKeyCode: 'G',
  printKeyCode: 'A' }

const sections = [
  { chartId: 1,
    index: 0,
    sectionName: null,
    sectionDesc: null,
    beatsPerMeasure: 4,
    verseCount: 3 },
  { chartId: 1,
    index: 1,
    sectionName: 'Bridge',
    sectionDesc: 'between verses 2 and 3',
    beatsPerMeasure: 4,
    verseCount: 1 },
  { chartId: 1,
    index: 2,
    sectionName: 'Outtro',
    sectionDesc: null,
    beatsPerMeasure: 4,
    verseCount: 1 },
]

const measures = [
  { section_id: 1, chords: { 1: { note: 'G' } }, lyrics: { 1: 'Blackbird' } },
  { section_id: 1, chords: { 1: { note: 'A', suffix: 'm7' }, 3: { note: 'G', bassNote: 'B' } }, lyrics: { 1: 'singing in the dead of' } },
  { section_id: 1, chords: { 1: { note: 'G' } }, lyrics: { 1: 'night' } },
  { section_id: 1, chords: { 1: { note: '%' } } },
  { section_id: 1, chords: { 1: { note: 'C' }, 3: { note: 'C#', suffix: 'dim' } }, lyrics: { 1: 'Take these broken', 2: 'Take these sunken', 3: 'Take these broken' } },
  { section_id: 1, chords: { 1: { note: 'D' }, 3: { note: 'D#', suffix: 'dim' } }, lyrics: { 1: 'wings and learn to', 2: 'eyes and learn to', 3: 'wings and learn to' } },
  { section_id: 1, chords: { 1: { note: 'E' } }, lyrics: { 1: 'fly', 2: 'see', 3: 'fly' } },
  { section_id: 1, chords: { 1: { note: 'E', suffix: 'm', bassNote: 'Eb' } } },
  { section_id: 1, chords: { 1: { note: 'D' }, 3: { note: 'C', suffix: '#dim' } }, lyrics: { 1: 'all your', 2: 'all your', 3: 'all your' } },
  { section_id: 1, chords: { 1: { note: 'C' } }, lyrics: { 1: 'life', 2: 'life', 3: 'life' } },
  { section_id: 1, chords: { 1: { note: 'C', suffix: 'm' } }, lyrics: { 1: '', 2: '', 3: '(to outtro)' } },
  { section_id: 1, chords: { 1: { note: 'G', bassNote: 'B' } }, lyrics: { 1: 'you were only', 2: 'you were only' } },
  { section_id: 1, chords: { 1: { note: 'A', suffix: '7' } }, lyrics: { 1: 'waiting for this', 2: 'waiting for this' } },
  { section_id: 1, chords: { 1: { note: 'D', suffix: '7' } }, lyrics: { 1: 'moment to a-', 2: 'moment to be' } },
  { section_id: 1, chords: { 1: { note: 'G' } }, lyrics: { 1: 'rise', 2: 'free' } },
  { section_id: 1, chords: { 1: { note: '%' } }, lyrics: { 1: '', 2: '(to bridge)' } },
  { section_id: 1, chords: { 1: { note: 'C' } } },
  { section_id: 1, chords: { 1: { note: 'G', bassNote: 'B' } } },
  { section_id: 1, chords: { 1: { note: 'A', suffix: '7' }, 3: { note: 'D', suffix: '7sus4' } } },
  { section_id: 1, chords: { 1: { note: 'G' } } },

  { section_id: 2, chords: { 1: { note: 'F' }, 3: { note: 'C', bassNote: 'E' } }, lyrics: { 1: 'Black-' } },
  { section_id: 2, chords: { 1: { note: 'D', suffix: 'm' }, 3: { note: 'C' } }, lyrics: { 1: 'bird' } },
  { section_id: 2, chords: { 1: { note: 'B', suffix: 'b6' } }, lyrics: { 1: 'fly' } },
  { section_id: 2, chords: { 1: { note: 'C' } } },
  { section_id: 2, chords: { 1: { note: 'F' }, 3: { note: 'C', bassNote: 'E' } }, lyrics: { 1: 'Black-' } },
  { section_id: 2, chords: { 1: { note: 'D', suffix: 'm' }, 3: { note: 'C' } }, lyrics: { 1: 'bird' } },
  { section_id: 2, chords: { 1: { note: 'B', suffix: 'b6' } }, lyrics: { 1: 'fly' } },
  { section_id: 2, chords: { 1: { note: 'A' } }, lyrics: { 1: 'into the' } },
  { section_id: 2, chords: { 1: { note: 'D', suffix: '7sus4' } }, lyrics: { 1: 'light of a dark black' } },
  { section_id: 2, chords: { 1: { note: 'G' } }, lyrics: { 1: 'night' } },
  { section_id: 2, chords: { 1: { note: 'A', suffix: 'm7' }, 3: { note: 'G', bassNote: 'B' } } },
  { section_id: 2, chords: { 1: { note: 'G' } } },

  { section_id: 3, chords: { 1: { note: 'C' }, 3: { note: 'G', bassNote: 'B' } }, lyrics: { 1: 'you were only' } },
  { section_id: 3, chords: { 1: { note: 'A', suffix: '7' } }, lyrics: { 1: 'waiting for this' } },
  { section_id: 3, chords: { 1: { note: 'D', suffix: '7' } }, lyrics: { 1: 'moment to a-' } },
  { section_id: 3, chords: { 1: { note: 'G' } }, lyrics: { 1: 'rise' } },

]

const chartData = {
  chartMetaData,
  sections,
  measures,
}

/**
 * Add chart to db
 * @function
 * @param {object} chart - Object containing chart metadata
 * @return {undefined} - resolves to id of added chart
 */
const addChart = async (chart) => {
  const query = `
    INSERT INTO charts
      (title,
      author,
      composer,
      lyricistSame,
      originalKeyCode,
      printKeyCode)
    VALUES ($/title/, $/author/, $/composer/, $/lyricistSame/, $/originalKeyCode/, $/printKeyCode/)
    RETURNING chartId`
  try {
    await db.query(query, chart)
    if (VERBOSE) console.log('Added chart')
  } catch (err) {
    console.log(`FAILED TO ADD CHART: ${err}`)
    process.exit(1)
  }
}


/**
 * Add sections to db for chart ID 1
 * @function
 * @param {array} sectionData - Array containing objects of section data
 * @return {undefined}
 */
const addSections = async (sectionData) => {
  const query = `
    INSERT INTO sections
      (chartId,
      index,
      sectionName,
      sectionDesc,
      beatsPerMeasure,
      verseCount)
    VALUES ($/chartId/, $/index/, $/sectionName/, $/sectionDesc/, $/beatsPerMeasure/, $/verseCount/)`

  try {
    if (VERBOSE) console.log('adding sections')
    for (const section of sectionData) {
      await db.query(query, section)
      if (VERBOSE) console.log(`added section ${section.sectionName}`)
    }
  } catch (err) {
    throw err
  }
}

/**
 * Add measures to db for section IDs 1 and 2
 * @function
 * @param {array} measureData - array of objects containing measture data
 * @return {undefined}
 */
const addMeasures = async (measureData) => {
  const measureQuery = 'INSERT INTO measures (sectionId, index) VALUES ($1, $2) RETURNING measureId'
  const chordQuery = `
    INSERT INTO chords (measureId, beatIndex, noteCode, suffix, bassNoteCode)
    VALUES ($1, $2, $3, $4, $5)`
  const lyricQuery = `
    INSERT INTO lyrics (measureId, verseIndex, lyricText)
    VALUES ($1, $2, $3)`

  try {
    if (VERBOSE) console.log('adding measures')
    await Promise.all(measureData.map(async (measure, index) => {
      const response = await db.one(measureQuery, [measure.section_id, index])
      const measureId = response.measureid
      const chordLyricPromises = []
      for (const [chordIndex, chord] of Object.entries(measure.chords)) {
        chordLyricPromises.push(db.query(chordQuery,
          [measureId, chordIndex, chord.note, chord.suffix, chord.bassNote]))
      }
      if (measure.lyrics) {
        for (const [lyricIndex, lyricText] of Object.entries(measure.lyrics)) {
          chordLyricPromises.push(db.query(lyricQuery, [measureId, lyricIndex, lyricText]))
        }
      }
      await Promise.all(chordLyricPromises).catch((err) => {
        console.error(err)
        process.exit(1)
      })
      if (VERBOSE) console.log(`added measure ${index}`)
    }))
      .catch(console.error)
  } catch (err) {
    throw err
  }
}

/**
 * Add all parts of a chart
 * @return {Promise} - resolution unimportant
 */
const addEntireChart = async () => {
  await addChart(chartData.chartMetaData)
  await addSections(chartData.sections)
  await addMeasures(chartData.measures)
}

if (!module.parent) {
  addEntireChart().then(pgp.end)
}

module.exports = {
  addEntireChart,
  chartData,
}
