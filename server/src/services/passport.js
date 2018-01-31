const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')
const User = require('../model/db_user')
const config = require('../../config')

// Set up options for JWT Strategy
const jwtOptions = {}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, )

// Tell passport to use this strategy

