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
 * Object used to make instances of dynamic class names.
 * @module instance_factory
 */

const { logger } = require('../../utilities/log')
const Chord = require('../db_chord')
const Lyric = require('../db_lyric')
const Measure = require('../db_measure')
const Section = require('../db_section')
const Chart = require('../db_chart')

const instanceFactory = {
  /**
   * Return an instance of a class from the class's string
   * @param  {string} className class name as a string
   * @param  {object} data      data for new class instance
   * @return {any}              instance of the class
   */
  getInstance(className, data) {
    if (this.classes[className]) {
      return new this.classes[className](data)
    }
    logger.crit(`Could not instantiate ${className}`)
    return null
  },
  classes: {
    Chart,
    Section,
    Measure,
    Chord,
    Lyric,
  },
}

module.exports = {
  instanceFactory,
}
