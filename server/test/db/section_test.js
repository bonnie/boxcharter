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
 * Tests for the section model.
 * @module section_test
 */
const { createChart } = require('../utilities/create_items')
const { addToDbSuccessTests, addToDbFailTests } = require('../utilities/add_db_tests')
const { Section } = require('../../db/model/section_db')

// //////////////////////////////////////////////////////////////////////////////
// SUCCESS addToDb
// //////////////////////////////////////////////////////////////////////////////

/**
 * Add section
 * @param  {Section}  section - section instance
 * @return {Promise}            Promise resolving to the section's id in the database
 */
const addSection = async (section) => {
  // make a fake chart to insert section into
  const chart = await createChart()
  section.chartId = chart.chartid
  return section.addToDb()
}

const successSections = [
  { descString: 'section with only necessary metadata', item: new Section(null, 0, null, null, 4, 1, null) },
  { descString: 'section with all metadata', item: new Section(null, 1, 'three word name', 'description is this', 4, 3, 2) },
]

const sectionFields = [
  'sectionId',
  'chartId',
  'index',
  'sectionName',
  'sectionDesc',
  'beatsPerMeasure',
  'verseCount',
  'pickupMeasureBeats']

addToDbSuccessTests('section', successSections, sectionFields, addSection)

// //////////////////////////////////////////////////////////////////////////////
// FAILURE addToDb
// //////////////////////////////////////////////////////////////////////////////

/**
 * Preparation function for failure tests
 * @return {Promise} - sectionId for created section
 */
const failPrepare = async () => {
  // make a fake chart to insert section into;
  // assume there will be a chart with id 1 after this
  await createChart()
}

// const failureSections = [
//   { descString: 'the sectionId doesn\'t exist in the db', item: new Section(-1, 0) },
//   { descString: 'the section is missing a sectionId', item: new Section(null, 0) },
//   { descString: 'the section is missing an index', item: new Section(1) },
// ]
//
// addToDbFailTests('section', failureSections, failPrepare)
