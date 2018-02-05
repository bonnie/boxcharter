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
 * passport
 */

const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const User = require('../model/db_user')
const config = require('../../config')
const procError = require('../utilities/err')
const logger = require('../utilities/log')

/**
 * Function meant to be used as passport strategy callback for the localStrategy
 * @param {string} email 
 * @param {string} password 
 * @param {function} done 
 * @returns {promise} - Promise whose resolution is unimportant
 */
const checkPassword = function(email, password, done) {
  return User.find({ where: { email } })
    // can't use findByEmail here because we need hash and salt
    .then((foundUser) => {
      if (foundUser === null || foundUser.checkPassword(password)) {
        // user not in db or password doesn't match
        // status.alertType = statusStrings.danger
        // status.text = 'Invalid email and/or password'

        const response = { status }
        logger.warn(`${email} logged in with invalid password`)
        return done(null, false)
        // return res.status(200).json(response)
      }

      // otherwise, all's rosy
      const msg = `Successful login for ${email}`
      // status.alertType = statusStrings.success
      // status.text = msg
      logger.debug(msg)

      // const response = {
      //   status,
      //   user: foundUser,
      // }
      const userId = foundUser.id
      done(null, userId)
      // res.status(200).json(response)
    })
    .catch((error) => {
      const msg = `Unable to authenticate user ${email}`
      procError(error, msg)
      done(error)
      // const response = procError(error, msg)
      // res.status(200).json(response)
    })
}

// create Local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, checkPassword)

// Set up options for JWT Strategy
const jwtOptions = {
  // tell it where to find the jwt payload
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  // how to decode
  secretOrKey: config.secret,
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload is the jwt token object, which we defined with 'sub' and 'iat' properties

  // see if the userId in the payload exists in db. If it does, call done with that user.
  // otherwise, call done without a user object
  User.getById(payload.sub)
    .then(user => {
      user = user || false // translate "null" response into "false"
      done(null, user)
    })
    .catch((err) => done(err, false))
})

// Tell passport to use strategies
passport.use(localLogin)
passport.use(jwtLogin)
