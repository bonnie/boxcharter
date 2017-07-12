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

var express = require('express');
var passUtils = require('../utilities/password_utils');
var user = require('../../common/model/model_user')
var statusTypes = require('../../common/status_types').statusTypes
var router = express.Router();

/* POST new user. */
router.post('/add', function(req, res, next) {
  const userInfo = req.body

/* { email: 'bonnie@bonnie',
  fname: 'bonnie',
  lname: 'bonnie',
  password: 'bonnie',
  password2: 'bonnie' } */

  const response = {}

  // create salted password hash
  // general web consensus seems to be: hash on server side, and use
  // https to protect password in transit 
  const passData = passUtils.saltHashPassword(userInfo.password)

  // massage userInfo obj to contain salted pass hash
  // TODO: have the info come in on the user model so less massage necessary

  newUserData = {
    email: userInfo.email,
    passwordHash: passData.passwordHash,
    passwordSalt: passData.salt,
    firstName: userInfo.fname,
    lastName: userInfo.lname,
  }

// TODO: 
// (node:15039) DeprecationWarning: Using the automatically created return value from client.query as an event emitter is deprecated and will be removed in pg@7.0. Please see the upgrade guide at https://node-postgres.com/guides/upgrading

  // create user
  user.User
  .create(newUserData)
  .then(newUser => {
    const email = newUser.email
    console.log("added new user", email)
    const message = `New user ${newUser.email} successfully added.`
    response.status = { type: statusTypes.success, text: message }
    res.status(200).json(response);
  })
  .catch(error => {
    const errorText = `Unable to add user ${userInfo.email}: ${error}`
    console.error(errorText)
    response.status = { type: statusTypes.danger, text: errorText }
    res.status(200).json(response);
  })

  // const response = {status: {type: 'success'}}
});

/* GET user existence. */
router.get('/check', function(req, res, next) {

  const email = req.query.email

// TODO: 
// (node:16893) DeprecationWarning: Using the automatically created return value from client.query as an event emitter is deprecated and will be removed in pg@7.0. Please see the upgrade guide at https://node-postgres.com/guides/upgrading

  user.User.findOne({ where: {email: email} })
  .then(foundUser => {
    inDB = foundUser ? true : false
    const result = { status: {type: statusTypes.success}, inDB: inDB }
    res.status(200).json(result)
  })
  .catch(error => {
    const errorText = `Unable to check user ${userInfo.email}: ${error}`
    console.error(errorText)
    response.status = { type: statusTypes.danger, text: errorText }
    res.status(200).json(response);
  })

  // for now...
  // const result = { status: {type: 'success'}, inDB: false }
  // res.status(200).json(result)

});

module.exports = router;
