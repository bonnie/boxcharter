// const User = require('./user')
// const Key = require('./note-key').Key
// const Note = require('./note-key').Note
// const ScaleNote = require('./note-key').ScaleNote
// const Chord = require('./chord-lyric').Chord
// const Lyric = require('./chord-lyric').Lyric
// const Measure = require('./measure')
// const Section = require('./section')
// const Chart = require('./chart')
// const ChartUser = require('./chartuser')
// require('./associations')

Chart.create({
  createdAt: '2017-07-29T06:57:54.103Z',
  title: 'Blackbird',
  composer: 'Paul McCartney',
  lyricistSame: true,
  author: 'bds',
  originalKey: 'G',
  // users: [{id: 1}],
  sections: [{
    beatsPerMeasure: 4,
    index: 1,
    verseCount: 1,
    measuresPerRow: 1,
    measures: [{
      index: 1,
      chords: [{
        beatIndex: 1,
        note: {noteCode: 'G'},
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
    // User,
    {
      model: Section,
      include: [{
        model: Measure,
        include: [
          Lyric,
          { model: Chord,
            include: [ Note ]
          }
        ]
      }]
    },
  ]
}).then(thisChart => {
  console.log('thisChart', thisChart)
})
