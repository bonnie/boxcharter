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
 * Tests for the chord-lyric db functions.
 * @module chord-lyric_test
 */
const { createMeasure } = require('../utilities/create_items')
const { addToDbSuccessTests, addToDbFailTests } = require('../utilities/add_db_tests')
const Chord = require('../../src/model/db_chord')
const Lyric = require('../../src/model/db_lyric')

const types = ['chord', 'lyric']

// //////////////////////////////////////////////////////////////////////////////
// SUCCESS
// //////////////////////////////////////////////////////////////////////////////

/**
 * Add chord or lyric
 * @param  {object}  item Chord or Lyric instance
 * @return {Promise}      Promise resolving to the item's id in the database
 */
const addItem = async (item) => {
  // make a fake chart/section/measure to insert item into
  const measure = await createMeasure()
  return item.addToDb(measure.measureid)
}

const successItems = {
  chord: [
    { descString: 'chord with no suffix, no bass note',
      item: new Chord({ beatindex: 0, noteCode: 'G' }) },
    { descString: 'chord with bass note, no suffix',
      item: new Chord({ beatindex: 1, noteCode: 'C#', baseNoteCode: 'E' }) },
    { descString: 'chord with suffix, no bass note',
      item: new Chord({ beatindex: 2, noteCode: 'Bb', suffix: 'dim' }) },
    { descString: 'chord with suffix, bass note',
      item: new Chord({ beatindex: 3, noteCode: 'A', bassNoteCode: 'B', suffix: 'm7b5' }) },
  ],
  lyric: [
    { descString: 'lyric with non-empty text',
      item: new Lyric({ verseindex: 0, lyrictext: 'joy to the world' }) },
    { descString: 'lyric with empty text',
      item: new Lyric({ verseindex: 1, lyrictext: '' }) },
  ],
}

const fields = {
  chord: ['chordId', 'measureId', 'beatIndex', 'noteCode', 'bassNoteCode', 'suffix'],
  lyric: ['lyricId', 'measureId', 'verseIndex', 'lyricText'],
}

types.forEach(type => addToDbSuccessTests(type, successItems[type], fields[type], addItem))

// //////////////////////////////////////////////////////////////////////////////
// FAILURES
// //////////////////////////////////////////////////////////////////////////////

/**
 * Preparation function for failure tests
 * @return {Promise} - measureId for created measure
 */
const failPrepare = async () => {
  // make a fake measure to insert chord into;
  // assume there will be a measure with id 1 after this
  await createMeasure()
}

const failureItems = {
  chord: [
    { descString: 'the measureId doesn\'t exist in the db',
      item: new Chord({ measureid: -1, beatindex: 0, notecode: 'G' }) },
    { descString: 'the chord is missing a measureId',
      item: new Chord({ beatindex: 0, notecode: 'G' }) },
    { descString: 'the chord is missing a beatIndex',
      item: new Chord({ measureid: 1, notecode: 'G' }) },
    { descString: 'the noteCode is not in the notes table',
      item: new Chord({ measureid: 1, beatindex: 1, notecode: 'X' }) },
    { descString: 'the bassNoteCode is not in the notes table',
      item: new Chord({ measureid: 1, beatindex: 1, notecode: 'G', bassnotecode: '5' }) },
    { descString: 'the chord is missing a note code',
      item: new Chord({ measureid: 1, beatindex: 0 }) },
  ],
  lyric: [
    { descString: 'the measureId doesn\'t exist in the db',
      item: new Lyric({ measureid: -1, verseindex: 0, lyrictext: 'la la la' }) },
    { descString: 'the lyric is missing an index',
      item: new Lyric({ measureid: 1 }) },
  ],
}

types.forEach(type => addToDbFailTests(type, failureItems[type], failPrepare))
