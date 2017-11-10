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
 * Section model.
 * @module section
 */

/**
  * Section object.
  * @class
  */
class Section {
  /**
    * Section constructor.
    * @constructor
    * @param {number} chartId - id of the chart to which this section belongs
    * @param {number} index - position in the chart
    * @param {string} sectionName - name of the section
    * @param {string} sectionDesc - description of the section
    * @param {number} beatsPerMeasure - number of beats per measure
    * @param {number} verseCount - number of verses in the section
    * @param {number} pickupMeasureBeats - number of beats in the pickup measure.
    *                                      0 for no pickup measure.
    * @param {array} measures - array of Measure objects.
    */
  constructor(chartId, index, sectionName, sectionDesc, beatsPerMeasure,
    verseCount, pickupMeasureBeats, measures) {
    this.sectionId = null
    this.chartId = chartId
    this.index = index
    this.sectionName = sectionName
    this.sectionDesc = sectionDesc
    this.beatsPerMeasure = beatsPerMeasure
    this.verseCount = verseCount
    this.pickupMeasureBeats = pickupMeasureBeats
    this.chords = measures || []
  }
}

module.exports = {
  Section,
}
