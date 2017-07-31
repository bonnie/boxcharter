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
const db = require('./db')
const User = require('./user')
const Chord = require('./chord-lyric').Chord
const Lyric = require('./chord-lyric').Lyric
const Measure = require('./measure')
const Section = require('./section')

const Status = require('./status').Status
const statusStrings = require('./status').statusStrings
const logger = require('../utilities/log').logger
const procError = require('../utilities/err')

// for associations when retrieving and adding data
const chartAssociations = [
  {
    model: Section,
    include: [{
      model: Measure,
      include: [
        Lyric,
        Chord,
      ]
    }]
  },
]

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

 ///////////
 // class methods

Chart.getById = function(chartId) {
  return this.find({
    where: { chartId: chartId },
    raw: true,
    // include: chartAssociations
  })
}

Chart.setChart = function(chartData) {
  // Update existing chart.

  console.log('setting chart', chartData)

  const sections = chartData.sections
  const chartId = chartData.chartId
  delete chartData.sections
  delete chartData.chartId

  // findOrCreate ?
  Chart.update(chartData, {
    where: { chartId: chartId },
    options: {
      // fields: [],
      logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
    })
    .then(num => {
      // num = array containing number of rows updated
      const resultCount = num[0]
      if (resultCount == 1) {
        // blow away existing sections
        Chart.findById(chartId)
          .then(chartRow => chartRow.clearSections())
          .then(resp => {
            if (sections) {
              sections.forEach(s => {
                s.chartId = chartId
                Section.setSection(s)
              })
            }
          })
          .then(r => {
          result = {
            status: new Status(
              statusStrings.success,
              'Successfully saved chart'
            ),
            chart: Chart.getById(chartId)
          }
          return Promise.resolve(result)
        })

      } else {
        // bummer
        return procError(null, `Found ${resultCount} results for chartId ${chartId}`)
      }
    })
    .catch(err => {
      msg = `Could not update chart id ${chartId}: ${err}`
      return Promise.resolve(procError(err, msg))
    })
}

Chart.reformatMeasures = function(chartData) {
  // transfrom chart data from client into a format appealing to Sequelize

    chartData.sections = chartData.sections.map(section => {
      section.measures = section.measures.map(measure => {

        // chords
        var formattedChords = []
        Object.entries(measure.chords).forEach(([beatIndex, chordData]) => {
         // can assume that there is only one key/value pair in chord
         // TODO: separate note code and suffix
         formattedChords.push({
           beatIndex: beatIndex,
           noteCode: chordData,
          //  suffix: chordData[1]
          })
        })
        // console.log('formattedChords:', formattedChords)
        measure.chords = formattedChords

        // lyrics
        var formattedLyrics = []
        Object.entries(measure.lyrics).forEach(([verseIndex, lyricText]) => {
          // can assume that there is only one key/value pair in lyric
         formattedLyrics.push({ verseIndex: verseIndex, lyricText: lyricText })
        })
        measure.lyrics = formattedLyrics
      return measure
    })
    return section
  })
  return chartData
}

Chart.createChart = function(userId, chartData) {
  // Create new chart from angular data.

  require('./associations')
  chartData = Chart.reformatMeasures(chartData)

  // declare globally, to avoid pyramid .then's
  var newChart, response

  return Chart.create(chartData, {
    options: { logging: msg => { logger.info(`SEQUELIZE ${msg}`) }},
    include: chartAssociations
  })
  .then(thisChart => {
    // save for future .then
    newChart = thisChart
    logger.debug('made new chart', thisChart.chartId)
    // Associate with user. Can assume user already exists.
    return User.findById(userId)
  })
  .then(thisUser => {
    return newChart.addUser(thisUser)
  })
  .then(thisChartUser => {
    // why is this an array of arrays, and not just one chartuser obj? A result of many-to-many?
    logger.debug(`chart ${thisChartUser[0][0].chartId} is associated with user ${thisChartUser[0][0].userId}`)
    const chartId = thisChartUser[0][0].chartId
    return Chart.getById(chartId)
  })
  .then(chartData => {
    // Package result for web
    response = {
      status: new Status(statusStrings.success, 'Successfully saved chart'),
      chart: chartData
    }
    return response
  })
  .catch(error => {
    msg = `Unable to create chart ${chartData.title}`
    return procError(error, msg)
  })

  // const chartDataWithoutSections = chartData
  // delete chartDataWithoutSections.sections
  //
  // Chart.create(
  //   chartDataWithoutSections,
  //   { options: {
  //     // fields: [],
  //     logging: msg => { logger.info(`SEQUELIZE ${msg}`) }}
  //   })
  //   .then(newChart => {
  //     chartData.chartId = newChart.chartId
  //     return Chart.setChart(chartData)
  //   })
  //   .catch(err => {
  //     const msg = `Could not create chart "${chartData.title}" for user id ${chartData.userId}`
  //     return Promise.resolve(procError(err, msg))
  //   })
}

////////////////
// instance methods

Chart.prototype.clearSections = function() {
  // clear any existing sections to write new data
  Section.destroy({ where: { chartId: this.chartId }})
}

Chart.prototype.getSections = function() {
  // Get sections for a chart.
  // Returns promise<Section[]>

  Section.findAll({
    where: { chartId: this.chartId },
    options: { order: ['index'] },
    attributes: { exclude: ['sectionId'] },
    raw: true
  })
  .then(sections => {
    console.log('sections', sections)
    sectionsWithMeasures = sections.map(s => {
      s.measures = s.getMeasures()
      return s
    })
    console.log('sectionsWithMeasures', sectionsWithMeasures)
    return Promise.resolve(sectionsWithMeasures)
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


 module.exports = Chart
