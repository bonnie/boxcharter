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
 * Add notes and scales. To be done once when tables are created.
 * @module add_keys
 */
const db = require('../db_connection').db
const fs = require('fs')

const VERBOSE = process.env.NODE_ENV === 'production'

// assuming this will be run from an npm script; working dir is top of proj
const KEYFILE = './server/db/seed/keys.csv'

const DB_COMMANDS = {
  insertNote: 'INSERT INTO notes (noteCode) VALUES ($1) RETURNING noteCode',
  insertKey: 'INSERT INTO keys (keyCode) VALUES ($1) RETURNING keyCode',
  insertScaleNote: `INSERT INTO scale_notes (keyCode, noteCode, scaleDegree)
                      VALUES ($1, $2, $3)`,
}

/**
 * Function for logging and rethrowing errors
 * @function
 * @param {Error} err - Error to be reported and thrown
 * @param {string} msg - Message to accompany the error
 * @return {undefined}
 */
const logError = (err, msg) => {
  console.error(`ERROR: ${msg}. ${err.toString()}`)
  process.exit(1)
}

/**
 * Add all the notes to the db, so they'll be there for the keys
 * @function
 * @return {array} - an array of promises, containing the resolution of each insert
 */
const addNotes = async () => {
  const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const accs = ['b', '', '#']
  const allNotes = []
  notes.forEach(note => accs.forEach(acc => allNotes.push(`${note}${acc}`)))
  allNotes.push('%')
  await Promise.all(allNotes.map(async (note) => {
    try {
      const noteRow = await db.one(DB_COMMANDS.insertNote, [note])
      if (VERBOSE) console.log(`Added note ${noteRow.noteCode}`)
    } catch (err) {
      logError(err, `Could not add note ${note}`)
    }
  }))
}

/**
 * Add a key and its corresponding notes to the db
 * @function
 * @param {string} key - the tonic for the key
 * @param {string} notes - the notes for the key
 * @return {undefined}
 */
const addKeyNotes = async (key, notes) => {
  try {
    await db.one(DB_COMMANDS.insertKey, [key])
    if (VERBOSE) console.log(`added key ${key}`)
  } catch (err) {
    logError(err, `Could not insert key ${key}`)
  }
  await Promise.all(notes.map(async (note, index) => {
    try {
      await db.query(DB_COMMANDS.insertScaleNote, [key, note, index + 1])
    } catch (err) {
      logError(err, `Could not insert scale note for key ${key}, note: ${note}`)
    }
  }))
}

/**
 * Read scales from file and build keys and scale_notes tables
 * @function
 * @return {undefined}
 */
const addScales = async () => {
  try {
    const keyData = fs.readFileSync(KEYFILE, 'ascii')
    await keyData.split('\n').forEach(async (keyLine) => {
      if (keyLine) {
        // example line: Am,A,B,C,D,E,F,G
        const notes = keyLine.split(',')
        const key = notes[0]
        await addKeyNotes(key, notes.slice(1))
      }
    })
  } catch (err) {
    logError(err, `Problem adding scales: ${err.toString()}`)
  }
}
/**
 * Run both functions to add notes and scales
 * @function
 * @return {undefined}
 */
const addKeys = async () => {
  try {
    await addNotes()
    await addScales()
  } catch (err) {
    logError(err, `Adding keys failed: ${err.toString()}`)
  }
}

module.exports = {
  addKeys,
}
