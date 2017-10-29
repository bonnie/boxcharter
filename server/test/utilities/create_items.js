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
 * Utilities to create dummy parent items for testing.
 * @module create_items
 */
const { db } = require('../../db/db_connection.js')

/**
 * Create a dummy chart for testing
 * @return {Promise} - Promise that resolves to an object with a chartid key
 */
const createChart = () =>
  db.one('INSERT INTO charts (title) VALUES ($1) RETURNING chartId', 'test_dummy')

/**
 * Create a dummy section for testing
 * @return {Promise} - Promise that resolves to an object with a sectionid key
 */
const createSection = async () => {
  const chart = await createChart()
  return db.one(`
    INSERT INTO sections
      (chartId, index, beatsPerMeasure, verseCount)
      VALUES ($1, $2, $3, $4)
      RETURNING sectionId`,
    [chart.chartid, 0, 4, 1])
}

/**
 * Create a dummy measure for testing
 * @return {Promise} - Promise that resolves to an object with a measureid key
 */
const createMeasure = async () => {
  const section = await createSection()
  return db.one(`
    INSERT INTO measures (sectionId, index)
      VALUES ($1, $2)
      RETURNING measureId`,
    [section.sectionid, 0])
}

module.exports = {
  createChart,
  createSection,
  createMeasure,
}
