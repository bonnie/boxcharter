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

/////////////////////////////////////////////////////////////////////
// Add notes and scales. To be done once when tables are created.
/////////////////////////////////////////////////////////////////////

const db = require('./db_connection').db
const fs = require('fs')

const addNotes = function() {
  // Add all the notes to the db, so they'll be there for the keys
  // With Sequelize, it's easier this way than checking as we go along.

  const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const ACC = ['b', '', '#']
  NOTES.map(baseNote => {
    ACC.map(acc => {
      note = baseNote + acc
      Note.create({noteCode: note})
        .then(n => {console.log(`Created note ${n.noteCode}`)})
        .catch(err => {console.error(`Failed to create note ${n.noteCode}: ${err}`)})
    })
  })
}


const addScales = function() {
  fs.readFile('../seed/keys.csv', 'ascii', (err, data) => {
    if (err) { return console.log(err); }

    // othersiwe, parse the data and add keys to db
    const keys = {}
    data.split('\n').map(keyLine => {

        // example line: Ab,Bb,C,Db,Eb,F,G
        const notes = keyLine.split(',')
        const tonic = notes[0]

        const scale_notes = notes.slice(1).map(
          (note, index) => {
            return { noteCode: note, scaleDegree: index }
          })

        // create key
        Key.create(
          {
            keyCode: tonic,
            scale_notes: scale_notes
          },
          {
            include: [ScaleNote]
        })
        .then(k => {console.log(`created key ${k.keyCode}`)})
        .catch(err => {console.error(`could not create key: ${err}`)})
      })
    })
}

const addNotesAndScales = function () {
  addNotes()
  addScales()
}

module.exports = addNotesAndScales
