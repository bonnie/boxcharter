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
const { Measure } = require('../../db/model/measure_db')

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
  return measure.addToDb(section.sectionid)
}

const successMeasures = [
  { descString: 'measure with no beatsPerMeasure', item: new Measure(0) },
  { descString: 'measure with beatsPerMeasure', item: new Measure(1, 2) },
]

const measureFields = ['measureId', 'sectionId', 'index', 'beatsPerMeasure']

addToDbSuccessTests('measure', successMeasures, measureFields, addMeasure)

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
  { descString: 'the sectionId doesn\'t exist in the db', item: new Measure(0), args: [-1] },
  { descString: 'the measure is missing a sectionId', item: new Measure(0), args: [null] },
  { descString: 'the measure is missing an index', item: new Measure(), args: [null] },
]

addToDbFailTests('measure', failureMeasures, failPrepare)
