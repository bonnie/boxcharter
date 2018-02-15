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
 * Tests for creating sub-items when creating a chart from a chart object.
 * @module db_integration_test
 */

const { expect } = require('chai')

const { db } = require('../../src/model/utilities/db_connection')
const { initDB } = require('../../../shared/test/utilities/db_reset')

const Chart = require('../../src/model/db_chart')
const Section = require('../../src/model/db_section')
const Measure = require('../../src/model/db_measure')
const Chord = require('../../src/model/db_chord')
const Lyric = require('../../src/model/db_lyric')

const CHART_TITLE = 'Integration Test'

const chords = [
  new Chord({ beatindex: 0, notecode: 'G' }),
  new Chord({ beatindex: 1, notecode: 'C#', basenotecode: 'E' }),
  new Chord({ beatindex: 2, notecode: 'Bb', suffix: 'dim' }),
]

const lyrics = [
  new Lyric({ verseindex: 0, lyrictext: 'joy to the world' }),
  new Lyric({ verseindex: 1, lyrictext: '' }),
]

const measures = [
  new Measure({ index: 0, chords: [chords[0], chords[1]], lyrics: [lyrics[0], lyrics[1]] }),
  new Measure({ index: 1, chords: [chords[0]] }),
]

const sections = [
  new Section({
    index: 0,
    beatspermeasure: 4,
    versecount: 1,
    measures: [measures[0], measures[1]] }),
  new Section({
    index: 1,
    sectionname: 'three word name',
    sectiondesc: 'description is this',
    beatspermeasure: 4,
    versecount: 3,
    pickupmeasurebeats: 2,
    measures: [measures[0], measures[1]] }),
]

const charts = [
  new Chart({
    title: CHART_TITLE,
    author: 'chart auth',
    composer: 'chart comp',
    lyricist: 'chart lyricist',
    lyricistsame: false,
    originalkeycode: 'Bb',
    printkeycode: 'F#m',
    maxpages: 1,
    minfontsize: 10,
    pagewidth: 8.5,
    pageheight: 11,
    pageunits: 'inches',
    sections: [sections[0], sections[1]] }),
]

charts.forEach((chart) => {
  describe('Add chart with sub-items to db', function () {
    let chartId
    let dbSections
    let dbMeasures
    before('Clear db and add chart', async function () {
      await initDB()
      await chart.addToDb()
      const dbChart = await db.one(
        'SELECT chartid FROM charts WHERE title=$1',
        [CHART_TITLE])
      chartId = dbChart.chartid
      dbSections = await db.any(
        'SELECT sectionid FROM sections WHERE chartId=$1',
        [chartId])
      dbMeasures = await db.any(
        'SELECT measureId FROM measures WHERE sectionId IN ($1:csv)',
        [dbSections.map(section => section.sectionid)]
      )
    })
    it('should add the chart to the db', function () {
      expect(chartId).to.be.a('number')
    })
    it('should add the right number of sections to the db', function () {
      expect(dbSections.length).to.equal(sections.length)
    })
    it('should add the right number of measures to the db', function () {
      const measureCount = sections.reduce(
        (mcount, section) => mcount + section.measures.length, 0)
      expect(dbMeasures.length).to.equal(measureCount)
    })
    it('should add the right number of chords to the db', async function () {
      const dbChords = await db.any(
        'SELECT chordId FROM chords WHERE measureId IN ($1:csv)',
        [dbMeasures.map(measure => measure.measureid)]
      )
      const chordCount = sections.reduce(
        (mcount, section) =>
          mcount + section.measures.reduce((ccount, measure) =>
            ccount + measure.chords.length
            , 0)
        , 0)
      expect(dbChords.length).to.equal(chordCount)
    })
    it('should add the right number of lyrics to the db', async function () {
      const dbLyrics = await db.any(
        'SELECT lyricId FROM lyrics WHERE measureId IN ($1:csv)',
        [dbMeasures.map(measure => measure.measureid)]
      )
      const lyricCount = sections.reduce(
        (mcount, section) =>
          mcount + section.measures.reduce((ccount, measure) =>
            ccount + (measure.lyrics ? measure.lyrics.length : 0)
            , 0)
        , 0)
      expect(dbLyrics.length).to.equal(lyricCount)
    })
  })
})
