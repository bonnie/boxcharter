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
  console.log('made new chart', thisChart.chartId)
  // can assume user already exists
  User.findById(userId).then(thisUser => {
    return thisChart.addUser(thisUser)
  }).then(thisChartUser => {
    // why is this an array of arrays, and not just one chartuser obj? A result of many-to-many?
    console.log(`chart ${thisChartUser[0][0].chartId} is associated with user ${thisChartUser[0][0].userId}`)
  })
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
