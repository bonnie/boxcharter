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

// create Local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  

})

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

// Tell passport to use this strategy
passport.use(jwtLogin)
