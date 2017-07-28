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

const Sequelize = require('Sequelize')
const logger = require('../utilities/log').logger

const db = require('./db')
const Chart = require('./chart').Chart
const measure = require('./measure')

// for measureId fields
const referencesMeasure = {
  type: Sequelize.INTEGER,
  references: {
    model: measure.Measure,
    key: 'measureId',
  }
}

 //////////////////////////////////////////////////////////////////////////////
 // Section
 //////////////////////////////////////////////////////////////////////////////

 //////////
 // table

const Section = db.sequelize.define('section', {
  sectionId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chartId: {
    type: Sequelize.INTEGER,
    references: {
      model: Chart,
      key: 'chartId',
      allowNull: false,
    }
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // metadata
  sectionName: { type: Sequelize.STRING },
  sectionDesc: { type: Sequelize.STRING },
  beatsPerMeasure: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  verseCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // layout
  measuresPerRow: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pickupMeasure: {
    type: Sequelize.BOOLEAN,
    default: false
  },
  // repeat
  repeat: {
    type: Sequelize.BOOLEAN,
    default: false,
  },

  ending1Start: referencesMeasure,
  ending1End: referencesMeasure,
  ending2Start: referencesMeasure,

})

 ///////////
 // methods

Section.setSection = function(sectionData) {
  // create new section for this chart with sectionData

  const measures = sectionData.measures
  delete sectionData.measures

  Section.create(sectionData, {
    options: {
      logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
    })
    .then(newSection => {
      logger.debug(`created new section ${sectionData}`)
      measures.forEach(m => {
        m.sectionId = newSection.sectionId
        measure.Measure.setMeasure(m)
      })
    })
    .catch(err => {
      throw (`Could not create section ${sectionData}: ${err}`)
    })

}

Section.getChartSections = function(chartId) {
  this.findAll({
    where: { chartId: chartId },
    options: { order: ['index'] },
    attributes: { exclude: ['sectionId'] },
    raw: true
  }).then(sections => {
    sectionsWithMeasures = sections.map(s => {
      s.measures = s.getMeasures()
      return s
    })
    return Promise.resolve(sectionsWithMeasures)
  })
}

Section.getMeasures = function() {
  return measure.Measure.getSectionMeasures(this.sectionId)
}


module.exports = {
  Section: Section,
};
