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

//////////////////////////////////////////////////////////////////////////
// Create an initial test user
//////////////////////////////////////////////////////////////////////////

var User = require('../model/user')
var passUtils = require('../utilities/password_utils')
var checkPass = require('../utilities/password_utils').checkPass

const userInfo = { email: 'bonnie@bonnie',
  fname: 'Bonnie',
  lname: 'BoBonnie',
  password: 'bonnie',
  password2: 'bonnie' }

const addUser = function() {

  // create salted password hash
  // general web consensus seems to be: hash on server side, and use
  // https to protect password in transit
  const passData = passUtils.saltHashPassword(userInfo.password)

  // massage userInfo obj to contain salted pass hash
  userInfo.passwordHash = passData.passwordHash
  userInfo.passwordSalt = passData.salt
  delete userInfo.password

  // create user
  User.create(userInfo)
    .then(newUser => {
      console.log(`New user ${newUser.email} successfully added.`)
    })
    .catch(error => {
      console.error(`Unable to add user ${userInfo.email}`)
    })
}

module.exports = addUser
