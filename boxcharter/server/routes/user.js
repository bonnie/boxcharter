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
var statusStrings = require('../../common/status_strings').statusStrings
var logger = require('../utilities/log').logger
var procError = require('../utilities/err')
var checkPass = require('../utilities/password_utils').checkPass

// create the router
var router = express.Router();

/***********************/
/* POST authorize user */
/***********************/
router.post('/auth', function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  user.User.findOne({ where: {email: email} })
    .then(foundUser => {
      if (foundUser === null || !checkPass(foundUser, password)) {
        // user not in db or password doesn't match
        response = {
          status: {
            type: statusStrings.danger,
            text: "Invalid email and/or password"
          } 
        }
        logger.warn(`${email} loggedin with invalid password`)
        res.status(200).json(response)
        return
      } 

      // otherwise, all's rosy
      const msg = `Successful login for ${email}`
      const result = {
        status: { type: statusStrings.success, text: msg },
        user: foundUser
      }
      logger.debug(msg)
      res.status(200).json(result)
    })
    .catch(error => {
      console.log(error)
      msg = `Unable to authenticate user ${email}`
      response = procError(error, msg)
      res.status(200).json(response)
    })

})

/***********************/
/* POST new user.      */
/***********************/

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

  // create user
  user.User
    .create(newUserData)
    .then(newUser => {
      const email = newUser.email
      logger.info("added new user", email)
      const message = `New user ${newUser.email} successfully added.`
      response.status = { type: statusStrings.success, text: message }
      res.status(200).json(response);
    })
    .catch(error => {
      msg = `Unable to add user ${userInfo.email}`
      response = procError(error, msg)
      res.status(200).json(response)
    })
});

/***********************/
/* GET user existence. */
/***********************/

router.get('/check', function(req, res, next) {

  const email = req.query.email

  user.User.findOne({ where: {email: email} })
    .then(foundUser => {
      inDB = foundUser ? true : false
      const result = { status: {type: statusStrings.success}, inDB: inDB }
      res.status(200).json(result)
    })
    .catch(error => {
      msg = `Unable to check user ${email}`
      response = procError(error, msg)
      res.status(200).json(response)
    })
});

module.exports = router;
