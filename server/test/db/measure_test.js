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
 * Tests for the measure model.
 * @module measure_test
 */
const { createSection } = require('../utilities/create_items')
const { addToDbSuccessTests, addToDbFailTests } = require('../utilities/add_db_tests')
const { getChildrenSuccessTests } = require('../utilities/getchildren_tests')
const { chartData } = require('../utilities/add_chart')
const { db } = require('../../db/db_connection')
const { Measure } = require('../../db/model/measure_db')
const { Chord, Lyric } = require('../../db/model/chord-lyric_db')

// //////////////////////////////////////////////////////////////////////////////
// SUCCESS addToDb
// //////////////////////////////////////////////////////////////////////////////

/**
 * Add measure
 * @param  {Measure}  measure - measure instance
 * @return {Promise}            Promise resolving to the measure's id in the database
 */
const addMeasure = async (measure) => {
  // make a fake section to insert measure into
  const section = await createSection()
  measure.sectionId = section.sectionid
  return measure.addToDb()
}

const successMeasures = [
  { descString: 'measure with no beatsPerMeasure', item: new Measure({ index: 0 }) },
  { descString: 'measure with beatsPerMeasure', item: new Measure({ index: 1, beatsPerMeasure: 2 }) },
]

addToDbSuccessTests('measure', successMeasures, Measure.fields, addMeasure)

// //////////////////////////////////////////////////////////////////////////////
// FAILURE addToDb
// //////////////////////////////////////////////////////////////////////////////

/**
 * Preparation function for failure tests
 * @return {Promise} - measureId for created measure
 */
const failPrepare = async () => {
  // make a fake section to insert chord into;
  // assume there will be a section with id 1 after this
  await createSection()
}

const failureMeasures = [
  { descString: 'the sectionId doesn\'t exist in the db', item: new Measure({ sectionId: -1, index: 0 }) },
  { descString: 'the measure is missing a sectionId', item: new Measure({ index: 0 }) },
  { descString: 'the measure is missing an index', item: new Measure({ sectionId: 1 }) },
]

addToDbFailTests('measure', failureMeasures, failPrepare)

const getMeasureId = function (measureIndex, sectionIndex) {
  return db.one(
    'SELECT measureId FROM measures WHERE index=$1 AND sectionId=(SELECT sectionId FROM sections WHERE index=$2)',
    [measureIndex, sectionIndex])
    .catch(console.error)
}

const childTests = [
  { measureIndex: 0, sectionIndex: 0 },
]

const childSubTests = [
  { class: Chord, type: 'chord', orderBy: 'beatsPerMeasure', childFunc: 'getChords' },
  { class: Lyric, type: 'lyric', orderBy: 'verseIndex', childFunc: 'getLyrics' },
]

const parentType = 'measure'
const parentClass = 'Measure'

childTests.forEach((test) => {
  // const measureIdPromise = getMeasureId(test.measureIndex, test.sectionIndex)
  // const queryFunc = () => 1
  childSubTests.forEach((childSubTest) => {
    getChildrenSuccessTests({
      idQueryFunc: getMeasureId,
      idQueryArgs: [test.measureIndex, test.sectionIndex],
      parentType,
      parentClass,
      childType: childSubTest.type,
      childClass: childSubTest.class,
      orderBy: childSubTest.orderBy,
      childFunc: childSubTest.childFunc,
      expectedChildCount: Object.keys(chartData.measures[test.measureIndex][`${childSubTest.type}s`]).length,
    })
  })
})