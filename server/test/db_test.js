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
 * Tests for the database model.
 * @module db_test
 */
const { expect } = require('chai')
const { initDB } = require('./utilities/db_reset')
const { userData } = require('../db/seed/add_user')

const { User } = require('../../shared/model/user.js')

describe('Database user', function () {
  let user
  before('Reset the DB', function () {
    return initDB()
      .then(function () { user = User.getByEmail(userData.email) })
  })
  it('should match the seeded firstName', function () {
    return user
      .then(u => expect(u.firstName).to.equal(userData.firstName))
  })
  it('should match the seeded lastName', function () {
    return user
      .then(u => expect(u.lastName).to.equal(userData.lastName))
  })
  it('should match the seeded password', function () {
    return user
      .then(u => expect(u.checkPassword(userData.password)).to.equal(true))
  })
  it('should not match a random password string', function () {
    return user
      .then(u => expect(u.checkPassword('a random password string')).to.equal(false))
  })
})
