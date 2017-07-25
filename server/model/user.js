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
 var procError = require('../utilities/err')

 //////////////////////////////////////////////////////////////////////////////
 // User
 //////////////////////////////////////////////////////////////////////////////

 //////////
 // table
 const User = db.sequelize.define('user', {
   userId: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   email: {
     type: Sequelize.STRING,
     allowNull: false,
     unique: true,
   },
   passwordHash: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   passwordSalt: {
     type: Sequelize.STRING,
     allowNull: false,
   },
   firstName: {
     type: Sequelize.STRING,
   },
   lastName: {
     type: Sequelize.STRING,
   },
   // don't need joinedAt, since timestamps is true by default, and
   // createdAt, updatedAt will automatically be populated
})

 ////////////////
 // associations

 // user / chart association is defined in the chart model

 // User.hasMany(Chart,
 //   {
 //     through: {
 //       model: UserChart,
 //       unique: false
 //     }
 // })

 ///////////
 // methods
 // // Adding a class level method
 // User.classLevelMethod = function() {
 //   return 'foo';
 // };

User.getUser = function(whereClause) {
  return this.find({
    where: whereClause,
    attributes: {
      exclude: [
        'passwordHash',
        'passwordSalt',
      ]
    },
    raw: true
   })
   .then(u => {

     // TODO: actually make list of charts here, not just dummy!
     u.charts = []

     return Promise.resolve(u)

   })
}

User.getByEmail = function(targetEmail) {
  return this.getUser({email: targetEmail})
}

User.getById = function(targetId) {
  return this.getUser({userId: targetId})
}

 // // Adding an instance level method
 // User.prototype.instanceLevelMethod = function() {
 //   return 'bar';
 // };

 // def get_data(self):
 //    """Return a dict of user details."""
 //
 //    charts = [
 //            { 'title': chart.title,
 //              'chartId': chart.chart_id,
 //              'createdAt': chart.created_at,
 //              'modifiedAt': chart.modified_at }
 //            for chart in self.charts
 //           ]
 //
 //    return {
 //                'charts': charts,
 //                'userId': self.user_id,
 //                'email': self.email,
 //                'firstName': self.first_name,
 //                'lastName': self.last_name
 //            }

 module.exports = { User: User };
