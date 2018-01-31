const jwt = require('jwt-simple')
const User = require('../model/db_user')
const config = require('../../config')

// resource: http://jwt.io

/**
 * Generate JSON web token for user
 * @param {User} user 
 */
function generateToken(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

module.exports = {
  generateToken
}