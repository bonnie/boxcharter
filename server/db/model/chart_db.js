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
 * DB methods for the chart model.
 * @module chart_db
 */
const { db } = require('../db_connection')
const { logger } = require('../../utilities/log')
const { Chart } = require('../../../shared/model/chart.js')
const { Section } = require('./section_db')
const { User } = require('./user_db')
const { getChildren } = require('../utilities/get_children')

/**
 * Add chart object to the db, and set the object's chartId to be the
 * resulting chartId
 * @param {number} chartId - chartId for the chart
 * @returns {Promise} - Promise resolving to chartId, or throw an error
 */

Chart.prototype.addToDb = async function () {
  try {
    const response = await db.one(
      `INSERT INTO charts (
          title,
          author,
          composer,
          lyricist,
          lyricistSame,
          originalKeyCode,
          printKeyCode,
          maxPages,
          minFontsize,
          pageWidth,
          pageHeight,
          pageUnits)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING chartId`,
      [
        this.title,
        this.author,
        this.composer,
        this.lyricist,
        this.lyricistSame,
        this.originalKeyCode,
        this.printKeyCode,
        this.maxPages,
        this.minFontsize,
        this.pageWidth,
        this.pageHeight,
        this.pageUnits,
      ])
    this.chartId = response.chartid
    if (this.sections) {
      await Promise.all(this.sections.map(section => section.addToDb(this.chartId)))
    }
    // users don't need to be added to the db here
    return response.chartid
  } catch (err) {
    logger.crit(`Failed to add chart "${this.title}"`)
    logger.crit(err)
    throw new Error(`Chart not added: ${err.message}`)
  }
}

/**
 * Get a chart by chartId
 * @param  {number} chartId  id of the chart to be gotten
 * @return {Promise}         resolves to Chart object
 */
Chart.getById = async function (chartId) {
  try {
    const chartQuery = 'SELECT * FROM charts WHERE chartID = $1'
    const chartData = await db.one(chartQuery, chartId)
    const chart = new Chart(chartData)
    await chart.getSections()
    await chart.getUsers()
    return chart
  } catch (e) {
    throw new Error(`Could not get chartId ${chartId}: ${e.toString()}`)
  }
}

/**
 * Get chart's sections from database and assign to 'sections' property
 * @return {Promise} promise whose resolution is irrelevant
 */
Chart.prototype.getSections = function () {
  return getChildren('section', 'chart', this.chartId, 'index', Section)
    .then((sections) => { this.sections = sections })
    .catch(console.error)
}

/**
 * Get users associated with chart and assign to 'users' property
 * users property will be an array of objects, with keys:
 *    'user' (user object value), 'permissions' (number value)
 * @return {Promise} promise whose resolution is irrelelvant
 */
Chart.prototype.getUsers = async function () {
  const userchartsQuery = `
    SELECT u.*
    FROM usercharts AS uc
      JOIN users AS u
        ON uc.userid = u.userid
    WHERE uc.chartid = $1
  `
  try {
    const users = await db.any(userchartsQuery, this.chartId)
    this.users = users.map((userData) => {
      const user = new User(userData)
      return { user, permissions: userData.permissions }
    })
  } catch (e) {
    throw new Error(`Could not get users for chartId ${this.chartId}: ${e.toString()}`)
  }
}

// ///////////
// // methods
//
// Section.setSection = function(sectionData) {
//   // create new section for this chart with sectionData
//
//   const measures = sectionData.measures
//   delete sectionData.measures
//
//   Section.create(sectionData, {
//     options: {
//       logging: msg => { logger.info(`SEQUELIZE ${msg}`) } }
//     })
//     .then(newSection => {
//       logger.debug(`created new section ${sectionData}`)
//       measures.forEach(m => {
//         m.sectionId = newSection.sectionId
//         measure.Section.setSection(m)
//       })
//     })
//     .catch(err => {
//       throw (`Could not create section ${sectionData}: ${err}`)
//     })
//
// }
//
// Section.getChartSections = function(chartId) {
//   this.findAll({
//     where: { chartId: chartId },
//     options: { order: ['index'] },
//     attributes: { exclude: ['sectionId'] },
//     raw: true
//   }).then(sections => {
//     sectionsWithSections = sections.map(s => {
//       s.measures = s.getSections()
//       return s
//     })
//     return Promise.resolve(sectionsWithSections)
//   })
// }
//
// Section.getSections = function() {
//   return measure.Section.getSectionSections(this.sectionId)
// }

/*
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
*/

module.exports = {
  Chart,
}
