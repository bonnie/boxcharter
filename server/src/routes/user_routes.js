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

const express = require('express')
const passUtils = require('../utilities/password_utils')
const User = require('../model/db_user')
const { statusStrings, Status } = require('../../../shared/src/model/status')
const { logger } = require('../utilities/log')
const procError = require('../utilities/err')
const { checkPass } = require('../utilities/password_utils')

// create the router
const router = express.Router()

/** *************** */
/* GET user details */
/* **************** */
router.get('/:user_id', (req, res) => {

})

/** *************** */
/* PUT user details */
/* **************** */
router.put('/:user_id', (req, res) => {

})

/** ************** */
/* GET user charts */
/* *************** */
router.get('/:userId/charts', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.getById(userId)
    const msg = `Charts retrieved for ${user.email}`
    const response = { charts: user.charts, status: new Status(statusStrings.success, msg) }
    res.status(200).json(response)

  } catch (error) {
    const msg = `Unable to get charts for userId [${userId}]`
    const response = procError(error, msg)
    res.status(400).json(response)
  }
})

/* ******************* */
/* PUT user details.   */
/* ******************* */
router.post('/add', (req, res) => {
  const userInfo = req.body

  /* { email: 'bonnie@bonnie',
  fname: 'bonnie',
  lname: 'bonnie',
  password: 'bonnie',
  password2: 'bonnie' } */

  // create salted password hash
  // general web consensus seems to be: hash on server side, and use
  // https to protect password in transit
  const passData = passUtils.saltHashPassword(userInfo.password)

  // massage userInfo obj to contain salted pass hash
  userInfo.passwordHash = passData.passwordHash
  userInfo.passwordSalt = passData.salt
  delete userInfo.password

  // create user
  User
    .create(userInfo)
    .then((newUser) => {
      const email = newUser.email
      const msg = `New user ${email} successfully added.`
      logger.info(msg)

      const response = {}
      response.status = new Status(statusStrings.success, msg)
      User.getByEmail(email)
        .then((newUserJSON) => {
          response.user = newUserJSON
          res.status(200).json(response);
        })
    })
    .catch((error) => {
      const msg = `Unable to add user ${userInfo.email}`
      const response = procError(error, msg)
      res.status(200).json(response)
    })
});

/* ******************* */
/* GET user existence. */
/* ******************* */
router.get('/check', (req, res) => {
  const email = req.query.email

  User.findOne({ where: { email } })
    .then((foundUser) => {
      const inDB = foundUser !== null
      const result = { status: { type: statusStrings.success }, inDB }
      res.status(200).json(result)
    })
    .catch((error) => {
      const msg = `Unable to check user ${email}`
      const response = procError(error, msg)
      res.status(200).json(response)
    })
});

module.exports = router;
