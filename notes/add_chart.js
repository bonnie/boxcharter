const User = require('./user')
const Key = require('./note-key').Key
const Note = require('./note-key').Note
const ScaleNote = require('./note-key').ScaleNote
const Chord = require('./chord-lyric').Chord
const Lyric = require('./chord-lyric').Lyric
const Measure = require('./measure')
const Section = require('./section')
const Chart = require('./chart')
const ChartUser = require('./chartuser')
require('./associations')
var newChart

const userId = 1

Chart.create({
  createdAt: '2017-07-29T06:57:54.103Z',
  title: 'Blackbird',
  composer: 'Paul McCartney',
  lyricistSame: true,
  author: 'bds',
  originalKey: 'G',
  sections: [{
    beatsPerMeasure: 4,
    index: 1,
    verseCount: 1,
    measuresPerRow: 1,
    measures: [{
      index: 1,
      chords: [{
        beatIndex: 1,
        // can assume all possible noteCodes already exist
        noteCode: 'G',
        noteSuffix: 'm7'
      }],
      lyrics: [{
        verseIndex: 1,
        lyricText: 'Blackbird'
      }]
    }]
  }]
},
{
  include: [
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
}).then(thisChart => {
  newChart = thisChart
  console.log('made new chart', thisChart.chartId)
  // can assume user already exists
  return User.findById(userId)
}).then(thisUser => {
  if (thisUser) {
    newChart.addUser(thisUser)
  } else {
    console.log(`tough luck; thisUser came out as ${thisUser}`)
  }
}).catch(error => {
  console.error(`uh oh: ${error}`)
})

// .then(thisChart => {
//   newChart = thisChart
//   User.findById(userId)
//   .then(thisUser => {
//     newChart.addUser(thisUser)
//   })
// })
