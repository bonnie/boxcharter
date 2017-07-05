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


 //////////////////////////////////////////////////////////////////////////////
 // Note / ScaleNote / Key
 //////////////////////////////////////////////////////////////////////////////

 //////////
 // tables

 const Note = db.sequelize.define('note', {
   noteCode: { type: Sequelize.STRING(2) }
 })

 const Key = db.sequelize.define('key', {
   keyCode: { type: Sequelize.STRING(3) }
 })

 const ScaleNote = db.sequelize.define('scale_note', {
   scaleNoteId: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   scaleDegree: {
     type: Sequelize.INTEGER,
     allowNull: false,
   }
 })

 ////////////////
 // associations

 var scaleNote.Note = scaleNote.hasOne(Note)
 var scaleNote.Key = scaleNote.hasOne(Key)

 // Key -- notes = db.relationship("ScaleNote", order_by=ScaleNote.scale_degree)
 var Key.Notes = Key.hasMany(ScaleNote) // order_by? 

 module.exports = {
   Note: Note,
   Key: Key,
   ScaleNote: ScaleNote,
 };
