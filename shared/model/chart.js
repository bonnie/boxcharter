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
 * Chart model.
 * @module chart
 */

/**
  * Chart object.
  * @class
  */
class Chart {
  /**
   * Chart constructor
   * @param  {string} title           title of chart
   * @param  {string} author          author of chart
   * @param  {string} composer        song composer
   * @param  {string} lyricist        song lyricist
   * @param  {boolean} lyricistSame    whether or not the lyricist is the same as the composer
   * @param  {string} originalKeyCode original key of the chart
   * @param  {string} printKeyCode    transposed key of the chart
   * @param  {number} maxPages        maximum pages for chart PDF
   * @param  {number} minFontsize     minimum font size for chart PDF
   * @param  {number} pageWidth       chart PDF page width
   * @param  {number} pageHeight      chart PDF page height
   * @param  {string} pageUnits       units for page dimension values (e.g. inches)
   * @param  {array} sections         array of Section objects
   */
  constructor(title, author, composer, lyricist, lyricistSame, originalKeyCode,
    printKeyCode, maxPages, minFontsize, pageWidth, pageHeight, pageUnits, sections) {
    this.chartId = null
    this.title = title
    this.author = author
    this.composer = composer
    this.lyricist = lyricist
    this.lyricistSame = lyricistSame
    this.originalKeyCode = originalKeyCode
    this.printKeyCode = printKeyCode
    this.maxPages = maxPages
    this.minFontsize = minFontsize
    this.pageWidth = pageWidth
    this.pageHeight = pageHeight
    this.pageUnits = pageUnits
    this.sections = sections || []
  }
}

module.exports = {
  Chart,
}
