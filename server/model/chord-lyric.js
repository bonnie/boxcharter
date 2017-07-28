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

// model for:
 // measures
 // chords
 // lyrics

var Sequelize = require('Sequelize')
var db = require('./db')
var logger = require('../utilities/log').logger

var Measure = require('./measure').Measure
var key = require('./note-key')

// for associations
const referencesMeasure = {
  type: Sequelize.INTEGER,
  references: {
    model: Measure,
    key: 'measureId',
    allowNull: false,
  }
}

//////////////////////////////////////////////////////////////////////////////
// Chord
//////////////////////////////////////////////////////////////////////////////

//////////
// table

const Chord = db.sequelize.define('chord', {
chordId: {
  type: Sequelize.INTEGER,
  autoIncrement: true,
  primaryKey: true,
},
measureId: referencesMeasure,
beatIndex: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
noteCode: {
  type: Sequelize.STRING(2),
  references: {
    model: key.Note,
    key: 'noteCode',
    allowNull: false,
  }
},
chordSuffix: { type: Sequelize.STRING(8) },
})

Chord.getChordstring = function() {
 // Return a string representing the chord

 return `${this.noteCode}${this.chordSuffix}`
}

Chord.setChord = function(chordData) {

 Chord.create(chordData, {
   options: {
     logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
   })
   .then(newMeasure => {
     logger.debug(`created new chord ${chordData}`)
   })
   .catch(err => {
     throw `Could not create chord ${chordData}: ${err}`
   })
}

///////////
// methods

// def get_chordstring(self):
//     """Return a string representing the chord."""
//
//     chordstring = self.note_code
//     if self.chord_suffix:
//         chordstring += self.chord_suffix
//
//     return chordstring

//////////////////////////////////////////////////////////////////////////////
// Lyric
//////////////////////////////////////////////////////////////////////////////

//////////
// table

const Lyric = db.sequelize.define('lyric', {
 lyricId: {
   type: Sequelize.INTEGER,
   autoIncrement: true,
   primaryKey: true,
 },
 measureId: referencesMeasure,
 verseIndex: {
   type: Sequelize.INTEGER,
   allowNull: false,
 },
 lyricText: {
   type: Sequelize.STRING,
 }
})

Lyric.setLyric = function(lyricData) {

 Lyric.create(lyricData, {
   options: {
     logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
   })
   .then(newMeasure => {
     logger.debug(`created new lyric ${lyricData}`)
   })
   .catch(err => {
     throw `Could not create lyric ${lyricData}: ${err}`
   })
}


///////////
// methods


// def get_data(self):
//     """Return all data for a measure in a JSON-friendly format."""
//
//     measure_data = {'beatsPerMeasure': self.beats_per_measure}
//
//     measure_data['chords'] = { chord.beat_index: chord.get_chordstring() for chord in self.chords }
//     measure_data['lyrics'] = { lyric.verse_index: lyric.lyric_text for lyric in self.lyrics }
//
//     return measure_data
//
// def set_data(self, data):
//     """Set data for the measure from given data dict."""
//
//     self.beats_per_measure = data.get('beatsPerMeasure')
//
//     for index, chordstring in data.get('chords', {}).items():
//
//         # TODO: deal with unparseable chords
//         if chordstring:
//             # ignore empty string (deleted chords)
//             note, suffix = parse_chord(chordstring)
//             chord = Chord(beat_index=index, note_code=note, chord_suffix=suffix)
//             self.chords.append(chord)
//
//     for index, text in data.get('lyrics', {}).items():
//         lyric = Lyric(verse_index=index, lyric_text=text)
//         self.lyrics.append(lyric)
//
//     db.session.add(self)
//     db.session.commit()

module.exports = {
 Chord: Chord,
 Lyric: Lyric,
}
