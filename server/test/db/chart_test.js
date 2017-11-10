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
const { createChart } = require('../utilities/create_items')
const { addToDbSuccessTests, addToDbFailTests } = require('../utilities/add_db_tests')
const { Chart } = require('../../db/model/chart_db')

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
  { descString: 'chart with only necessary metadata', item: new Chart('my new chart') },
  { descString: 'chart with all metadata',
    item: new Chart('charty chart', 'chart auth', 'chart comp',
      'chart lyricist', false, 'Bb', 'F#m', 1, 10, 8.5, 11, 'inches'),
  },
]

const chartFields = [
  'chartId',
  'title',
  'author',
  'composer',
  'lyricist',
  'lyricistSame',
  'originalKeyCode',
  'printKeyCode',
  'maxPages',
  'minFontsize',
  'pageWidth',
  'pageHeight',
  'pageUnits',
]

addToDbSuccessTests('chart', successCharts, chartFields, addChart)

// //////////////////////////////////////////////////////////////////////////////
// FAILURE addToDb
// //////////////////////////////////////////////////////////////////////////////

// const failureCharts = [
//   { descString: 'the chartId doesn\'t exist in the db', item: new Chart(-1, 0, null, null, 4, 1, null) },
//   { descString: 'the chart is missing a chartId', item: new Chart(null, 0, null, null, 4, 1, null) },
//   { descString: 'the chart is missing an index', item: new Chart(1, null, null, null, 4, 1, null) },
//   { descString: 'the chart is missing beatsPerMeasure', item: new Chart(1, 0, null, null, null, 1, null) },
//   { descString: 'the chart is missing verseCount', item: new Chart(1, 0, null, null, 4, null, null) },
// ]
//
// addToDbFailTests('chart', failureCharts, addChart)
