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

/**
 * Written with help from Stephen Grider's Advanced React and Redux Udemy Course
 * @module
 * authentication
 */

const passUtils = require('../utilities/password_utils')
const User = require('../model/db_user')
const { statusStrings, Status } = require('../../../shared/src/model/status')
const { logger } = require('../utilities/log')
const procError = require('../utilities/err')
const { generateToken } = require('../utilities/jwt')
const { checkPass } = require('../utilities/password_utils')

/**
 * Callback to an express route to sign a user up
 * @function
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - next express middleware function 
 */
const signup = function(req, res, next) {
  const userInfo = req.body

  /* { email: 'bonnie@bonnie',
  fname: 'bonnie',
  lname: 'bonnie',
  password: 'bonnie',
  password2: 'bonnie' } */

  // handle error cases
  if (!userInfo.email || !userInfo.password || !userInfo.password2 ) {
    return res.status(422).send({ error: 'Email and password cannot be blank'})
  }

  if (userInfo.password !== userInfo.password2 ) {
    return res.status(422).send({ error: 'Passwords must match' })
  }

  User.isInDb({ email: userInfo.email })
    .then(inDB => { 
      if (inDB) return res.status(422).send({ error: 'Email is in use' })
    }) 
    .catch(next)

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
          response.user.token = generateToken(newUserJSON.id)
          res.status(200).json(response);
        })
    })
    .catch((error) => {
      const msg = `Unable to add user ${userInfo.email}`
      const response = procError(error, msg)
      res.status(200).json(response)
    })
}

/**
 * Callback to an express route to authorize a user
 * @function
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - next express middleware function 
 */
const signin = (req, res, next) => {
  // user has already been authorized -- just need to give them a token

  // assigned by passport middleware
  res.send({ token: generateToken(req.userId) })
  
}

/**
 * Callback to an express route to check if a user's email is in the db
 * @function
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - next express middleware function 
 */
const checkUser = (req, res, next) => {
  const email = req.query.email

  User.isInDb({ email })
    .then((inDB) => {
      const result = { status: { type: statusStrings.success }, inDB }
      res.status(200).json(result)
    })
    .catch((error) => {
      const msg = `Unable to check user ${email}`
      const response = procError(error, msg)
      res.status(200).json(response)
    })
}

module.exports = {
  signup,
  signin,
  checkUser,
}