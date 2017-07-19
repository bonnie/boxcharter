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

 Section.belongsTo(chart.Chart)
 Section.belongsToMany(measure.Measure, { through: measure.Measure })
 // chart.Chart.hasMany(Section) // order_by section id

 // chart_id = db.Column(db.Integer, db.ForeignKey("charts.chart_id"))



 ///////////
 // methods

 module.exports = {
   Section: Section,
 };
