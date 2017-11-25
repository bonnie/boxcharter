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
const { db } = require('../../db/db_connection')
const { Section } = require('../../db/model/section_db')
const { Measure } = require('../../db/model/measure_db')

const { createChart } = require('../utilities/create_items')
const { chartData } = require('../utilities/add_chart')
const { addToDbSuccessTests, addToDbFailTests } = require('../utilities/add_db_tests')
const { getChildrenSuccessTests } = require('../utilities/getchildren_tests')

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
  return section.addToDb(chart.chartid)
}

const successSections = [
  { descString: 'section with only necessary metadata',
    item: new Section({ index: 0, beatsPerMeasure: 4, verseCount: 1 }) },
  { descString: 'section with all metadata',
    item: new Section({
      index: 1,
      sectionName: 'three word name',
      sectionDesc: 'description is this',
      beatsPerMeasure: 4,
      verseCount: 3,
      pickupMeasureBeats: 2 }) },
]

addToDbSuccessTests('section', successSections, Section.fields, addSection)

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

const failureSections = [
  { descString: 'the chartId doesn\'t exist in the db',
    item: new Section({
      chartId: -1,
      index: 0,
      beatsPerMeasure: 4,
      verseCount: 1 }) },
  { descString: 'the section is missing a chartId',
    item: new Section({
      index: 0,
      beatsPerMeasure: 4,
      verseCount: 1 }) },
  { descString: 'the section is missing an index',
    item: new Section({
      chartId: 1,
      beatsPerMeasure: 4,
      verseCount: 1 }) },
  { descString: 'the section is missing beatsPerMeasure',
    item: new Section({
      chartId: 1,
      index: 0,
      verseCount: 1 }) },
  { descString: 'the section is missing verseCount',
    item: new Section({
      chartId: 1,
      index: 0,
      beatsPerMeasure: 4 }) },
]

addToDbFailTests('section', failureSections, failPrepare)

// ///////////////////////////////////////////////////////
// Get children tests
// ///////////////////////////////////////////////////////

const getMeasureId = function (sectionIndex, chartId) {
  return db.one(
    'SELECT sectionId FROM sections WHERE index=$1 AND chartId=$2',
    [sectionIndex, chartId])
    .catch(console.error)
}

const childTests = [
  { sectionIndex: 0, chartId: 1 },
  { sectionIndex: 2, chartId: 1 },
]

childTests.forEach((test) => {
  getChildrenSuccessTests({
    idQueryFunc: getMeasureId,
    idQueryArgs: [test.sectionIndex, test.chartId],
    parentType: 'section',
    parentClass: 'Section',
    childType: 'measure',
    childClass: Measure,
    orderBy: 'index',
    childFunc: 'getMeasures',
    expectedChildCount:
      Object.keys(
        chartData[test.chartId - 1].measures.filter(
          measure => measure.section_id === test.sectionIndex + 1)
      ).length,
  })
})
