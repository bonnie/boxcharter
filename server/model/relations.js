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

//////////
// user
User.belongsToMany(Chart,
  { as: 'Charts',
    through: { model: ChartUser, unique: false },
    foreignKey: 'chartId'
  })

////////////
// ScaleNote
ScaleNote.belongsTo(Key, {foreignKey: 'keyCode', unique: false, allowNull: false})
ScaleNote.belongsTo(Note, {foreignKey: 'noteCode', unique: false, allowNull: false})

//////////
// chart
Chart.belongsToMany(User,
  { as: 'Users',
    through: { model: ChartUser, unique: false },
    foreignKey: 'userId'
  })
Chart.belongsTo(Key, {as: 'originalKey', foreignKey: 'keyCode', unique: false})
Chart.belongsTo(Key, {as: 'printKey', foreignKey: 'keyCode', unique: false})

////////////
// section
Section.belongsTo(Chart, {foreignKey: 'chartId', allowNull: false})
Section.belongsTo(Measure,
  { as: 'ending1Start',
    foreignKey: 'measureId',
    unique: false,
    constraints: false
  })
Section.belongsTo(Measure,
  { as: 'ending1End',
    foreignKey: 'measureId',
    unique: false,
    constraints: false
  })
Section.belongsTo(Measure,
  { as: 'ending2Start',
    foreignKey: 'measureId',
    unique: false,
    constraints: false
  })

///////////////
// measure
Measure.belongsTo(Section, {foreignKey: 'sectionId', allowNull: false})

/////////////
// chords / lyrics
Chord.belongsTo(Measure, {foreignKey: 'measureId', allowNull: false})
Chord.belongsTo(Note, {foreignKey: 'noteCode', allowNull: false})
Lyric.belongsTo(Measure, {foreignKey: 'measureId', allowNull: false})
