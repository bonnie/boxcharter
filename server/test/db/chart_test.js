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
 * Tests for the chart model.
 * @module chart_test
 */
const { addToDbSuccessTests, addToDbFailTests } = require('../utilities/add_db_tests')
const { getChildrenSuccessTests } = require('../utilities/getchildren_tests')
const { chartData } = require('../utilities/add_chart')

const { Chart } = require('../../db/model/chart_db')
const { Section } = require('../../db/model/section_db')
const { User } = require('../../db/model/user_db')

// //////////////////////////////////////////////////////////////////////////////
// SUCCESS addToDb
// //////////////////////////////////////////////////////////////////////////////

/**
 * Add chart
 * @param  {Chart}  chart - chart instance
 * @return {Promise}            Promise resolving to the chart's id in the database
 */
const addChart = async chart => chart.addToDb()

const successCharts = [
  { descString: 'chart with only necessary metadata', item: new Chart({ title: 'my new chart' }) },
  { descString: 'chart with all metadata',
    item: new Chart({
      title: 'charty chart',
      author: 'chart auth',
      composer: 'chart comp',
      lyricist: 'chart lyricist',
      lyricistSame: false,
      originalKeyCode: 'Bb',
      printKeyCode: 'F#m',
      maxPages: 1,
      minFontsize: 10,
      pageWidth: 8.5,
      pageHeight: 11,
      pageUnits: 'inches' }),
  },
]

addToDbSuccessTests('chart', successCharts, Chart.fields, addChart)

// //////////////////////////////////////////////////////////////////////////////
// FAILURE addToDb
// //////////////////////////////////////////////////////////////////////////////

const failureCharts = [
  { descString: 'the chart is missing a title', item: new Chart({}) },
]

addToDbFailTests('chart', failureCharts, () => {})

// ///////////////////////////////////////////////////////
// Get children tests
// ///////////////////////////////////////////////////////

const childTests = [
  { chartId: 1 },
]

childTests.forEach((test) => {
  // sections
  getChildrenSuccessTests({
    idQueryFunc: () => Object({ chartid: test.chartId }),
    idQueryArgs: [],
    parentType: 'chart',
    parentClass: 'Chart',
    childType: 'section',
    childClass: Section,
    orderBy: 'index',
    childFunc: 'getSections',
    expectedChildCount: Object.keys(chartData[test.chartId - 1].sections).length,
  })
  // users
  getChildrenSuccessTests({
    idQueryFunc: () => Object({ chartid: test.chartId }),
    idQueryArgs: [],
    parentType: 'chart',
    parentClass: 'Chart',
    childType: 'user',
    childClass: User,
    orderBy: 'index',
    childFunc: 'getUsers',
    expectedChildCount: chartData[test.chartId - 1].users.length,
  })
})
