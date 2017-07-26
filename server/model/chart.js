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
var procError = require('../utilities/err')

var db = require('./db')
var section = require('./section')
var user = require('./user')
var key = require('./note-key')

// const User = user.User
// const Key = key.Key

// for keyId fields
// const referencesKey = {
//   type: Sequelize.INTEGER(3),
//   references: {
//     model: Key,
//     key: 'keyId',
// }

 //////////////////////////////////////////////////////////////////////////////
 // Chart
 //////////////////////////////////////////////////////////////////////////////

 //////////
 // table
 const Chart = db.sequelize.define('chart', {
   chartId: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },

   // text metadata
   title: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   author: { type: Sequelize.STRING },
   composer: { type: Sequelize.STRING },
   lyricist: { type: Sequelize.STRING },

   // is the lyricist the same as the composer?
   lyricistSame: {
     type: Sequelize.BOOLEAN,
     default: false,
   },

   // key
  //  originalKey: referencesKey,
  //  printKey: referencesKey,

   // chart pdf properties
   maxPages: {
     type: Sequelize.INTEGER,
     default: 1,
   },
   minFontsize: {
     type: Sequelize.INTEGER,
     default: 10,
   },
   pageWidth: {
     type: Sequelize.FLOAT,
     default: 8.5,
   },
   pageHeight: {
     type: Sequelize.FLOAT,
     default: 11,
   },
   pageUnits: {
     type: Sequelize.STRING,
     default: 'inches',
   }
 })

 ////////////////
 // associations

 Chart.belongsTo(user.User)
 // user.User.hasMany(Chart)

 Chart.belongsTo(key.Key, {as: 'originalKey', foreignKey : 'KeyId'});
 Chart.belongsTo(key.Key, {as: 'printKey', foreignKey : 'KeyId'});

 // user_id (many to many?)

 // # chart key
 // original_key = db.Column(db.String(2), db.ForeignKey('keys.key_code'))
 // print_key = db.Column(db.String(2),
 //                       db.ForeignKey('keys.key_code'),
 //                       nullable=True)
 //


 ///////////
 // methods

Chart.getById = function(chartId) {
  return this.find({
    where: { chartId: chartId },
    options: { raw: true }
  })
   .then(c => c.getSections()
     .then(sections => {
       c.sections = sections
       return Promise.resolve(c)
     }))
}

Chart.getSections = function() {
  // Get sections for a chart.
  // Returns promise<Section[]>
  return section.Section.getChartSections(this.chartId)
}

Chart.setChart = function(chartData) {
  // Update existing chart.

  const sections = chartData.sections
  const chartId = chartData.chartId
  delete chartData.sections
  delete chartData.chartId

  // findOrCreate
  Chart.update(chartData, {
    where: { chartId: chartData.chartId },
    options: {
      // fields: [],
      logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
    })
    .then((num, chartRow) => {
      // num = number of rows updated
      if (num) {
        // blow away existing sections
        chartRow.clearSections()
        sections.forEach(s => {
          s.chartId = chartData.chartId
          section.Section.setSection(s)
        })
      } else {
        return procErr(null, `Could not find chartId ${chartData.chartId}`)
      }
    })
    .catch(err => {
      msg = `Could not update chart id ${chartData.chartId}: ${err}`
      return procError(err, msg)
    })
}

Chart.clearSections = function() {
  // clear any existing sections to write new data
  Section.destroy({ options: { where: { chartId: this.chartId }}})
}

Chart.createChart = function(chartData) {
  // Create new chart.

  Chart.create({
    options: {
      // fields: [],
      logging: msg => { logger.info(`SEQUELIZE ${msg}`) }}
    })
    .then(newChart => {
      chartData.chartId = newChart.chartId
      return Chart.setChart(chartData)
    })
    .catch(err => {
      return procError(err, `Could not create chart from ${chartData}`)
    })
}

 // def clear(self):
 //     """Clear out chart data to prepare for re-save."""
 //
 //     self.title = None
 //     self.author = None
 //     self.composer = None
 //     self.lyricist = None
 //     self.originalKey = None
 //     self.printKey = None
 //     self.maxPages = None
 //     self.minFontSize = None
 //     self.sections = []
 //
 // def update(self, data):
 //     """Update chart with the supplied data and sections."""
 //
 //     # first set the metadata
 //     self.set_data(data)
 //
 //     # update the modified date
 //     self.modified_at = datetime.now()
 //
 //     # finally, add and commit to db
 //     db.session.add(self)
 //     db.session.commit()


 module.exports = { Chart: Chart }
