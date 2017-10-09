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
 * @return { undefined }
 */
const logError = (err, msg) => {
  console.error(`ERROR: ${msg}. ${err.toString()}`)
  process.exit(1)
}

/**
 * Add all the notes to the db, so they'll be there for the keys
 * @function
 * @return { undefined }
 */
const addNotes = () => {
  const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const accs = ['b', '', '#']
  const allNotes = []
  notes.forEach(note => accs.forEach(acc => allNotes.push(`${note}${acc}`)))
  return Promise.all(allNotes.map(note =>
    db.one(DB_COMMANDS.insertNote, [note])
      .then((noteRow) => {
        if (VERBOSE) console.log(`Added note ${noteRow.noteCode}`)
      })
      .catch(noteErr =>
        logError(noteErr, `Could not add note ${note}`),
      )
  ))
}

/**
 * Add a key and its corresponding notes to the db
 * @function
 * @param {string} key - the tonic for the key
 * @param {string} notes - the notes for the key
 * @return {Promise} - value not important; synchronicity is
 */
const addKeyNotes = (key, notes) =>
  db.one(DB_COMMANDS.insertKey, [key])
    .then(() => {
      // add the scale notes
      if (VERBOSE) console.log(`added key ${key}`)
      return Promise.all(notes.map((note, index) =>
        db.query(DB_COMMANDS.insertScaleNote, [key, note, index + 1])
          .catch(noteErr =>
            logError(noteErr,
              `Could not insert scale note for key ${key}, note: ${note}`))
      ))
    })
    .catch(keyErr => logError(keyErr, `Could not insert key ${key}`))

/**
 * Read scales from file and build keys and scale_notes tables
 * @function
 * @return { undefined }
 */
const addScales = () =>
  fs.readFile(KEYFILE, 'ascii', (err, data) => {
    if (err) {
      logError(err, `Problem reading file: ${err.toString()}`)
    }

    // othersiwe, parse the data and add keys to db
    return data.split('\n').forEach((keyLine) => {
      if (!keyLine) { return 'bad key line data' }
      // example line: Ab,Ab,Bb,C,Db,Eb,F,G
      const notes = keyLine.split(',')
      const key = notes[0]
      return addKeyNotes(key, notes.slice(1))
        .catch(console.error)
    })
  })

/**
 * Run both functions to add notes and scales
 * @function
 * @return { Promise } Promise data not important; synchronicity is
 */
const addKeys = () =>
  addNotes()
    .then(addScales)
    .catch(console.error)

module.exports = {
  addKeys,
}
