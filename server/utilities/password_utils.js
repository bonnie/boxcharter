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
 * Functions for generating and checking passwords.
 * adapted from
 *   https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
 * @module password_utils
 */
const crypto = require('crypto');

/**
 * Generate random string of characters i.e salt.
 * @function
 * @param {number} length - Length of the random string.
 * @return {string} - Random string of hex characters of requested length.
 */
const genRandomString = length =>
  crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length) // return required number of characters

/**
 * Hash password with sha512.
 * @function
 * @param {string} password - Password to be salted and hashed.
 * @param {string} salt - Randomly generated salt.
 * @return {object} - Object containing the password salt and hash.
 */
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt) // Hashing algorithm sha512
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    hash: value,
  };
};

/**
 * Generate salt and return object with password and salt.
 * @function
 * @param {string} userpassword - Password to be salted and hashed.
 * @return {object} - Object containing the password salt and hash.
 */
const saltHashPassword = (userpassword) => {
  const salt = genRandomString(16); // Gives us salt of length 16
  return sha512(userpassword, salt);
}

/**
 * Determine whether password in db matches entered password.
 * @function
 * @param {User} user - User object.
 * @param {string} pass - Entered password.
 * @return {object} - Object containing the password salt and hash.
 */
const checkPass = (user, pass) =>
  sha512(pass, user.passwordSalt).passwordHash === user.passwordHash

module.exports = {
  saltHashPassword,
  checkPass,
}
