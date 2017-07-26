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

var Sequelize = require('Sequelize')
var logger = require('../utilities/log').logger

var db = require('./db')
var chart = require('./chart')
var measure = require('./measure')

// for associations
// const Chart = chart.Chart

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

const Section = db.sequelize.define('section', {
  sectionId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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

  // can't do these as associations because it causes cyclic references
  // ending1Start: referencesMeasure,
  // ending1End: referencesMeasure,
  // ending2Start: referencesMeasure,

})
 //////////
 // table

 ////////////////
 // associations


 // TODO: these next two lines were commented when I couldn't require this file
 // from chart_routes.js with them uncommented. I got this error:
 // /Users/bonnie/src/boxcharter/client/node_modules/Sequelize/lib/associations/mixin.js:80
 //     if (!target.prototype || !(target.prototype instanceof this.sequelize.Model)) {
 //                ^
 //
 // TypeError: Cannot read property 'prototype' of undefined
 //     at Function.<anonymous> (/Users/bonnie/src/boxcharter/client/node_modules/Sequelize/lib/associations/mixin.js:80:16)
 //     at Object.<anonymous> (/Users/bonnie/src/boxcharter/server/model/section.js:92:10)
 // Section.belongsTo(chart.Chart)
 // Section.belongsToMany(measure.Measure, { through: measure.Measure })
 // END: TODO

 // chart.Chart.hasMany(Section) // order_by section id

 // chart_id = db.Column(db.Integer, db.ForeignKey("charts.chart_id"))



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
